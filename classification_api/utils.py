import torch
import torchvision
import requests


weights = torchvision.models.MobileNet_V3_Small_Weights.DEFAULT
preprocess = weights.transforms()
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


def load_models(classifier_path):
    """
    Loads the classification model.
    """
    classification_model = torch.jit.load(classifier_path)
    return classification_model


def process_img(img):
    """
    Processes the image into an appropriate format for inference (resnet50).
    """
    x = preprocess(img).unsqueeze(0)
    return x


def get_prediction(classification_model, input_img, n):
    """
    Finds n similar images of an input_img
    """
    
    # process image for inference
    x = process_img(input_img)
    
    # get classification label
    prediction = classification_model(x).squeeze(0).softmax(0)
    class_id = prediction.argmax().item()
    score = prediction[class_id].item()
    category_name = weights.meta["categories"][class_id]
    print(f"{category_name}: {100 * score:.1f}%")

    # retrieve comparison images
    img_urls = fetch_imgs(category_name, n_pages=5)
    print(f"{len(img_urls)} images retrieved.")

    return {
        "classification": category_name,
        "img_urls": img_urls
    }