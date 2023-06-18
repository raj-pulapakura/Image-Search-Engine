import bentoml
from bentoml.io import Image, JSON
from model_utils import compute_similar_imgs

CLASSIFICATION_MODEL_TAG = "classification_model:latest"
SIAMESE_MODEL_TAG = "siamese_model:latest"

classification_runner = bentoml.pytorch.get(CLASSIFICATION_MODEL_TAG).to_runner()
siamese_runner = bentoml.pytorch.get(SIAMESE_MODEL_TAG).to_runner()

image_search_engine_service = bentoml.Service(
    "image_search_engine_service", 
    runners=[classification_runner, siamese_runner]
)

@image_search_engine_service.api(input=Image(), output=JSON())
def predict(f: Image) -> JSON:
  return compute_similar_imgs(classification_runner, siamese_runner, f)