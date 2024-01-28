from PIL import Image, ImageEnhance
import os
from roboflow import Roboflow
import dotenv

def brighten_region(image, boxes, factor):
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

if __name__ == "__main__":
    RBF_API = dotenv.get_key(".env", key_to_get="ROBOFLOW_API_KEY")
    API_VERSION = dotenv.get_key(".env", key_to_get="API_VERSION")
    if not API_VERSION:
        raise ValueError("API Version must be a number")
    API_VERSION = int(API_VERSION)
    WORKSPACE = dotenv.get_key(".env", key_to_get="WORKSPACE")
    PROJECT = dotenv.get_key(".env", key_to_get="PROJECT")

    # Load model
    rf = Roboflow(api_key=RBF_API)
    project = rf.workspace(WORKSPACE).project(PROJECT)
    model = project.version(API_VERSION).model

    # infer on a local image
    dir = r".\server\images"
    for filename in os.listdir(dir):
        file = os.path.join(dir, filename)
        if file.endswith(".jpeg") or file.endswith(".jpg"):
            if model:
                image = Image.open(file)
                predictions = model.predict(file, confidence=10)
                if not predictions:
                    print(f"Failed to get predictions for {file}")
                    continue
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

                brightening_factor = 0.15
                # Make everything besides the hold darker
                highlighted_image = brighten_region(highlighted_image, brighten_boxes, brightening_factor)

                if highlighted_image:
                    highlighted_image.show()
                    input("Press enter to continue...")
                    os.system('cls')