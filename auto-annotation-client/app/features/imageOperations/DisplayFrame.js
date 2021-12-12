// initDraw(document.getElementById("canvas"));

export function initDraw(id, x1, y1, x2, y2) {
  const canvas = document.getElementById(id);
  let startX = x1;
  let startY = y1;
  let x = x2;
  let y = y2;
  element = document.createElement('div');
  element.className = 'rectangle';
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.rect(20, 20, 150, 100);
  // this.masker.appendChild(element);
  element.style.border = '1px solid #ff0000';
  element.style.width = 0;
  element.style.height = 0;
  element.style.overflow = 'hidden';
  element.style.position = 'absolute';
  element.style.opacity = 0.5;

  element.style['z-index'] = 2;
  element.style.left = `${x}px`;
  element.style.top = `${y}px`;
  canvas.appendChild(element);
  function calculateCoordinate() {
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

  var mouse = {
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

  canvas.onclick = function (e) {
    if (element !== null) {
      element = null;
      canvas.style.cursor = 'default';
      console.log('finsihed.');
      calculateCoordinate();
      console.log(dataReturn);
      return dataReturn;
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
