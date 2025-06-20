from rest_framework import serializers
from .models import *
from datetime import date

class ProductSerializer(serializers.ModelSerializer):
  discounted_price = serializers.SerializerMethodField()

  class Meta:
    model = Product
    fields = ['business','category',
  'name','description','price','image',
  'manufactured_date','expiry_date',
  'available','discounted_price']
    read_only_fields = ('business', 'discounted_price')
  

  def get_discounted_price(self, obj):
    if obj['expiry_date']-date.today()<=1:
      return obj.price * 0.4
    elif obj['expiry_date']- date.today()<=3:
      return obj.price *0.65
    elif obj['expiry_date'] -date.today()<=6:
      return obj.price * 0.8
    elif obj['expiry_date'] - date.today()<=10:
      return obj.price * 0.9
    return obj.price
  
  def create(self, validated_data):
    validated_data.pop('discounted_price', None)

    validated_data['business'] = self.context['request'].user.business

    return Product.objects.create(**validated_data)
    
    

    