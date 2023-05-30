from django.db import models

class Animal(models.Model):
    ide = models.CharField(max_length=100)
    idv = models.CharField(max_length=100)
    fecha = models.CharField(max_length=100, blank=True, null=True)
    hora = models.CharField(max_length=100 ,blank=True, null=True)
    fecha_de_nac = models.CharField(max_length=100, blank=True, null=True)
    raza = models.CharField(max_length=100 ,blank=True, null=True)
    ubicacion = models.CharField(max_length=100 ,blank=True, null=True)
    inscripta = models.CharField(max_length=100, blank=True, null=True)
    peso = models.FloatField(blank=True,null=True)
    nota = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        verbose_name_plural = "Animales"

class CSVFile(models.Model):
    file = models.FileField(upload_to='files/')
    uploaded_at = models.DateTimeField(auto_now_add=True)