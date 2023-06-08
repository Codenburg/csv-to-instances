from rest_framework.response import Response
from .serializer import TrutestSerializer, CSVFileSerializer
from rest_framework import status, viewsets
from .models import Animal, CSVFile
from rest_framework.permissions import IsAuthenticated


class TrutestView(viewsets.ModelViewSet):
    serializer_class = TrutestSerializer
    queryset = Animal.objects.all()
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        latest_file = CSVFile.objects.latest('id')
        csv_file = latest_file.file
        decoded_file = csv_file.read().decode('ISO-8859-1').splitlines()

        header_row = decoded_file[4]
        header_fields = header_row.split(';')
        field_names = ['IDE', 'IDV', 'FECHA NAC.', 'RAZA',
                       'UBICACION', 'INSCRIPTA', 'PESO', 'Fecha', 'Hora']
        field_indexes = {field_name: header_fields.index(
            field_name) for field_name in field_names}

        created_animals = []

        for row in decoded_file[5:]:
            fields = row.split(';')
            ide = fields[field_indexes['IDE']]
            idv = fields[field_indexes['IDV']]

            # Verificar duplicados
            existing_animals = Animal.objects.filter(ide=ide, idv=idv)
            if existing_animals.exists():
                # Actualizar solo el campo 'peso' en caso de duplicados
                for animal in existing_animals:
                    animal.peso = fields[field_indexes['PESO']]
                    animal.save()
                    created_animals.append(animal)
            else:
                # Crear un nuevo animal
                animal = Animal.objects.create(
                    ide=ide,
                    idv=idv,
                    fecha_de_nac=fields[field_indexes['FECHA NAC.']],
                    raza=fields[field_indexes['RAZA']],
                    ubicacion=fields[field_indexes['UBICACION']],
                    inscripta=fields[field_indexes['INSCRIPTA']],
                    peso=fields[field_indexes['PESO']],
                    fecha=fields[field_indexes['Fecha']],
                    hora=fields[field_indexes['Hora']],
                )
                created_animals.append(animal)

        serializer = self.serializer_class(created_animals, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CSVFileView(viewsets.ModelViewSet):
    queryset = CSVFile.objects.all()
    serializer_class = CSVFileSerializer

    def create(self, request, *args, **kwargs):
        file = request.FILES.get('file')
        if not file:
            return Response({'error': 'No file was uploaded.'}, status.HTTP_400_BAD_REQUEST)
        CSVFile.objects.create(file=file)
        return Response(status.HTTP_200_OK)


class CreateAnimalView(viewsets.ModelViewSet):
    serializer_class = TrutestSerializer
    queryset = Animal.objects.none()  # No utilizar queryset en la creación individual

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
