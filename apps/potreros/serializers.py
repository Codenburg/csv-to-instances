from rest_framework import serializers
from .models import Potrero
from apps.trutests.serializer import TrutestSerializer


class PotreroSerializer(serializers.ModelSerializer):
    animales = TrutestSerializer(many=True)

    class Meta:
        model = Potrero
        fields = '__all__'
