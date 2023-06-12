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
@app.route("/", methods=["POST", "GET"])
def hello():
    if request.method == "GET":
        print("GET REQUEST SUCESSFUL.")
        return {
            "result": "it works!"
        }
    if request.method == "POST":
        return {
            "result": "post works!"
        }
        # # save the image
        # print("SAVING IMAGE")
        # request.files["image"].save("input_img.jpg")
        # # read it in
        # print("READING IMAGE")
        # input_img = cv2.imread("input_img.jpg")
        # # get top 20 similar images
        # print("GET SIMILAR IMAGE")
        # result = get_similar(classification_model, siamese_model, input_img, 20)
        # # delete input image
        # print("REMOVE INPUT IMAGE")
        # os.remove("input_img.jpg")
        # # return result
        # print("RETURN")
        # return result

    return {
        "result": "Invalid method type. Only GET and POST are allowed."
    }

