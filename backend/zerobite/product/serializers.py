from rest_framework import serializers
from .models import *
from datetime import date

class ProductSerializer(serializers.ModelSerializer):
  discounted_price = serializers.SerializerMethodField()

  class Meta:
    model = Product
    fields = ['id','business','category',
  'name','description','price','image',
  'manufactured_date','expiry_date','stock'
  'available','discounted_price']
    read_only_fields = ('business', 'discounted_price')
  

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
  
  def create(self, validated_data):
    validated_data.pop('discounted_price', None)

    validated_data['business'] = self.context['request'].business

    return Product.objects.create(**validated_data)
    
    

    