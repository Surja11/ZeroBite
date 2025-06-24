from django.shortcuts import render
from product.models import *
from rest_framework.views import APIView
from .services.recommendationalgo import *

# Create your views here.

def build_documents(products):
  documents = {}
  for product in products:
    text = f"{product.name} {product.description} {product.category.name} {product.tags} {product.brand}"
    documents[str(product.id)]  = text
  return documents

class ProductRecommendationView(APIView):
  def get(self, request, product_id):
    products = Product.objects.all()
    documents = build_documents(products)

    tfidf = TFIDF(documents)
    tfidf.compute_tfidf()

    recommendations = recommend_similar_products(product_id, tfidf)

    
