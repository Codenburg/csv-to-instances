from django.db import models

class Trutest(models.Model):
    file = models.FileField(upload_to='media/')
    idv = models.CharField(max_length=100, blank=True)#caravana visual
    peso = models.CharField(max_length=100, blank=True)#if file num is equal to 'peso' save him
    notas = models.CharField(max_length=100, blank=True)
    ide = models.CharField(max_length=100, blank=True)#caravana electronicas
    corral= models.CharField(max_length=100, blank=True)
    dosis= models.CharField(max_length=100, blank=True)
    lote= models.CharField(max_length=100, blank=True)
    vencimineto_lote= models.CharField(max_length=100, blank=True)
    fechafinal_pr= models.CharField(max_length=100, blank=True)
    fechafinal_ise= models.CharField(max_length=100, blank=True)
    fecha = models.CharField(max_length=100, blank=True)
    hora = models.CharField(max_length=100, blank=True)
#ver si existe una manera de guardar solo el archivo comprimido.Descromprimirlo en la view y que esta  se ocupe de tomar los campos y guardarlos en la db