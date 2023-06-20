import torch
from torchvision import  models
import torch.nn.functional as F
import torch.nn as nn
from image_utils import fetch_imgs, load_img_from_url
from PIL import Image


weights = models.MobileNet_V3_Small_Weights.DEFAULT
preprocess = weights.transforms()


def create_models():
    """
    Creates the classification and siamese models
    """

    ## create classification model
    weights = models.MobileNet_V3_Small_Weights.DEFAULT
    classification_model = models.mobilenet_v3_small(weights=weights)

    ## create siamese model
    base_net = models.mobilenet_v3_small(weights=weights)

    # remove the fully connected layer (classification head)
    base_net = nn.Sequential(*list(base_net.children())[:-1])

    # create siamese class
    class SiameseNetwork(nn.Module):
        def __init__(self):
            super(SiameseNetwork, self).__init__()

            self.net = base_net

        def forward_once(self, x):
            return self.net(x)

        def forward(self, input1, input2):
            # calculate embeddings
            output1 = self.forward_once(input1)
            output2 = self.forward_once(input2)

            # calculate euclidean distance
            dist = torch.sum(F.pairwise_distance(output1, output2))
            return dist.item()

    siamese_model = SiameseNetwork()

    ## return both models
    return classification_model, siamese_model


def compute_similar_imgs(classification_runner, siamese_runner, image):
    """
    1. Classiies the image using the classification_runner.
    2. Fetches 50 images of this class from the Unsplash API.
    3. The 20 most similar images to the input image are found using the siamese_runner.
    4. These 20 images are returned along with the classification are returned.
    """

    # preprocess image
    image = image.convert("RGB")
    x = preprocess(image).unsqueeze(0)

    # make prediction
    prediction = classification_runner.run(x)
    class_id = prediction.argmax().item()
    category_name = weights.meta["categories"][class_id]
    
    # retrieve comparison images
    img_urls = fetch_imgs(category_name, n_pages=5)

    # calculate similarity scores
    sims = []

    for img_url in img_urls:
        img = load_img_from_url(img_url)
        img = preprocess(img).unsqueeze(0)
        sim_score = siamese_runner.run(x, img)
        sims.append({
            "url": img_url,
            "sim_score": sim_score,
        })

    # sort images by similarity score
    sims.sort(key=lambda x: x["sim_score"])

    # get top 20 similar images
    sim_images = sims[:20]
    sim_images = [x["url"] for x in sim_images]

    # return classification and similar images
    return {
        "classification": category_name,
        "sim_images": sim_images,
    }