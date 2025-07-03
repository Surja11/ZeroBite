import re


class PorterStemmer:

  def __init__(self):
    self.vowels = {'a','e','i','o','u'}

  def countVC(self, word):
    count = 0
    prev_vow = False
    for char in word:
      if char in self.vowels:
        prev_vow = True
      else:
        if prev_vow:
          count += 1
          prev_vow = False
    return count
  
  def containsVowel(self, word):
    for char in word:
      if char in self.vowels:
        return True
  
  def cvc(self, word):
    if len(word)<3:
      return False
    if word[-3] not in self.vowels:
      if word[-2] in self.vowels:
        if word[-1] not in self.vowels and word[-1] not in {'w','x','y'}:
          return True
    return False
  
  def dcandnotLSZ(self, word):
    if len(word)<2:
      return False
    return word[-1] == word [-2] and word [-1] not in {'l', 's', 'z'}
  
  def dc(self, word):
    return word[-1] == word[-2]
  




  def stem(self, word):
    word = word.lower()

    if word.endswith('sses') or word.endswith('ies'):
      word =  word[:-2]
    elif word.endswith('s') and not word.endswith('ss'):
      word = word[:-1]

  
    if word.endswith('eed'):
      if self.countVC(word[:-3])>0:
        word = word[:-1]
    
    elif re.search(r'[aeiou].*(ed|ing)$', word):
      word = re.sub(r'(ed|ing)$','',word)
      if word.endswith('at') or word.endswith('bl') or word.endswith('iz'):
        word += 'e'
      
      elif self.dcandnotLSZ(word):
        word = word[:-1]

      elif self.countVC(word) == 1 and self.cvc(word):
        word += 'e'
    

    if word[-1] == 'y' and self.containsVowel(word[:-1]):
      word = word[:-1] + 'i'


    suffixes2 = {
      "ational":"ate",
      "tional": "tion",
      "enci": "ence",
      "anci": "ance",
      "izer":"ize",
      "abli":"able",
      "alli":"al",
      "entli":"ent",
      "eli":"e",
      "ousli":"ous",
      "ization":"ize",
      "ation":"ate",
      "ator":"ate",
      "alism":"al",
      "iveness": "ive",
      "fulness":"ful",
      "ousness":"ous",
      "aliti":"al",
      "iviti":"ive",
      "biliti":"ble"
      }
    
    for key in suffixes2:
      if word.endswith(key):
        stem = word[:-len(key)]
        if self.countVC(stem)>0:
          word = stem + suffixes2[key]

    suffixes3  = {
      "icate":"ic",
      "ative":"",
      "alize":"al",
      "iciti": "ic",
      "ical":"ic",
      "ful":"",
      "ness":""
    }
    for key in suffixes3:
      if word.endswith(key):
        stem = word[:-len(key)]
        if self.countVC(stem)>0:
          word = stem + suffixes3[key]

    suffixes4 = [
      "al", "ance","able","ant","ate",
      "ence","er","ement","ment","ent",
      "ic","ible","ism","iti","ive","ize",
      "ous","ou","ion"
    ]
    for key in suffixes4:
      if word.endswith(key):
        stem = word[:-len(key)]
        if (key) == "ion" and stem and stem[-1] not in "st":
          continue
        if self.countVC(stem) > 1:
          word = stem

    if word.endswith("e"):
      m = self.countVC(word[:-1])
      if m>1 or(m == 1 and not self.cvc(word[:-1])):
        word = word[:-1]
      
    
    if self.countVC(word)>1 and self.dc(word) and word.endswith("l"):
      word = word[:-1]
    return word


if __name__ == "__main__":
    stemmer = PorterStemmer()
    print(stemmer.stem("development"))
    print(stemmer.stem("relational"))
    print(stemmer.stem("happiness"))
    print(stemmer.stem("agreed"))
    print(stemmer.stem("conflated"))

