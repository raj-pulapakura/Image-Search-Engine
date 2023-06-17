import bentoml
from model_utils import create_models


def save_model(model, tag):
    """
    Saves model to bento local store
    """
    model.eval()
    bento_model = bentoml.pytorch.save_model(tag, model)
    print(f"Bento model tag: {bento_model.tag}")


if __name__ == "__main__":

    classification_model, siamese_model = create_models()
    save_model(classification_model, "classification_model")
    save_model(siamese_model, "siamese_model")