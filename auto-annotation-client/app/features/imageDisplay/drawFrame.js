
import { initDraw } from "./DrawFrameOn";
export function DrawRectangle (id, data, onMouseUp, className) {
  document.oncontextmenu = function () {
    return true;
  };

  this.IMG = document.getElementById(id);

  const masker = document.createElement('div');
  masker.id = `mask_${id}`;
  const position = this.getAbsolutePosition(this.IMG);
  localStorage.masker = document.getElementById('mask_bigimg');
  masker.style.width = `${256}px`;
  masker.style.height = `${position.height}px`;
  masker.style.left = position.left;
  masker.style.top = position.top;
  masker.style.text = position.top;
  masker.style['background-image'] = `url(${this.IMG.src})`;
  masker.style['background-size'] = `contain`;
  masker.style['background-repeat'] = `no-repeat`;
  masker.style['background-position'] = `center`;
  masker.className = 'imgmasker';

  this.masker = masker;
  this.IMG.parentNode.appendChild(masker);
  this.IMG.parentNode.removeChild(this.IMG);
  data = initDraw(`mask_${id}`, data);

  this.isDraw = false;
  this.isMouseUp = true;
  this.index = 0;
  this.currentDrawRectangle = null;
  this.className = className;

  this.RectangleDivs = [];

  this.debug = true;

  this._onMouseUp = onMouseUp;

  this.bindListener();
};

DrawRectangle.prototype = {
  bindListener() {
    // this.masker.onmousemove = this.dragSize.bind(this);
    // this.masker.onmouseup = this.onMouseUp.bind(this);
    // this.masker.onmouseout = this.onMouseOut.bind(this);
    // this.masker.onmouseover = this.onMouseOver.bind(this);
    // this.masker.onmousedown = this.drawLayer.bind(this);
    // this.masker.onmouseup = this.onMouseUp.bind(this);
  },
  drawLayer() {
    // this.IMG.setCapture(true);
    this.isDraw = true;
    this.ismouseup = false;
    this.index++;

    const pos = this.getSourcePos();

    const x = event.offsetX;
    const y = event.offsetY;

    const top = y + pos.top - 2;
    const left = x + pos.left - 2;

    const d = document.createElement('div');
    // document.body.appendChild(d);
    this.masker.appendChild(d);
    d.style.border = '1px solid #ff0000';
    d.style.width = 0;
    d.style.height = 0;
    d.style.overflow = 'hidden';
    d.style.position = 'absolute';
    d.style.left = `${left}px`;
    d.style.top = `${top}px`;
    d.style.opacity = 0.5;

    d.style['z-index'] = 2;
    if (this.className) {
      d.className = this.className;
    }
    d.id = `draw${this.index}`;
    if (this.debug) {
      d.innerHTML = `<div class='innerbg'>x:${x},y:${y}..</div>`;
    }

    this.currentDrawRectangle = d;

    this.RectangleDivs[this.index] = {
      left,
      top,
      el: d
    };
  },
  getSourcePos() {
    return this.getAbsolutePosition(this.masker);
  },
  dragSize() {
    if (this.isDraw) {
      if (
        !(
          event.srcElement.tagName.toLowerCase() == 'div' &&
          event.srcElement.className == 'imgmasker'
        )
      ) { return; }

      const pos = this.getSourcePos();
      const img_x = pos.top;
      const img_y = pos.left;
      const x = event.offsetX;
      const y = event.offsetY;
      const drawW = x + img_x - this.RectangleDivs[this.index].left;
      const drawH = y + img_y - this.RectangleDivs[this.index].top;
      this.currentDrawRectangle.style.width =
        `${drawW > 0 ? drawW : -drawW}px`;
      this.currentDrawRectangle.style.height =
        `${drawH > 0 ? drawH : -drawH}px`;
      if (drawW < 0) {
        this.currentDrawRectangle.style.left = `${x + img_x}px`;
      }
      if (drawH < 0) {
        this.currentDrawRectangle.style.top = `${y + img_y}px`;
      }

      if (this.debug) {
        this.currentDrawRectangle.innerHTML =
          `<div class='innerbg'>x:${
          x
          },y:${
          y
          }. img_x:${
          img_x
          },img_y:${
          img_y
          }. drawW:${
          drawW
          },drawH:${
          drawH
          }.  Dleft[i]:${
          this.RectangleDivs[this.index].left
          },Dtop[i]:${
          this.RectangleDivs[this.index].top
          }src:${
          event.srcElement.tagName
          },this.isDraw: ${
          this.isDraw
          },this.isMouseUp: ${
          this.isMouseUp
          }.</div>`;
      }
    } else {
      return false;
    }
  },

  stopDraw() {
    this.isDraw = false;
  },

  onMouseOut() {
    if (!this.isMouseUp) {
      this.isDraw = false;
    }
  },

  onMouseUp() {
    this.isDraw = false;
    this.isMouseUp = true;
    // this.IMG.releaseCapture();

    if (this._onMouseUp) {
      this._onMouseUp.call(this, this.currentDrawRectangle);
    }
  },

  onMouseOver() {
    if (!this.isMouseUp) {
      this.isDraw = true;
    }
  },

  getAbsolutePosition(obj) {
    let t = obj.offsetTop;
    let l = obj.offsetLeft;
    const w = obj.offsetWidth;
    const h = obj.offsetHeight;

    while ((obj = obj.offsetParent)) {
      t += obj.offsetTop;
      l += obj.offsetLeft;
    }

    return {
      top: t,
      left: l,
      width: w,
      height: h
    };
  }
};
