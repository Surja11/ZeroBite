import re, math
from porterstemmer import *
from stopwords import *
from collections import defaultdict


class TFIDF:
  def __init__(self,documents):
    self.documents = documents
    self.vocab = set()
    self.stemmer = PorterStemmer()
    self.processed_documents = {}
    self.tfidf_matrix = []
    self.doc_ids = list(documents.keys())

  def preprocess(self, text):
    text = text.lower()
    text = re.sub(r'[^\w\s]',"",text)
    tokens = text.split()
    exclude_stopwords = [token for token in tokens if token not in STOP_WORDS]
    stemmed_words = [self.stemmer.stem(word) for word in exclude_stopwords]
    return stemmed_words
  
  def build_vocab(self):
    for doc_id, text in self.documents.items():
      tokens = self.preprocess(text)
      self.processed_documents[doc_id] = tokens
      self.vocab.update(tokens)
    self.vocab = sorted(list(self.vocab))
  

  def compute_tf(self, document):
    tf = defaultdict(float)
    for term in document:
      tf[term] += 1
    total_terms = len(document)
    for term in tf:
      tf[term] = tf[term]/total_terms
    return tf
    


  def compute_idf(self):
    idf = {}
    total_documents = len(self.processed_documents)
    for term in self.vocab:
      token_in_doc_count= sum(1 for tokens in self.processed_documents.values() if term in tokens)
      idf[term] = math.log((total_documents+1)/(token_in_doc_count+1))+1
    return idf
    
  def compute_tfidf(self):
        self.build_vocab()
        self.idf = self.compute_idf()
        
        for doc_id in self.doc_ids:
            tf = self.compute_tf(self.processed_documents[doc_id])
            tfidf_vector = [tf.get(term, 0) * self.idf.get(term, 0) for term in self.vocab]
            self.tfidf_matrix.append((doc_id, tfidf_vector))
        
        return self.tfidf_matrix

  def cosine_similarity(self, vec1, vec2):
        dot_product = sum(a * b for a, b in zip(vec1, vec2))
        norm1 = math.sqrt(sum(a * a for a in vec1))
        norm2 = math.sqrt(sum(b * b for b in vec2))
        if norm1 == 0 or norm2 == 0:
            return 0.0
        return dot_product / (norm1 * norm2)


if __name__ == "__main__":
  documents = {
    "doc1": "The quick brown fox jumps over the lazy dog",
    "doc2": "Never jump over the lazy dog quickly",
    "doc3": "Fast foxes and quick dogs"
  }

  tfidf = TFIDF(documents)
  matrix = tfidf.compute_tfidf()


  similarity = tfidf.cosine_similarity(matrix[0][1], matrix[1][1])
  print(f"Similarity between doc1 and doc2: {similarity:.2f}")
   
