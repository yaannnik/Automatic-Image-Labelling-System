conda activate pytorch
cd auto-annotation-server/detectron2/tools
python train_net.py --config-file ../configs/COCO-Detection/faster_rcnn_R_34_FPN_3x.yaml