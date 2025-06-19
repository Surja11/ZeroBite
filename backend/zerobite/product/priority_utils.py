class PriorityQueue:
  def __init__(self):
    self.heap = []
  
  def push(self, priority, item):
    self.heap.append((priority, item))
    self.shift_up(len(self.heap) -1)
  
  def pop(self, priority,item):
    if not self.heap:
      return None
    if len(self.heap) == 1:
      return self.heap.pop()
    self.swap(0, len(self.heap) - 1)
    item = self.head.pop()
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



  