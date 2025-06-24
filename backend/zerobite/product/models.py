from django.db import models
from business.models import *
from customer.models import *

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
  price = models.FloatField()
  image = models.ImageField(upload_to='products/', blank = True, null = True)
  manufactured_date = models.DateField()
  expiry_date = models.DateField()
  stock = models.IntegerField()
  available = models.BooleanField(default = True)
  brand = models.CharField(max_length=50, blank=True)
  # tags = models.ManyToManyField('ProductTag', blank=True)
  view_count = models.PositiveIntegerField(default=0)
  def __str__(self):
    return self.name


class Cart(models.Model):
  customer = models.ForeignKey(Customer, on_delete = models.CASCADE)
  product = models.ForeignKey(Product, on_delete = models.CASCADE)
  business = models.ForeignKey(Business, on_delete=models.CASCADE)
  quantity = models.PositiveIntegerField(default = 1)


# class Order(models.Model):
