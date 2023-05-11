from rest_framework import generics, status
from rest_framework.response import Response
from .serializer import TrutestSerializer
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

    def create(self, request, *args, **kwargs):
        file = request.FILES.get('file')
        if not file:
            return Response({'error': 'No file was uploaded.'}, status.HTTP_400_BAD_REQUEST)
        CSVFile.objects.create(file=file)
        return Response({'message': 'File uploaded successfully'}, status.HTTP_201_CREATED)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        csv_file = instance.file
        decoded_file = csv_file.read().decode('utf-8').splitlines()
        data = []
        for row in decoded_file:
            data.append(row.split(';'))
        return Response({'data': data}, status.HTTP_200_OK)


class AnimalViewSet(viewsets.ModelViewSet):
    queryset = Animal.objects.all()
    serializer_class = TrutestSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.ide = request.data.get('ide', instance.ide)
        instance.idv = request.data.get('idv', instance.idv)
        instance.fecha = request.data.get('fecha', instance.fecha)
        instance.hora = request.data.get('hora', instance.hora)
        instance.fecha_nac = request.data.get('fecha_nac', instance.fecha_nac)
        instance.raza = request.data.get('raza', instance.raza)
        instance.ubicacion = request.data.get('ubicacion', instance.ubicacion)
        instance.inscripta = request.data.get('inscripta', instance.inscripta)
        instance.peso = request.data.get('peso', instance.peso)
        instance.nota = request.data.get('nota', instance.nota)
        instance.save()
        serializer = self.serializer_class(instance)
        return Response(serializer.data, status.HTTP_200_OK)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status.HTTP_200_OK)

