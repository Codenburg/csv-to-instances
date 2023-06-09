from rest_framework import viewsets,status
from .serializer import TrutestSerializer,FileSerializer
from .models import Trutest
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
import csv,io,json,re

class TrutestView(viewsets.ModelViewSet):
    serializer_class = TrutestSerializer
    queryset = Trutest.objects.all()

class TrutestCreateView(viewsets.ModelViewSet):
    parser_class = (FileUploadParser,)
    serializer_class = FileSerializer

    def create(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            file = serializer.validated_data['file']
            if file.name.endswith('.csv'):
                # Leer el archivo CSV
                csv_data = io.StringIO(file.read().decode('utf-8'))
                # Convertir el archivo CSV en un objeto JSON
                json_data = []
                for row in csv.DictReader(csv_data):
                    json_data.append(row)
                # Deserializar los datos JSON en objetos Trutest
                trutests = []
                for data in json_data:
                    if None in data:
                        trutest = Trutest.objects.create(
                            file=file,
                            idv=data[None][0],
                            notas=data[None][1],
                            ide=data[None][2],
                            corral=data[None][3],
                            dosis=data[None][4],
                            lote=data[None][5],
                            vencimiento_lote=data[None][6],
                            fechafinal_pr=data[None][7],
                            fechafinal_ise=data[None][8],
                            fecha=data[None][9],
                            hora=data[None][10]
                        )
                        trutests.append(trutest)
                # Guardar los objetos Trutest en la base de datos
                for trutest in trutests:
                    trutest.save()
                # Devolver una respuesta con los objetos creados
                serializer = TrutestSerializer(trutests, many=True)
                return Response(serializer.data)
            else:
                return Response({'error': 'El archivo debe ser formato CSV'})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


