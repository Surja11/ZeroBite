from rest_framework import serializers
from .models import * 
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class RegisterSerializer(serializers.ModelSerializer):
  password = serializers.CharField(write_only = True, required = True, validators = [validate_password])
  password2 = serializers.CharField(write_only = True, required = True)
  user_type = serializers.ChoiceField(choices = User.USER_TYPE_CHOICES)



  class Meta:
    model = User
    fields = ['email','password','password2','user_type']

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
  

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
  @classmethod
  def get_token(cls, user):
    token = super().get_token(user)
    token['email'] = user.email
    token['user_type'] = user.user_type
    token['name'] = user.name
    return token
  

class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(required = True)
    password = serializers.CharField(required = True)

    def validate(self, data):
      email = data['email']
      password = data['password']

      user = authenticate(username = email, password = password)

      if user is None:
          raise serializers.ValidationError("Invalid email or password")
      data['user'] = user
      return data
