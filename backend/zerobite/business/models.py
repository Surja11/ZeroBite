from django.db import models
from account.models import *

# Create your models here.
class Business(User):
  BUSINESS_TYPE = [
    ("bakery","Bakery"),
    ("restaurant","Restaurant"),
    ("convenience_store","Convenience Store"),
  ]
  # user = models.OneToOneField(User, on_delete = models.CASCADE, related_name = "business")
  phone = models.CharField(max_length=10)
  store_address = models.TextField()
  business_name = models.CharField(max_length = 150)
  business_type = models.CharField(max_length = 20, choices=BUSINESS_TYPE)
  store_latitude = models.DecimalField(max_digits=11, decimal_places= 8)
  store_longitude = models.DecimalField(max_digits= 11, decimal_places = 8)

  class Meta:
    db_table= "business_business"
  def __str__(self):
    return self.business_name
  

