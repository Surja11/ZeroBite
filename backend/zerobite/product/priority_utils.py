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
      return self.heap.pop()
    self.swap(0, len(self.heap) - 1)
    item = self.head.pop()[1]
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
      
      if right<size and self.heap[right]<self.heap[smallest][0]:
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



def haversine(lat1, lat2, lon1, lon2):
  R = 6371
  dlat = radians(lat2 - lat1)
  dlon = radians(lon2 - lon1)
  a = sin(dlat/2)**2 + cos(radians(lat1))* cos(radians(lat2)) *sin(dlon/2)**2
  c = 2 * asin(sqrt(a))
  return R*c

def normalize(value, min_value, max_value):
  if max_value == min_value:
    return 0
  return(value - min_value)/(max_value- min_value)

def calc_priority(distance_km, days_to_expiry, max_distance, max_days):
  norm_distance = normalize(distance_km, 0, max_distance)
  norm_expiry = normalize(days_to_expiry, 0, max_days)
  return norm_distance * 0.3 + norm_expiry * 0.7



