from django.shortcuts import render,get_object_or_404
from .priority_utils import *
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework import status
from datetime import datetime, date
from business.permissons import *
from rest_framework import viewsets
from rest_framework.decorators import api_view,permission_classes
# Create your views here.

@api_view(['GET'])
@permission_classes([IsBusinessPermission])
def showCategory(request):
  category = Category.objects.all()
  serializer = CategorySerializer(category, many = True)
  return Response(serializer.data)




class ProductView(APIView):
  def get(self, request):
    products = Product.objects.all()

    user_lat = float(request.query_params.get('lat'))
    user_lon = float(request.query_params.get('lon'))
    
    distance_map = {}
    expiry_map = {}

    distance_list = []
    expiry_list = []

    for product in products:
      store_lat = float(product.business.store_latitude)
      store_lon = float(product.business.store_longitude)
      expiry = product.expiry_date

      distance = haversine(user_lat, store_lat, user_lon, store_lon)

      days_to_expiry = (expiry - date.today()).days

      distance_map[product.id] = distance
      expiry_map[product.id] = days_to_expiry
      distance_list.append(distance)
      expiry_list.append(days_to_expiry)

    max_distance = max(distance_list) if distance_list else 1
    max_days = max(days_to_expiry) if expiry_list else 1

    heap = PriorityQueue()

    for product in products:
      distance = distance_map[product.id]
      days_to_expiry = expiry_map[product.id]
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
  permission_classes = [IsBusinessPermission]

  def create(self, request):
      serializer = ProductSerializer(data = request.data, context = {'request': request})
      # print("1")
      if serializer.is_valid():
        # print("2")
        try:
          serializer.save()
          # print('3')
          return Response({"message": "Product Added"}, status= status.HTTP_201_CREATED)
        except Exception as e:
          print(f"Error while saving : {str(e)}")
  
          return Response({"error": "User is not associated with business"}, status= status.HTTP_400_BAD_REQUEST)
      else:
        return Response(serializer.errors)
  
  def list(self, request):
      all_products = Product.objects.filter(business = request.user.business) 
      serializer = ProductSerializer(all_products, many = True)
      return Response(serializer.data)
   
  
  def retrieve(self,request, pk = None):
    id = pk 
    if id is not None:
      product = get_object_or_404(Product,id = id)
      serializer = ProductSerializer(product)
      return Response(serializer.data)
    
  def update(self, request, pk):
    id = pk 
    product = Product.objects.get(pk = id)
    try:
      serializer = ProductSerializer(product, data = request.data, context = {'request': request})
      if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Product updated'},status = status.HTTP_200_OK)
    except:
      return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
  def destroy(self, request, pk):
    id = pk
    product = Product.objects.get(pk= id)
    product.delete()
    return Response({'message': 'Deleted'})
    

