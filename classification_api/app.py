from flask import Flask, request
from PIL import Image
from utils import load_models, get_prediction
from io import BytesIO
import requests


app = Flask(__name__)


classification_model = load_models(
    "models/classification_model.pt",
)


@app.route("/", methods=["POST", "GET"])
def hello():
    if request.method == "GET":
        return {
            "result": "it works!",
        }
    if request.method == "POST":
        input_img = Image.open(BytesIO(request.files["image"].stream.read()))
        result = get_prediction(classification_model, input_img, 20)
        return {
            "result": result
        }

    return {
        "result": "Invalid method type. Only GET and POST are allowed."
    }

