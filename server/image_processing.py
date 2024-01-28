from PIL import Image, ImageEnhance
import os
from roboflow import Roboflow
import dotenv
import random
import string

def get_random_string(length):
    # choose from all lowercase letter
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(length))
    

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
    with open("./server/images/640img.jpg", 'rb') as file:
        image_data = file.read()
    with open(filename, 'wb') as tmp:
        tmp.write(image_data)
    return_images = _process_image(filename)
    print(return_images)
    os.remove(filename)
    return return_images
    

def _process_image(file):
    # Load model
    rf = Roboflow(api_key=RBF_API)
    project = rf.workspace(WORKSPACE).project(PROJECT)
    model = project.version(API_VERSION).model

    if model:
        image = Image.open(file)
        predictions = model.predict(file, confidence=5)
        if not predictions:
            print(f"Failed to get predictions for {file}")
            return
        highlighted_image = image

        brighten_boxes = []
        for pred in predictions:
            pred = pred.json_prediction
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

        return highlighted_image

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