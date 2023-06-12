import tensorflow as tf
import cv2
import numpy as np
from tensorflow.keras.applications.mobilenet import preprocess_input, decode_predictions
from unsplash_api import fetch_imgs, load_img_from_url


def load_models(classifier_path, siamese_path):
    """
    Loads that classification model and siamese model.
    """
    classification_model = tf.keras.models.load_model(classifier_path)
    siamese_model = tf.keras.models.load_model(siamese_path)
    return classification_model, siamese_model


def process_img(img):
    """
    Processes the image into an appropriate format for inference (resnet50).
    """
    x = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    x = cv2.resize(x, (224, 224))
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)
    return x


def get_similar(classification_model, siamese_model, input_img, n):
    """
    Finds n similar images of an input_img
    """
    
    # process image for inference
    x = process_img(input_img)

    # get classification label
    preds = classification_model.predict(x)

    # decode the predictions
    decoded_preds = decode_predictions(preds, top=5)[0]

    # get the best prediction
    best_match = decoded_preds[0][1].replace("_", " ")
    print(f"Label: {best_match}")

    # retrieve comparison images
    img_urls = fetch_imgs(best_match, n_pages=5)
    print(f"{len(img_urls)} images retrieved.")

    # compare images using siamese model
    sims = []
    for index, img_url in enumerate(img_urls):
        img = load_img_from_url(img_url)
        img = process_img(img)
        sim_score = siamese_model([x, img]).numpy()[0][0]
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