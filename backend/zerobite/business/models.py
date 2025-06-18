from django.db import models
from account.models import *

# Create your models here.
class Business(models.Model):
  BUSINESS_TYPE = [
    ("bakery","Bakery"),
    ("restaurant","Restaurant"),
    ("convenience_store","Convenience Store"),
  ]
  user = models.OneToOneField(User, on_delete = models.CASCADE, related_name = "business")
  phone = models.CharField(max_length=10)
  store_address = models.TextField()
  business_name = models.CharField(max_length = 150)
  business_type = models.CharField(max_length = 20, choices=BUSINESS_TYPE)

  def __str__(self):
    return self.business_name
  

