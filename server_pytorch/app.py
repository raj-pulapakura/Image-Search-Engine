from flask import Flask, request
import os
from PIL import Image
from model_helpers import load_models, get_similar, wassup
from io import BytesIO
import requests

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
        resp = requests.get("https://en.wikipedia.org/wiki/Text_file#:~:text=A%20text%20file%20(sometimes%20spelled,of%20lines%20of%20electronic%20text.")

        text = str(resp.content[0:10])
        return {
            "result": "it works!",
            "text": text
        }
    if request.method == "POST":
        # read it in
        print("READING IMAGE")
        input_img = Image.open(BytesIO(request.files["image"].stream.read()))
        # # get top 20 similar images
        print("GET SIMILAR IMAGE")
        result = get_similar(classification_model, siamese_model, input_img, 20)
        # # return result
        # print("RETURN")
        # return result
        wassup()
        return {
            "result": "POST works!"
        }

    return {
        "result": "Invalid method type. Only GET and POST are allowed."
    }

