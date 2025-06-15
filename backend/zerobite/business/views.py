# from django.shortcuts import render

# Create your views here.
# business/views.py
from rest_framework.views import APIView
from rest_framework.response import Response

class LoginView(APIView):
    def get(self, request):
        return Response({"message": "Hello from business login"})
