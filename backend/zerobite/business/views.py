
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import BusinessRegisterSerializer

class BusinessRegisterView(APIView):
    def post(self, request):
        serializer = BusinessRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  
            return Response({"message": "Business registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
