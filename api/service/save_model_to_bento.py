import bentoml
import torch

def load_and_save_model(model_path):
    model = torch.load(model_path)
    bento_model = bentoml.pytorch.save_model("classification_model", model)
    print(f"Bento model tag: {bento_model.tag}")

if __name__ == "__main__":
    load_and_save_model(r"C:\Users\User\OneDrive\Desktop\literally everything\code\projects\Image Search Engine\classification_api\models\classification_model.pt")