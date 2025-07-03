from rest_framework import  serializers
from product.models import *

class ProductRecommendationSerializer(serializers.ModelSerializer):
  similarity = serializers.FloatField()
  score = serializers.FloatField()

  class Meta:
    model = Product
    fields = ['id',  'business','category', 'name' ,'price' ,'image' ,'manufactured_date','expiry_date','available','brand','tags', 'view_count', 'similarity','score']