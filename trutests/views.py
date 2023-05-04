from rest_framework import viewsets
from .serializer import TrutestSerializer
from .models import Trutest

# Create your views here.
class TrutestView(viewsets.ModelViewSet):
    serializer_class = TrutestSerializer
    queryset = Trutest.objects.all()