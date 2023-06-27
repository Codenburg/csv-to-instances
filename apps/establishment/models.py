from django.db import models
from apps.potreros.models import Potrero


class Establishment(models.Model):
    name = models.CharField(max_length=150)
    location = models.CharField(max_length=200)
    potrero = models.ForeignKey(Potrero, on_delete=models.PROTECT)

    def __str__(self):
        return self.name