from rest_framework import status
from rest_framework.response import Response
from .serializer import TrutestSerializer, CSVFileSerializer
from .models import Animal, CSVFile
from rest_framework import status, viewsets
from rest_framework.response import Response
from .serializer import TrutestSerializer
from .models import Animal, CSVFile


class TrutestView(viewsets.ModelViewSet):
    serializer_class = TrutestSerializer
    queryset = Animal.objects.all()

    def create(self, request, *args, **kwargs):
        latest_file = CSVFile.objects.latest('id') #cuando quiero crear una sola se crean todas las que estan en el ultimo archivo
        csv_file = latest_file.file
        decoded_file = csv_file.read().decode('ISO-8859-1').splitlines()
        # Buscar los índices de las columnas que nos interesan
        # la cuarta fila define los nombres de las columnas
        header_row = decoded_file[4]
        header_fields = header_row.split(';')
        field_names = ['IDE', 'IDV', 'FECHA NAC.', 'RAZA',
                       'UBICACION', 'INSCRIPTA', 'PESO', 'Fecha', 'Hora']
        field_indexes = []
        for field_name in field_names:
            try:
                field_index = header_fields.index(field_name)
            except ValueError:
                return Response({'error': f'{field_name} is not in list'}, status.HTTP_400_BAD_REQUEST)
            field_indexes.append(field_index)
        # empezamos desde la sexta fila porque las primeras cinco son metadatos
        for row in decoded_file[5:]:
            fields = row.split(';')
            Animal.objects.create(
                ide=fields[field_indexes[0]],
                idv=fields[field_indexes[1]],
                fecha_de_nac=fields[field_indexes[2]],
                raza=fields[field_indexes[3]],
                ubicacion=fields[field_indexes[4]],
                inscripta=fields[field_indexes[5]],
                peso=fields[field_indexes[6]],
                fecha=fields[field_indexes[7]],
                hora=fields[field_indexes[8]],
            )

        return Response(status.HTTP_200_OK)
    
    def update(self, request, *args, **kwargs):
        # Pide el objeto
        instance = self.get_object()
        # Comprueba los campos permitidos que se pueden actualizar
        allowed_fields = ['ubicacion', 'inscripta', 'peso', 'nota']
        for field in allowed_fields:
            # Establecer el valor de cada campo en el objeto
            setattr(instance, field, request.data.get(field,
                                                        getattr(instance, field)))
            # Obtener el valor actual del campo si no se proporciona ningún valor
        instance.save()
        serializer = self.serializer_class(instance)
        return Response(serializer.data, status.HTTP_200_OK)

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