from flask import Flask, request
import cv2
import os
from model_helpers import load_models, get_similar

# create app
app = Flask(__name__)


# load models
classification_model, siamese_model = load_models(
    "models/classification_model",
    "models/siamese_model"
)


# route to get similar images
@app.route("/", methods=["POST"])
def hello():
    if request.method == "POST":
        # save the image
        request.files["image"].save("input_img.jpg")
        # read it in
        input_img = cv2.imread("input_img.jpg")
        # get top 20 similar images
        result = get_similar(classification_model, siamese_model, input_img, 20)
        # delete input image
        os.remove("input_img.jpg")
        # return result
        return result

    return {
        "result": "Invalid method type. Only POST is allowed."
    }

