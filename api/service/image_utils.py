import requests
from PIL import Image
from io import BytesIO


def fetch_imgs(keyword, n_pages=3):
  """
  Fetches images from the Unsplash API given a keyword (e.g. Labrador)
  """
  img_urls = []
  client_id = "1Rb3JZ4ZLqv1ps70yBqjxmpvWkoOeORD2mnh5UekJGk"
  for i in range(1, n_pages+1):
    url = f"https://api.unsplash.com/search/photos?page={i}&query={keyword}&client_id={client_id}"
    results = requests.get(url).json()["results"]
    for x in results:
      img_urls.append({
        "small": x["urls"]["small"],
        "full": x["urls"]["full"],
      })

  return img_urls


def load_img_from_url(url):
  """
  Loads an image from a url as an array
  """
  response = requests.get(url)
  image = Image.open(BytesIO(response.content))
  return image