from rest_framework import serializers
from .models import *
from datetime import date

class ProductSerializer(serializers.ModelSerializer):
  discounted_price = serializers.SerializerMethodField()
  category =  serializers.SlugRelatedField(
     many = True,
     queryset = Category.objects.all(),
     slug_field = 'name'
  )

  class Meta:
    model = Product
    fields = ['id','business','category',
  'name','description','price','image',
  'manufactured_date','expiry_date','stock',
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
    category = validated_data.pop('category', [])
    user = self.context['request'].user
    business = self._get_business_instance(user)
    if not business:
      raise serializers.ValidationError("User is not registered as a business.")
    validated_data['business'] = business
    product =  Product.objects.create(**validated_data)
    product.category.set(category)
    return product
  
  def _get_business_instance(self, user):
        try:
            return Business.objects.get(id=user.id)
        except Business.DoesNotExist:
            return None

    
    

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
      model = Category
      fields  = '__all__'