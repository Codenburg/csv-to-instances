from django.db import models

class Establishment(models.Model):
    name = models.CharField(max_length=100)
   
    def __str__(self):
        return self.name

class Potrero(models.Model):
    name = models.CharField(max_length=100)
    establishment = models.ForeignKey(Establishment,on_delete=models.PROTECT,related_name='potreros')
    
    def __str__(self):
        return self.name





