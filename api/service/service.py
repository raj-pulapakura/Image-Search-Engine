import bentoml
from bentoml.io import Image, JSON
import torchvision
import requests

client_id = "1Rb3JZ4ZLqv1ps70yBqjxmpvWkoOeORD2mnh5UekJGk"

def fetch_imgs(keyword, n_pages=3):
  """
  Fetches images from the Unsplash API given a keyword (e.g. Labrador)
  """
  img_urls = []
  for i in range(1, n_pages+1):
    url = f"https://api.unsplash.com/search/photos?page={i}&query={keyword}&client_id={client_id}"
    results = requests.get(url).json()["results"]
    for x in results:
      img_urls.append(x["urls"]["small"])
  return img_urls

weights = torchvision.models.MobileNet_V3_Small_Weights.DEFAULT
preprocess = weights.transforms()

BENTO_MODEL_TAG = "classification_model:bfw2elim4cmr36ej"

ise_runner = bentoml.pytorch.get(BENTO_MODEL_TAG).to_runner()

ise_service = bentoml.Service("ise_service", runners=[ise_runner])

@ise_service.api(input=Image(), output=JSON())
def classify(f: Image) -> JSON:
    # preprocess image
    x = preprocess(f).unsqueeze(0)
    # make prediction
    prediction = ise_runner.run(x)
    class_id = prediction.argmax().item()
    category_name = weights.meta["categories"][class_id]
    # retrieve comparison images
    img_urls = fetch_imgs(category_name, n_pages=5)
    print(f"{len(img_urls)} images retrieved.")

    return {
        "classification": category_name,
        "img_urls": img_urls,
    }