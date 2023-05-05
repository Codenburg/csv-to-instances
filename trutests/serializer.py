from rest_framework import serializers
from .models import Trutest

class TrutestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trutest
        fields = '__all__'

class FileSerializer(serializers.Serializer):
    file = serializers.FileField()
    