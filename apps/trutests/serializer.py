from rest_framework import serializers
from .models import Animal,CSVFile

class TrutestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Animal
        fields = '__all__'


class CSVFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CSVFile
        fields = '__all__'
