from rest_framework import  serializers
from product.models import *

class ProductRecommendationSerializer(serializers.ModelSerializer):
  similarity = serializers.FloatField(read_only = True)
  score = serializers.FloatField(read_only = True)

  class Meta:
    model = Product
    fields = ['id',  'business','category', 'name' ,'price' ,'image' ,'manufactured_date','expiry_date','available','brand', 'view_count', 'similarity','score']