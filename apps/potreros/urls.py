from django.urls import path
from . import views

urlpatterns = [
    path('agregar/<int:animal_id>/<int:potrero_id>/', views.AgregarAnimalPotreroView.as_view(), name='agregar_animal_potrero'),
    path('cambiar/<int:animal_id>/<int:nuevo_potrero_id>/', views.CambiarAnimalPotreroView.as_view(), name='cambiar_animal_potrero'),
]
