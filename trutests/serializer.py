from rest_framework import serializers
from .models import Trutest

class TrutestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trutest
        # fields = ('id', 'title', 'description', 'done')
        fields = '__all__'