from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
# Create your views here.

class CustomerRegisterView(APIView):
  def post(self, request):
    serializer = CustomerRegisterSerializer(data = request.data)

    if serializer.is_valid():
      serializer.save()
      return Response({"message": "Customer Registered Successfully"}, status = status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)