// initDraw(document.getElementById("canvas"));
import AnnotationItem from '../../../dataStructure/AnnotationItem';

export function initDraw(id, candidate) {
  const canvas = document.getElementById(id);
  // const ctx = c.getContext('2d');
  let dataReturn = {};

  function calculateCoordinate() {
    let x1 = mouse.startX;
    let y1 = mouse.startY;
    let x2 = mouse.x;
    let y2 = mouse.y;
    // calculate relative coordinate with respect to the image
    x1 -= 0;
    x2 -= 0;
    y1 -= 0;
    y2 -= 0;
    dataReturn = {
      startX: Math.min(x1, x2),
      startY: Math.min(y1, y2),
      endX: Math.max(x1, x2),
      endY: Math.max(y1, y2)
    };
  }

  function setMousePosition(e) {
    const ev = e || window.event; // Moz || IE
    mouse.x = ev.pageX - 15;
    mouse.y = ev.pageY - 160;
  }

  let mouse = {
    x: 0,
    y: 0,
    startX: 0,
    startY: 0
  };
  let element = null;

  canvas.onmousemove = function (e) {
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

  canvas.onclick = function () {
    if (element !== null) {
      element = null;
      canvas.style.cursor = 'default';
      console.log('finsihed.');
      calculateCoordinate();
      candidate.push(
        new AnnotationItem(
          '',
          [
            dataReturn.startX,
            dataReturn.startY,
            dataReturn.endX,
            dataReturn.endY
          ],
          1
        )
      );

      console.log(candidate);
    } else {
      console.log('begun.');
      mouse.startX = mouse.x;
      mouse.startY = mouse.y;
      element = document.createElement('div');
      element.className = 'rectangle';
      // this.masker.appendChild(element);
      element.style.border = '1px solid #ff0000';
      element.style.width = 0;
      element.style.height = 0;
      element.style.overflow = 'hidden';
      element.style.position = 'absolute';
      element.style.opacity = 0.5;

      element.style['z-index'] = 2;
      element.style.left = `${mouse.x}px`;
      element.style.top = `${mouse.y}px`;
      canvas.appendChild(element);
      canvas.style.cursor = 'crosshair';
    }
  };
  return dataReturn;
}
