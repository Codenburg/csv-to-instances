from django.db import models


class Animal(models.Model):
    ide = models.CharField(max_length=100, unique=True)
    idv = models.CharField(max_length=100,unique=True)
    fecha = models.CharField(max_length=100, blank=True, null=True)
    hora = models.CharField(max_length=100, blank=True, null=True)
    fecha_de_nac = models.CharField(max_length=100, blank=True, null=True)
    raza = models.CharField(max_length=100, blank=True, null=True)
    ubicacion = models.CharField(max_length=100, blank=True, null=True)
    inscripta = models.CharField(max_length=100, blank=True, null=True)
    peso = models.FloatField(blank=True, null=True)
    nota = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        verbose_name_plural = "Animales"

    def __str__(self):
        return self.ide


class CSVFile(models.Model):
    file = models.FileField(upload_to='files/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name
