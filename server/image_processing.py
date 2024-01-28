from PIL import Image, ImageEnhance
import os
from roboflow import Roboflow
import dotenv
import random
import string

def get_random_string(length):
    # choose from all lowercase letter
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for _ in range(length))
    

RBF_API = dotenv.get_key(".env", key_to_get="ROBOFLOW_API_KEY")
API_VERSION = dotenv.get_key(".env", key_to_get="API_VERSION")
if not API_VERSION:
    raise ValueError("API Version must be a number")
API_VERSION = int(API_VERSION)
WORKSPACE = dotenv.get_key(".env", key_to_get="WORKSPACE")
PROJECT = dotenv.get_key(".env", key_to_get="PROJECT")

def __brighten_region(image, boxes, factor):
    # Create a region of interest (ROI) mask
    roi = Image.new('L', image.size, 255)
    for box in boxes:
        roi.paste(0, box)

    # Apply the enhancement factor to darken the ROI
    enhancer = ImageEnhance.Brightness(image)
    darkened_image = enhancer.enhance(factor)

    # Composite the darkened ROI with the original image
    result_image = Image.composite(darkened_image, image, roi)

    return result_image

def process_image(image_data):
    # Save image data
    filename = os.path.join(".", "server", "images", f"{get_random_string(6)}.jpg")

    with open(filename, 'wb') as tmp:
        tmp.write(image_data)
    return_images, colors = _process_image(filename)
    os.remove(filename)
    
    # Map pillow images to bytes objects
    def map_img(img):
        img.save(filename)
        with open(filename, "rb") as file:
            return file.read()
    return_images = map(map_img, return_images)
    
    
    return return_images, colors
    

def _process_image(file):
    # Load model
    rf = Roboflow(api_key=RBF_API)
    project = rf.workspace(WORKSPACE).project(PROJECT)
    model = project.version(API_VERSION).model

    if model:
        image = Image.open(file)
        predictions = model.predict(file, confidence=40)
        if not predictions:
            print(f"Failed to get predictions for {file}")
            return

        brighten_boxes = []
        grouped_predictions = {}
        for pred in predictions:
            # print(pred)
            pred = pred.json_prediction
            color = pred['class']

            try:
                grouped_predictions[color].append(pred)
            except KeyError:
                grouped_predictions[color] = [pred]

        highlighted_images = []
        colors = []
        for color, preds in grouped_predictions.items():
            highlighted_image = image.copy()
            colors.append(color)
            
            for pred in preds:
                x = int(pred['x'])
                y = int(pred['y'])
                width = int(pred['width'])
                height = int(pred['height'])
                left = x - width // 2
                top = y - height // 2

                box_to_brighten = (left, top, left+width, top+height)
                brighten_boxes.append(box_to_brighten)

            brightening_factor = 0.5
            # Make everything besides the hold darker
            highlighted_image = __brighten_region(highlighted_image, brighten_boxes, brightening_factor)
            highlighted_image.save(color + ".jpg")
            highlighted_images.append(highlighted_image)
            

        return highlighted_images, colors

if __name__ == "__main__":
    # infer on a local image
    dir = r".\server\images"
    for filename in os.listdir(dir):
        file = os.path.join(dir, filename)
        if file.endswith(".jpeg") or file.endswith(".jpg"):
            img = _process_image(file)
            if img:
                with open("./server/images/tmp.jpg", "wb") as file:
                    img.save("./server/images/tmp.jpg")