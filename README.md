# 🔍 Image Search Engine
![Screenshot 2023-06-24 182046](https://github.com/raj-pulapakura/Image-Search-Engine/assets/87762282/21702ad9-6cfe-4a5d-8385-cc65fad8eded)
- ⌛ **Project Duration**: June 12 to June 24
- ⚙️ **Main tech**: PyTorch, BentoML, NextJS, Vercel
- 🦄 **Purpose**: Drag and drop (or upload) an image and find similar images
- 💻 **Check it out**: https://image-search-pro.vercel.app/
- 📷 **Video demonstration**: https://www.youtube.com/watch?v=loBZkPvn29c

# 🤖 Backend
- 🎰 **ML Framework**: PyTorch
- 🏈 **Backend Framework**: BentoML
- 🌧️ **Deployment method**: BentoCTL, AWS and Terraform
- 🔗 **API Link**: https://shzs1c1u45.execute-api.ap-southeast-2.amazonaws.com/predict

![Model Overview](https://github.com/raj-pulapakura/Image-Search-Engine/assets/87762282/a9d04a84-95cd-4aec-9123-725eeb1b66ea)

## Test the API with Postman

1. Open up Postman and paste the aforementioned API Link
2. Make sure it the request METHOD is set to "POST"
3. Go to "Body" and select "form-data"
4. Add a new file key named "image" and upload a file from your PC
5. Hit "Send"

![Screenshot 2023-06-24 183540](https://github.com/raj-pulapakura/Image-Search-Engine/assets/87762282/f91b628a-8e9a-40d3-8adc-55207cb4bd9b)

## 🎰 Backend: ML

I began my project with TensorFlow, but due to model size issues, I transitioned to PyTorch. MobileNetV3 architecture was utilized to reduce the model size and improve inference speed. I employed a MobileNetV3 model for classification and a Siamese MobileNetV3 network for similarity scoring. This combination of frameworks and architectures enabled me to achieve smaller models without compromising performance

- 🐶 **Classifier**:
  - Architecture: MobileNetV3
  - Purpose: Classify the input images. The output label (e.g. Labrador Retriever) is used to fetch 50 images from Unsplash.
 
- 🏆 **Siamese network**:
  - Architecture: 2 MobileNetV3 models
  - Purpose: Calculate similarity scores for each of the 50 images and the input image. The 20 most similar images, i.e. the images with the best similarity scores, are returned.

## 🏈 Backend: server code

After experimenting with different backend frameworks such as FastAPI and Flask, I came across [BentoML](https://github.com/bentoml), which is a tool that makes ML API creation and deployment effortless.

## 🌧️ Backend: deployment
BentoML offers a tool called [bentoctl](https://github.com/bentoml/bentoctl), which is used to deploy BentoML services to production ready API endpoints in the cloud. It does this using [AWS Lambda](https://aws.amazon.com/lambda/), [AWS API Gateway](https://aws.amazon.com/api-gateway/), and [AWS ECR](https://aws.amazon.com/ecr/), whilst using [Terraform](https://www.terraform.io/) to automate the creation of this infrastructure.

# Website
- 💪 **Frontend framework**: NextJS
- 🌧️ **Deployment**: Vercel
- 💻 **Check it out**: https://image-search-pro.vercel.app/
- 📷 **Video demonstration**: https://www.youtube.com/watch?v=loBZkPvn29c

## Usage

1. Upload (or drag and drop) an image into the website

![Screenshot 2023-06-24 192730](https://github.com/raj-pulapakura/Image-Search-Engine/assets/87762282/8b220bec-a8e8-4972-af6c-bee80211b73c)

2. Find and download similar images

![Screenshot 2023-06-24 193050](https://github.com/raj-pulapakura/Image-Search-Engine/assets/87762282/46ac6e74-4c80-4285-86fa-558bd4461124)
