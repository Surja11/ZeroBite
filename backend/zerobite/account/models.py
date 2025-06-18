from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager,PermissionsMixin

class UserManager(BaseUserManager):
  def create_user(self, email, user_type, password = None, **extra_fields):
    if not email:
      raise ValueError("Email is required")
    
    email = self.normalize_email(email)
    user = self.model(email = email , user_type = user_type, **extra_fields)
    user.set_password(password)
    user.save()
    return user
  
  def create_superuser(self, email, password = None, user_type ="Admin" ,**extra_fields):
    return self.create_user(email, user_type, password = password, is_staff = True, is_superuser = True, **extra_fields)
  
class User(AbstractBaseUser, PermissionsMixin):
  USER_TYPE_CHOICES = [
    ("admin","Admin"),
    ("business","Business"),
    ("customer","Customer"),
  ]

  email = models.EmailField(unique = True)
  user_type = models.CharField(max_length = 20,choices=USER_TYPE_CHOICES)
  name = models.CharField(max_length = 100,blank = True)
  is_active = models.BooleanField(default = True)
  is_staff = models.BooleanField(default = False)

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['user_type']

  objects = UserManager()

  def __str__(self):
    return f"{self.email} ({self.user_type})"