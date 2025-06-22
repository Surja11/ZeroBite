
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from rest_framework.decorators import permission_classes, api_view
from .permissons import *


class BusinessRegisterView(APIView):
    def post(self, request):
        serializer = BusinessRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  
            return Response({"message": "Business registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
@permission_classes([IsBusinessPermission])
def changeLocation(request):
    try:
        business = request.user.business

        serializer = BusinessLocationSerializer.save(instance = business, data = request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': "Business Location changed successfully"},status= status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except AttributeError:
        return Response({'error': "User is not associated with a business account"})
    
