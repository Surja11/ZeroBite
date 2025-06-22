from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import *

class CustomerRegisterSerializer(serializers.ModelSerializer):
  email = serializers.CharField(write_only = True)
  password = serializers.CharField(write_only = True, required = True, validators = [validate_password])
  password2 = serializers.CharField(write_only = True, required = True)

  class Meta:
    model = Customer
    fields = ['email' , 'password' , 'password2',
              'first_name' , 'last_name' , 'address',
              'phone' ]
    
  def validate(self,data):
    if data['password']!= data['password2']:
      raise serializers.ValidationError({'message': "passwords do not match"})
    return data
  
  def create(self, validated_data):
    email = validated_data.pop('email')
    first_name = validated_data.pop('first_name')
    last_name = validated_data.pop('last_name')
    name = first_name+" "+last_name
    password = validated_data.pop('password')
    validated_data.pop('password2')

    # user = User.objects.create_user(email = email, name = name, password = password, user_type = "customer")
    # user.save()

    customer = Customer.objects.create_user(
      email = email,
      name = name,
      password = password,
      user_type = "customer",
      first_name = first_name,
      last_name = last_name,
      phone = validated_data['phone'],
      address = validated_data['address']
      )
    customer.save()
    return customer
