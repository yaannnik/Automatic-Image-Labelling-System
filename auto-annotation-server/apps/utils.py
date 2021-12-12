import glob
import multiprocessing as mp
import numpy as np
import os
import sys
import tempfile
import time
import warnings
import cv2
import tqdm

from detectron2.config import get_cfg
from detectron2.data.detection_utils import read_image
from detectron2.utils.logger import setup_logger
from detectron2.data.datasets.builtin_meta import COCO_CATEGORIES

sys.path.append("..")
from apps.predictor import VisualizationHelper

class PredictionCase:
    def __init__(self, img_path, pred_class, score, pred_box, height, width):
        self.url = img_path
        self.category = pred_class
        self.confidence = score
        self.bbox = pred_box
        self.height = height
        self.width = width

    def get_url(self):
        return self.url

    def get_category(self):
        return self.category

    def get_confidence(self):
        return self.confidence

    def get_bbox(self):
        return self.bbox

    def get_height(self):
        return self.height

    def get_width(self):
        return self.width

    def __str__(self):
        return "<Object: " + COCO_CATEGORIES[self.category]["name"] + ";\n"\
                          + "score: " + str(self.confidence) + ";\n"\
                          + "bbox: " + str(self.bbox) + ">\n"

    def __repr__(self):
        return "<Object: " + COCO_CATEGORIES[self.category]["name"] + ";\n" \
                          + "score: " + str(self.confidence) + ";\n" \
                          + "bbox: " + str(self.bbox) + ">\n"


def loadModel(cfg, model):
    cfg.MODEL.WEIGHTS = model
    cfg.freeze()

def predImages(imgs, vis):
    preds = []

    for img in imgs:
        data = read_image(img, "BGR")
        start_time = time.time()

        height = int(data.shape[0])
        width = int(data.shape[1])
        scalar = max(width, height)
        height = int(height / scalar * 256)
        width = int(width / scalar * 256)
        dim = (width, height)
        data = cv2.resize(data, dim, interpolation = cv2.INTER_AREA)

        predictions, visualized_output = vis.run_on_image(data)

        img_label = img.split("/")[-1]
        img_label = img_label.split(".")[0]
        img_label = sys.path[0] + "/../cache/" + img_label + '-1.jpeg'
        print(img_label)
        # cv2.namedWindow("WINDOW_NAME", cv2.WINDOW_NORMAL)
        # cv2.imshow("WINDOW_NAME", visualized_output.get_image()[:, :, ::-1])
        # if cv2.waitKey(0) == 27:
        #     break  # esc to quit
        cv2.imwrite(img_label, visualized_output.get_image()[:, :, ::-1])

        # img: url of the image
        preds.append(([img_label, height, width], predictions))

        logger = setup_logger()
        logger.info(
            "{}: {} in {:.2f}s".format(
                img,
                "detected {} instances".format(len(predictions["instances"]))
                if "instances" in predictions
                else "finished",
                time.time() - start_time,
            )
        )

    return preds


def getPredResult(preds):
    if(len(preds) == 0):
        return None

    res = []

    for pred in preds:
        img_path = pred[0][0]
        height = pred[0][1]
        width = pred[0][1]

        if "instances" not in pred[1]:
            predCase = PredictionCase(img_path, -1, -1.0, [-1.0, -1.0, -1.0, -1.0])
            tmp = [predCase]
            res.append(tmp)
            continue

        instances = pred[1]["instances"]

        num_targets = len(instances)
        img_size = instances._image_size
        height, width = img_size[0], img_size[1]

        pred_boxes   = instances.get("pred_boxes")
        scores       = instances.get("scores")
        pred_classes = instances.get("pred_classes")

        tmp = []

        for i in range(num_targets):
            pred_class = pred_classes[i].item()
            score = scores[i].item()

            x1 = pred_boxes.tensor[i, 0].clamp(min=0, max=width).item()
            y1 = pred_boxes.tensor[i, 1].clamp(min=0, max=height).item()
            x2 = pred_boxes.tensor[i, 2].clamp(min=0, max=width).item()
            y2 = pred_boxes.tensor[i, 3].clamp(min=0, max=height).item()
            pred_box = [x1, y1, x2, y2]

            print("Object " + COCO_CATEGORIES[pred_class]["name"] \
                            + " with score of " + str(score) \
                            + " in " + str(pred_box))

            predCase = PredictionCase(img_path, pred_class, score, pred_box, height, width)
            tmp.append(predCase)

        res.append(tmp)

    return res


def run(imgs, model, config_file):
    cfg = get_cfg()
    cfg.merge_from_file(config_file)

    loadModel(cfg, model)

    vis = VisualizationHelper(cfg)

    preds = predImages(imgs, vis)

    res = getPredResult(preds)

    print(res)

    return res


# if __name__ == "__main__":
#     imgs = ["../cache/WechatIMG512.jpeg"]
#     model = sys.path[0] + "/../models/model_final34.pth"
#     config_file = sys.path[0] + "/../configs/COCO-Detection/faster_rcnn_R_34_FPN_3x.yaml"

#     res = run(imgs, model, config_file)