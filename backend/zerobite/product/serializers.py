from rest_framework import serializers
from .models import *
from datetime import date

class ProductSerializer(serializers.ModelSerializer):
  discounted_price = serializers.IntegerField()

  class Meta:
    model = Product
    fields = ['product', 'business','category',
  'name','description','price','image',
  'manufactured_date','expiry_date',
  'available','discounted_price']
  

  def get_discounted_price(self, obj):
    if obj['expiry_date']-date.today()<=1:
      return obj.price * 0.4
    elif obj['expiry_date']- date.today()<=3:
      return obj.price - 6.65
    elif obj['expiry_date'] -date.today()<=6:
      return obj.price * 0.8
    elif obj['expiry_date'] - date.today()<=10:
      return obj.price * 0.9
    return obj.price
    
    

    