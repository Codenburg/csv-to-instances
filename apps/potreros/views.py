from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.trutests.models import Animal
from .models import Potrero
from apps.trutests.serializer import TrutestSerializer
from .serializers import PotreroSerializer


class AgregarAnimalPotreroView(APIView):
    def post(self, request, animal_id, potrero_id):
        try:
            animal = Animal.objects.get(id=animal_id)
            potrero = Potrero.objects.get(id=potrero_id)

            # Verificar si el animal ya se encuentra en este potrero
            if potrero.animales.filter(id=animal_id).exists():
                return Response({'El animal ya se encuentra en este potrero.'}, status=status.HTTP_400_BAD_REQUEST)
            # Verificar si el animal ya se encuentra en otro potrero
            if Animal.objects.filter(potrero__isnull=False, id=animal_id).exists():
                return Response({'El animal ya se encuentra en otro potrero.'}, status=status.HTTP_400_BAD_REQUEST)

            # Asignar el animal al nuevo potrero
            potrero.animales.add(animal)

            serializer = PotreroSerializer(potrero)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Animal.DoesNotExist:
            return Response({'Animal no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

        except Potrero.DoesNotExist:
            return Response({'Potrero no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

class CambiarAnimalPotreroView(APIView):
    def post(self, request, animal_id, nuevo_potrero_id):
        try:
            animal = Animal.objects.get(id=animal_id)
            potrero_actual = Potrero.objects.get(animales=animal)
            nuevo_potrero = Potrero.objects.get(id=nuevo_potrero_id)

            # Verificar si el animal se encuentra en otro potrero
            if potrero_actual != nuevo_potrero:
                # Eliminar el animal del potrero actual
                potrero_actual.animales.remove(animal)

                # Asignar el animal al nuevo potrero
                nuevo_potrero.animales.add(animal)

                serializer = PotreroSerializer(nuevo_potrero)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({'El animal ya se encuentra en este potrero.'}, status=status.HTTP_400_BAD_REQUEST)

        except Animal.DoesNotExist:
            return Response({'error': 'Animal no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

        except Potrero.DoesNotExist:
            return Response({'error': 'Potrero no encontrado.'}, status=status.HTTP_404_NOT_FOUND)
