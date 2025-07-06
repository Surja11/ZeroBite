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
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import api_view,permission_classes
from django.core.cache import cache
from django.utils import timezone
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated
# Create your views here.

@api_view(['GET'])
@permission_classes([IsBusinessPermission])
def showCategory(request):
  category = Category.objects.all()
  serializer = CategorySerializer(category, many = True)
  return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def showProduct(request, pk):
    cache_key = f"product_detail_{pk}"
    cached_data = cache.get(cache_key)
    if cached_data:
        print(" Cache hit")
        return Response(cached_data)

    product = get_object_or_404(Product, pk=pk)
    serializer = ProductSerializer(product)
    cache.set(cache_key, serializer.data, timeout=86400) 
    return Response(serializer.data)

# class StandardResultsSetPagination(PageNumberPagination):
#     page_size = 15  
    


# class ProductView(APIView):
#   def get(self, request):
#     products = Product.objects.all()

#     user_lat = float(request.query_params.get('lat'))
#     user_lon = float(request.query_params.get('lon'))
    
#     distance_map = {}
#     expiry_map = {}

#     distance_list = []
#     expiry_list = []

#     for product in products:
#       store_lat = float(product.business.store_latitude)
#       store_lon = float(product.business.store_longitude)
#       expiry = product.expiry_date

#       distance = haversine(user_lat, store_lat, user_lon, store_lon)

#       days_to_expiry = (expiry - date.today()).days

#       distance_map[product.id] = distance
#       expiry_map[product.id] = days_to_expiry
#       distance_list.append(distance)
#       expiry_list.append(days_to_expiry)

#     max_distance = max(distance_list) if distance_list else 1
#     max_days = max(expiry_list) if expiry_list else 1


#     heap = PriorityQueue()

#     for product in products:
#       distance = distance_map[product.id]
#       days_to_expiry = expiry_map[product.id]
#       priority = calc_priority(distance, days_to_expiry, max_distance, max_days)
#       heap.push(priority, product)
    
#     sorted_products = []
#     while heap.size()>0:
#       product = heap.pop()
#       print("POPPED:", product)
#       if product:
#         sorted_products.append(product)
    
#     # paginator = StandardResultsSetPagination()
#     # paginated_products = paginator.paginate_queryset(sorted_products, request)

#     # serializer = ProductSerializer(paginated_products, many = True)
#     # return paginator.get_paginated_response(serializer.data)
#     serializer = ProductSerializer(sorted_products, many = True)
#     return Response(serializer.data)

# class ProductView(APIView):
#     def get(self, request):
       
#         products = Product.objects.select_related('business').only(
#             'id', 'expiry_date', 'business__store_latitude', 'business__store_longitude'
#         ).all()
        
#         user_lat = float(request.query_params.get('lat', 0))
#         user_lon = float(request.query_params.get('lon', 0))
        

#         distances = batch_haversine(user_lat, user_lon, products)
#         expiry_days = [(p.expiry_date - date.today()).days for p in products]
        
#         max_distance = max(distances) if distances else 1
#         max_days = max(expiry_days) if expiry_days else 1
        

#         heap = PriorityQueue()
#         for product, distance, days in zip(products, distances, expiry_days):
#             priority = calc_priority(distance, days, max_distance, max_days)
#             heap.push(priority, product)
        

#         sorted_products = []
#         while heap.size() > 0 and len(sorted_products) < 100:
#             product = heap.pop()
#             if product:
#                 sorted_products.append(product)
        
#         serializer = ProductSerializer(sorted_products, many=True)
#         return Response(serializer.data)




class ProductView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user_lat = float(request.query_params.get('lat', 0))
        user_lon = float(request.query_params.get('lon', 0))

        print(user_lat, user_lon)

        cache_key = f"products_{round(user_lat, 3)}_{round(user_lon, 3)}"
        cached_data = cache.get(cache_key)
        if cached_data:
            print("Cache hit")
            return Response(cached_data)

        print("Cache miss — computing and caching")
        today= timezone.now().date()
        Product.objects.filter(
        Q(expiry_date__lte=today) & ~Q(category__name__in=['Fast Food','Indian Cuisine','Chinese Cuisine','Continental','Nepali Khana']) |
        Q(expiry_date__lt=today, category__name__in=['Fast Food','Indian Cuisine','Chinese Cuisine','Continental','Nepali Khana'])
        ).delete()

        print("product deleted")


        products = Product.objects.select_related('business','category').only(
            'id', 'expiry_date', 'business__store_latitude', 'business__store_longitude',
            'category__name',
        ).all()
    
        print("product received")

        distances = batch_haversine(user_lat, user_lon, products)
        expiry_days = [(p.expiry_date - date.today()).days for p in products]

        max_distance = max(distances) if distances else 1
        max_days = max(expiry_days) if expiry_days else 1

    
        heap = PriorityQueue()
        for product, distance, days in zip(products, distances, expiry_days):
            priority = calc_priority(distance, days, max_distance, max_days)
            heap.push(priority, product)
        print("pushed in priority queue")

        sorted_products = []
        while heap.size() > 0 and len(sorted_products) < 100:
            product = heap.pop()
            if product:
                sorted_products.append(product)
        print("product sorted")

        # paginator = StandardResultsSetPagination()
        # paginated_products = paginator.paginate_queryset(sorted_products,request)

 
        serializer = ProductSerializer(sorted_products, many=True)

        cache.set(cache_key, serializer.data, timeout=86400)

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

    if id is not None:
      product = get_object_or_404(Product,pk = pk)
      serializer = ProductSerializer(product)
      return Response(serializer.data)
    
  def update(self, request, pk):
    
    product = get_object_or_404(Product, pk = pk)
    try:
      serializer = ProductSerializer(product, data = request.data, context = {'request': request})
      if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Product updated'},status = status.HTTP_200_OK)
    except:
      return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
  def destroy(self, request, pk):
  
    product = get_object_or_404(Product, pk = pk)
    product.delete()
    return Response({'message': 'Deleted'})
    

