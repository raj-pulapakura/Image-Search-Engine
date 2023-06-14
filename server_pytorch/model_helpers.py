import numpy as np
from unsplash_api import fetch_imgs, load_img_from_url
import torch
import torchvision

weights = torchvision.models.ResNet50_Weights.DEFAULT
preprocess = weights.transforms()

def load_models(classifier_path, siamese_path):
    """
    Loads that classification model and siamese model.
    """
    classification_model = torch.jit.load(classifier_path)
    siamese_model = torch.jit.load(siamese_path)
    return classification_model, siamese_model


def process_img(img):
    """
    Processes the image into an appropriate format for inference (resnet50).
    """
    x = preprocess(img).unsqueeze(0)
    return x


def get_similar(classification_model, siamese_model, input_img, n):
    """
    Finds n similar images of an input_img
    """
    
    # process image for inference
    print("PROCESSING DA IMAGE")
    x = process_img(input_img)
    
    print("GETTING DEM PREDICTIONS")
    # get classification label
    prediction = classification_model(x).squeeze(0).softmax(0)
    class_id = prediction.argmax().item()
    score = prediction[class_id].item()
    category_name = weights.meta["categories"][class_id]
    print(f"{category_name}: {100 * score:.1f}%")

    # retrieve comparison images
    img_urls = fetch_imgs(category_name, n_pages=5)
    print(f"{len(img_urls)} images retrieved.")

    # compare images using siamese model
    sims = []

    for index, img_url in enumerate(img_urls):
        img = load_img_from_url(img_url)
        img = process_img(img)
        sim_score = siamese_model(x, img)
        sims.append({
            "comp": img,
            "url": img_url,
            "sim_score": sim_score,
        })
        print(f"Image {index} done.")

    # Sort images by similarity score
    sims.sort(key=lambda x: x["sim_score"])
    
    # Get top n similar images
    sim_images = sims[:n]
    sim_images = [x["url"] for x in sim_images]
    print("Done!")
    return {
        "result": sim_images
    }

def wassup():
    print("Wassup!!")