from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout(request):
    if request.method == "POST":
        Token.objects.filter(user=request.user).delete()
        return Response({'message': 'You have been logged out.'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid request method.'}, status=status.HTTP_400_BAD_REQUEST)
