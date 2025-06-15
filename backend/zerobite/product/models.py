from django.db import models
from business.models import *

# Create your models here.
class Category(models.Model):
  BUSINESS_TYPE_CHOICES = [
    ("bakery","Bakery"),
    ("restaurant", "Restaurant"),
    ("convenience_store","Convenience Store"),

  ]
  name = models.CharField(max_length = 50)
  business_type = models.CharField(max_length=20, choices = BUSINESS_TYPE_CHOICES)

  def __str__(self):
    return f"{self.name}({self.business_type})"


class Product(models.Model):
  business = models.ForeignKey(Business, on_delete= models.CASCADE, related_name = "products")
  category = models.ForeignKey(Category, on_delete= models.CASCADE, related_name = "products")
  name = models.CharField(max_length=50)
  description = models.TextField()
  price = models.DecimalField(max_digits = 8, decimal_places = 2)
  image = models.ImageFiled(upload_to='products/', blank = True, null = True)
  manufactured_date = models.DateField()
  expiry_date = models.DateField()
  available = models.BooleanField(default = True)

  def __str__(self):
    return self.name


