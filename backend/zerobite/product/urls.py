from django.urls import path
from .views import *
urlpatterns = [
  path('getProducts/',ProductView.as_view())
]