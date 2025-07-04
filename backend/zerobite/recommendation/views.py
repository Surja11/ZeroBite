from django.shortcuts import render
from product.models import *
from rest_framework.views import APIView
from .services.recommendationalgo import *
from rest_framework.response import Response
from product.priority_utils import *
from .serializers import *

# Create your views here.

def build_documents(products):
  documents = {}
  for product in products:
    text = f"{product.name} {product.description} {product.category.name} {product.brand}"
    documents[str(product.id)]  = text
  return documents

class ProductRecommendationView(APIView):
  def get(self, request):
    products = Product.objects.all()
    documents = build_documents(products)

    tfidf = TFIDF(documents)
    tfidf.compute_tfidf()


    query = request.query_params.get("query")
    product_id = request.query_params.get("product_id")

    if product_id:
      try:
        product = Product.objects.get(id = product_id)
        query = f"{product.name}"
      except Product.DoesNotExist:
        return Response({"error":"Product not found"})
   

    query_vector = tfidf.query_vector(query)
    pq = PriorityQueue()

    for doc_id, doc_vec in tfidf.tfidf_matrix:
      if doc_id == str(product_id):
        continue
      similarity = tfidf.cosine_similarity(query_vector, doc_vec)
      pq.push(-similarity, (doc_id,similarity))

    results = []
    for _ in range(min(7, pq.size())):
      doc_id, sim = pq.pop()
      product = Product.objects.get(id=doc_id)
      product.similarity = sim
           
      results.append(product)

      serializer = ProductRecommendationSerializer(results, many=True)
      return Response(serializer.data)
    



    
