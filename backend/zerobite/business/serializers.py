from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from account.models import User
from .models import Business

class BusinessRegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(write_only=True)
    name = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True)
    
    class Meta:
        model = Business
        fields = [
            'email', 'name', 'password', 'password2',
            'business_name', 'phone', 'store_address', 'business_type'
        ]
    
    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Passwords don't match"})
        return data

    def create(self, validated_data):
       
        email = validated_data.pop('email')
        name = validated_data.pop('name')
        password = validated_data.pop('password')
        validated_data.pop('password2') 
        
   
        user = User.objects.create_user(
            email=email,
            name=name,
            password=password,
            user_type="business"  
        )
      
       
        business = Business.objects.create(
            user=user,
            business_name=validated_data.pop('business_name'),
            phone=validated_data.pop('phone'),
            store_address=validated_data.pop('store_address'),
            business_type=validated_data.pop('business_type')
        )
        
        return business