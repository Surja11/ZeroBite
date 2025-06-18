from rest_framework import serializers
from .models import * 
from django.contrib.auth.password_validation import validate_password

class RegisterSerializer(serializers.ModelSerializer):
  password = serializers.CharField(write_only = True, required = True, validators = [validate_password])
  password2 = serializers.CharField(write_only = True, required = True)
  user_type = serializers.ChoiceField(choices = User.USER_TYPE_CHOICES)



  class Meta:
    model = User
    fields = ['email','password','password2','user_type']
  print("serializer account")
  def validate(self, attrs):
    if attrs['password']!= attrs['password2']:
      raise serializers.ValidationError({
        "password": "Password fields do not match"
      })
    return attrs
  
  def create(self, validated_data):
        password = validated_data.pop('password')
        validated_data.pop('password2')
        
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user
  