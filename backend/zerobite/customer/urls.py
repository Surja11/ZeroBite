from django.urls import path
from .views import *
urlpatterns = [
  path('customerregister/',CustomerRegisterView.as_view(), name="customer-register")
]