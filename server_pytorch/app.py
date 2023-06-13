from flask import Flask, request
import os
from PIL import Image
from model_helpers import load_models, get_similar
from io import BytesIO

# create app
app = Flask(__name__)


# load models
classification_model, siamese_model = load_models(
    "models/classification_model.pt",
    "models/siamese_model.pt"
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
        # read it in
        print("READING IMAGE")
        input_img = Image.open(BytesIO(request.files["image"].stream.read()))
        # get top 20 similar images
        print("GET SIMILAR IMAGE")
        result = get_similar(classification_model, siamese_model, input_img, 20)
        # return result
        print("RETURN")
        return result

    return {
        "result": "Invalid method type. Only GET and POST are allowed."
    }

