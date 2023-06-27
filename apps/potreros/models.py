from django.db import models
from apps.trutests.models import Animal

class Potrero(models.Model):
    name = models.CharField(max_length=100)
    size = models.IntegerField()
    animales = models.ManyToManyField(Animal)
    
    def __str__(self):
        return self.name
