from django.urls import path
from .views import *
urlpatterns = [
  path('getProducts/',ProductView.as_view()),
  path('getProducts/<int:pk>/',showProduct, name = 'getProductid'),
  path('showCategory/', showCategory, name='showCategory')
]