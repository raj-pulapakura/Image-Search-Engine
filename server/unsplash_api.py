import cv2
import numpy as np
import requests
import urllib.request as urlreq

client_id = "1Rb3JZ4ZLqv1ps70yBqjxmpvWkoOeORD2mnh5UekJGk"

def fetch_imgs(keyword, n_pages=3):
  img_urls = []
  for i in range(1, n_pages+1):
    url = f"https://api.unsplash.com/search/photos?page={i}&query={keyword}&client_id={client_id}"
    results = requests.get(url).json()["results"]
    for x in results:
      img_urls.append(x["urls"]["small"])
  return img_urls

def load_img_from_url(url):
  resp = urlreq.urlopen(url)
  image = np.asarray(bytearray(resp.read()), dtype="uint8")
  image = cv2.imdecode(image, cv2.IMREAD_COLOR)
  image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
  return image