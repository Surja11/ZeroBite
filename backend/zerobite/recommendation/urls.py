from django.urls import path
from .views import *

urlpatterns = [ 
  path('',ProductRecommendationView.as_view(), name = "recommendation")
]