from rest_framework import  serializers
from product.models import *
from datetime import date

class ProductRecommendationSerializer(serializers.ModelSerializer):
  similarity = serializers.FloatField(read_only = True)
  score = serializers.FloatField(read_only = True)
  discounted_price = serializers.SerializerMethodField()

  class Meta:
    model = Product
    fields = ['id',  'business','category', 'name' ,'price' ,'image' ,'manufactured_date','expiry_date','available','brand', 'view_count', 'similarity','score','discounted_price']
    read_only_fields = ('business', 'discounted_price',)
  

  def get_discounted_price(self, obj):
    days_to_expiry = (obj.expiry_date - date.today()).days 
    if days_to_expiry< 2:
      return obj.price * 0.4
    elif days_to_expiry<4:
      return obj.price *0.65
    elif days_to_expiry<7:
      return obj.price * 0.8
    elif days_to_expiry<11:
      return obj.price * 0.9
    return obj.price

    
