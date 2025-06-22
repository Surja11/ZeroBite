from django.db import models
from account.models import *
# Create your models here.
class Customer(User):
  # user = models.OneToOneField(User, on_delete = models.CASCADE, related_name = "customer")
  first_name = models.CharField(max_length=20,default = "my")
  last_name = models.CharField(max_length = 20,default = "my")
  address = models.TextField(null = True, blank = True)
  phone = models.CharField(max_length=10, null = True, blank=True)

  class Meta:
    db_table = 'customer_customer'
  def __str__(self):
    return self.user.email
  
  