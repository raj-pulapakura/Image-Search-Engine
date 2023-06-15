from PIL import Image
from io import BytesIO
import requests

def load_img_from_url(url):
  response = requests.get(url)
  image = Image.open(BytesIO(response.content))
  return image

# # compare images using siamese model
    # sims = []

    # for index, img_url in enumerate(img_urls):
    #     img = load_img_from_url(img_url)
    #     img = process_img(img)
    #     sim_score = siamese_model(x, img)
    #     sims.append({
    #         "comp": img,
    #         "url": img_url,
    #         "sim_score": sim_score,
    #     })
    #     print(f"Image {index} done.")

    # # Sort images by similarity score
    # sims.sort(key=lambda x: x["sim_score"])
    
    # # Get top n similar images
    # sim_images = sims[:n]
    # sim_images = [x["url"] for x in sim_images]
    # print("Done!")
    # return {
    #     "result": sim_images
    # }