// initDraw(document.getElementById("canvas"));
import AnnotationItem from "../../dataStructure/AnnotationItem";

export function initDraw(id, imgAnnotation) {
  const canvas = document.getElementById(id);
  let dataReturn = {};

  function calculateCoordinate() {
    let x1 = mouse.startX;
    let y1 = mouse.startY;
    let x2 = mouse.x;
    let y2 = mouse.y;
    // down to up, then recalculate
    if (mouse.y > mouse.startY) {
      y1 = mouse.y;
      y2 = mouse.startY;
    }
    // calculate relative coordinate with respect to the image
    x1 -= 14;
    x2 -= 14;
    y1 -= 150;
    y2 -= 150;
    dataReturn = {
      startX: x1,
      startY: y1,
      endX: x2,
      endY: y2
    };
  }

  function setMousePosition(e) {
    const ev = e || window.event; // Moz || IE
    if (ev.pageX) {
      // Moz
      mouse.x = ev.pageX + window.pageXOffset;
      mouse.y = ev.pageY + window.pageYOffset;
    } else if (ev.clientX) {
      // IE
      mouse.x = ev.clientX + document.body.scrollLeft;
      mouse.y = ev.clientY + document.body.scrollTop;
    }
  }

  var mouse = {
    x: 0,
    y: 0,
    startX: 0,
    startY: 0
  };
  let element = null;

  canvas.onmousemove = function(e) {
    setMousePosition(e);
    if (element !== null) {
      element.style.width = `${Math.abs(mouse.x - mouse.startX)}px`;
      element.style.height = `${Math.abs(mouse.y - mouse.startY)}px`;
      element.style.left =
        mouse.x - mouse.startX < 0 ? `${mouse.x}px` : `${mouse.startX}px`;
      element.style.top =
        mouse.y - mouse.startY < 0 ? `${mouse.y}px` : `${mouse.startY}px`;
    }
  };

  canvas.onclick = function(e) {
    if (element !== null) {
      element = null;
      canvas.style.cursor = "default";
      console.log("finsihed.");
      calculateCoordinate();
      imgAnnotation.push(
        new AnnotationItem(
          "mask",
          [
            dataReturn.startX,
            dataReturn.startY,
            dataReturn.endX,
            dataReturn.endY
          ],
          1
        )
      );
      console.log(imgAnnotation);
      return dataReturn;
    } else {
      console.log("begun.");
      mouse.startX = mouse.x;
      mouse.startY = mouse.y;
      element = document.createElement("div");
      element.className = "rectangle";
      // this.masker.appendChild(element);
      element.style.border = "1px solid #ff0000";
      element.style.width = 0;
      element.style.height = 0;
      element.style.overflow = "hidden";
      element.style.position = "absolute";
      element.style.opacity = 0.5;

      element.style["z-index"] = 2;
      element.style.left = `${mouse.x}px`;
      element.style.top = `${mouse.y}px`;
      canvas.appendChild(element);
      canvas.style.cursor = "crosshair";
    }
  };
  return dataReturn;
}
