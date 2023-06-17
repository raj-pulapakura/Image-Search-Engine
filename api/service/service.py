import bentoml
from bentoml.io import Image, JSON
from model_utils import classify_image

CLASSIFICATION_MODEL_TAG = "classification_model:latest"
SIAMESE_MODEL_TAG = "siamese_model:latest"

classification_runner = bentoml.pytorch.get(CLASSIFICATION_MODEL_TAG).to_runner()
siamese_runner = bentoml.pytorch.get(SIAMESE_MODEL_TAG).to_runner()

image_search_engine_service = bentoml.Service(
    "image_search_engine_service", 
    runners=[classification_runner, siamese_runner]
)

@image_search_engine_service.api(input=Image(), output=JSON())
def classify(f: Image) -> JSON:
  return classify_image(classification_runner, siamese_runner, f)