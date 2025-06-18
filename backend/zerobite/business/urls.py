from django.urls import path
from .views import *

urlpatterns = [
  path('register/', BusinessRegisterView.as_view(), name = 'r' ),
]