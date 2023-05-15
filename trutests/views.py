from rest_framework import status
from rest_framework.response import Response
from .serializer import TrutestSerializer, CSVFileSerializer
from .models import Animal, CSVFile


from rest_framework import status, viewsets
from rest_framework.response import Response
from .serializer import TrutestSerializer
from .models import Animal, CSVFile


class TrutestListView(viewsets.ModelViewSet):
    serializer_class = TrutestSerializer
    queryset = Animal.objects.all()


class CSVFileView(viewsets.ModelViewSet):
    queryset = CSVFile.objects.all()
    serializer_class = CSVFileSerializer

    def create(self, request, *args, **kwargs):
        file = request.FILES.get('file')
        if not file:
            return Response({'error': 'No file was uploaded.'}, status.HTTP_400_BAD_REQUEST)
        CSVFile.objects.create(file=file)
        return Response({'message': 'File uploaded successfully'}, status.HTTP_201_CREATED)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        csv_file = instance.file
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
        # Recorrer las filas de datos y extraer los valores correspondientes a las columnas que nos interesan
        data = []
        # empezamos desde la sexta fila porque las primeras cinco son metadatos
        for row in decoded_file[5:]:
            fields = row.split(';')
            data.append({
                'IDE': fields[field_indexes[0]],
                'IDV': fields[field_indexes[1]],
                'FECHA_NAC.': fields[field_indexes[2]],
                'RAZA': fields[field_indexes[3]],
                'UBICACION': fields[field_indexes[4]],
                'INSCRIPTA': fields[field_indexes[5]],
                'PESO': fields[field_indexes[6]],
                'FECHA': fields[field_indexes[7]],
                'HORA': fields[field_indexes[8]],
            })

        return Response({'data': data}, status.HTTP_200_OK)


class AnimalViewSet(viewsets.ModelViewSet):
    queryset = Animal.objects.all()
    serializer_class = TrutestSerializer
    #Actualiza los campos correspondientes con los valores proporcionados en la solicitud.
    def update(self, request, *args, **kwargs):
        #Pide el objeto
        instance = self.get_object()
        #Comprueba los campos permitidos que se pueden actualizar
        allowed_fields = ['ubicacion', 'inscripta', 'peso', 'nota']
        for field in allowed_fields:
            #Establecer el valor de cada campo en el objeto
            setattr(instance, field, request.data.get(field,
                                                      getattr(instance, field)))
            #Obtener el valor actual del campo si no se proporciona ningún valor
        instance.save()
        serializer = self.serializer_class(instance)
        return Response(serializer.data, status.HTTP_200_OK)
