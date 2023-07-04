from django.db import models
from apps.potreros.models import Potrero


class Animal(models.Model):
    ide = models.CharField(max_length=100, unique=True)
    idv = models.CharField(max_length=100,unique=True)
    fecha = models.CharField(max_length=100, blank=True, null=True)
    hora = models.CharField(max_length=100, blank=True, null=True)
    fecha_de_nac = models.CharField(max_length=100, blank=True, null=True)
    raza = models.CharField(max_length=100, blank=True, null=True)
    ubicacion = models.CharField(max_length=100, blank=True, null=True)#Ver si conviene cambiar por potrero aca y como hacerlo
    inscripta = models.CharField(max_length=100, blank=True, null=True)
    peso = models.FloatField(blank=True, null=True)
    nota = models.CharField(max_length=255, blank=True, null=True)
    potrero =  models.ForeignKey(Potrero,on_delete=models.PROTECT,blank=True,related_name='animales')

    class Meta:
        verbose_name_plural = "Animales"

    def __str__(self):
        return f"{self.id} - {self.ide} - {self.potrero}"


class CSVFile(models.Model):
    file = models.FileField(upload_to='files/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name
