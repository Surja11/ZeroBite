from math import radians, cos, sin, asin, sqrt

class PriorityQueue:
  def __init__(self):
    self.heap = []
  
  def push(self, priority, item):
    self.heap.append((priority, item))
    self.shift_up(len(self.heap) -1)
  
  def pop(self):
    if not self.heap:
      return None
    if len(self.heap) == 1:
      return self.heap.pop()[1]
    self.swap(0, len(self.heap) - 1)
    item = self.heap.pop()[1]
    self.shift_down(0)
    return item
  
  def shift_up(self, i):
    parent = (i-1)//2
    while i > 0 and self.heap[i][0]< self.heap[parent][0]:
      self.swap(i, parent)
      i = parent
      parent = (i - 1)//2

  def shift_down(self, i):
    size = len(self.heap)
    while True:
      smallest = i
      left = 2*i + 1
      right = 2*i + 2

      if left<size and self.heap[left][0]<self.heap[smallest][0]:
        smallest = left
      
      if right<size and self.heap[right][0]<self.heap[smallest][0]:
        smallest = right

      if smallest == i: 
        break
      
      self.swap(i, smallest)
      i = smallest
    
  def swap(self,i , j):
    temp = self.heap[i]
    self.heap[i] = self.heap[j]
    self.heap[j] = temp

  def size(self):
    return len(self.heap)



# def haversine(lat1, lat2, lon1, lon2):
#   R = 6371
#   dlat = radians(lat2 - lat1)
#   dlon = radians(lon2 - lon1)
#   a = sin(dlat/2)**2 + cos(radians(lat1))* cos(radians(lat2)) *sin(dlon/2)**2
#   c = 2 * asin(sqrt(a))
#   return R*c

def batch_haversine(user_lat, user_lon, products):
    R = 6371  # Earth radius in km
    user_lat_rad = radians(user_lat)
    user_lon_rad = radians(user_lon)
    distances = []
    
    for product in products:
        store_lat = radians(float(product.business.store_latitude))
        store_lon = radians(float(product.business.store_longitude))
        
        dlat = store_lat - user_lat_rad
        dlon = store_lon - user_lon_rad
        
        a = sin(dlat/2)**2 + cos(user_lat_rad) * cos(store_lat) * sin(dlon/2)**2
        distances.append(2 * R * asin(sqrt(a)))
    
    return distances


def normalize(value, min_value, max_value):
  if max_value == min_value:
    return 0
  return(value - min_value)/(max_value- min_value)

def calc_priority(distance_km, days_to_expiry, max_distance, max_days):
  norm_distance = normalize(distance_km, 0, max_distance)
  norm_expiry = normalize(days_to_expiry, 0, max_days)
  return norm_distance * 0.3 + norm_expiry * 0.7


if __name__ == "__main__":
   
    class Product:
        def __init__(self, name, store_lat, store_lon, days_to_expiry):
            self.name = name
            self.business = type('Business', (), {})() 
            self.business.store_latitude = store_lat
            self.business.store_longitude = store_lon
            self.days_to_expiry = days_to_expiry

        def __repr__(self):
            return f"{self.name} (Expiry: {self.days_to_expiry} days)"

    user_lat = 27.7
    user_lon = 85.3

 
    products = [
        Product("Biscuit", 27.701, 85.302, 2),
        Product("Cheese", 27.705, 85.305, 5),
        Product("Butter", 27.710, 85.310, 1),
        Product("Yogurt", 27.695, 85.290, 4)
    ]

    print("user location")
    print(f"latitude:{user_lat} longitude:{user_lon}")
    print()

    print("products and their details")
    for product in products:
       print(f"{product.name}, store_latitude:{product.business.store_latitude}, store_longitude:{product.business.store_longitude}, days till expiry:{product.days_to_expiry}")
       print()

   
    distances = batch_haversine(user_lat, user_lon, products)


    max_distance = max(distances)
    max_days = max(p.days_to_expiry for p in products)

    pq = PriorityQueue()
    for product, distance in zip(products, distances):
        priority = calc_priority(distance, product.days_to_expiry, max_distance, max_days)
        pq.push(priority, product)

    print("Products sorted by priority (most urgent first):")
    while pq.size() > 0:
        print(pq.pop())
