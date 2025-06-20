from django.shortcuts import render
from .priority_utils import *
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework import status
from datetime import datetime, date
from business.permissons import *
from rest_framework import viewsets
# Create your views here.


class ProductView(APIView):
  def get(self, request):
    products = Product.objects.all()

    user_lat = float(request.query_params.get('lat'))
    user_lon = float(request.query_params.get('lon'))
    
    distances = {}
    expiries = {}

    distance_list = []
    expiry_list = []

    for product in products:
      store_lat = float(product.store.latitude)
      store_lon = float(product.store.longitude)
      expiry = product.expiry_date

      distance = haversine(user_lat, store_lat, user_lon, store_lon)

      days_to_expiry = (expiry - date.today()).days

      distances[product.id] = distance
      expiries[product.id] = days_to_expiry
      days_to_expiry.append(distance)
      expiry.append(days_to_expiry)

    max_distance = max(distance_list) if distance_list else 1
    max_days = max(days_to_expiry) if expiry_list else 1

    heap = PriorityQueue()

    for product in products:
      distance = distances[product.id]
      days_to_expiry = expiries[product.id]
      priority = calc_priority(distance, days_to_expiry, max_distance, max_days)
      heap.push((priority, product))
    
    sorted_products = []
    while heap.size()>0:
      product = heap.pop()
      if product:
        sorted_products.append(product)

    serializer = ProductSerializer(sorted_products, many = True)
    return Response(serializer.data)
  
  
class ProductViewSet(viewsets.ViewSet):
  permission_classes = [AddProductPermission]

  def create(self, request):
    try:
      business_instance = request.user.business
      
      
      serializer = ProductSerializer(data = request.data, context = {'request': request})
    
      if serializer.is_valid():
        serializer.save()
        return Response({"message": "Product Added"}, status= status.HTTP_201_CREATED)
    except:
      return Response({"error": "User is not associated with business"}, status= status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors)