/* eslint-disable import/prefer-default-export */
export function DrawRectangle(id, left, top, width, height) {
  const canvas = document.getElementById(id);
  const element = document.createElement('div');
  element.className = 'rectangle';
  element.style.border = '1px solid #ff0000';
  element.style.width = 0;
  element.style.height = 0;
  element.style.overflow = 'hidden';
  element.style.position = 'absolute';
  element.style.opacity = 0.5;

  element.style['z-index'] = 2;
  element.style.left = `${left}px`;
  element.style.top = `${top}px`;
  element.style.width = `${width}px`;
  element.style.height = `${height}px`;
  canvas.appendChild(element);
}
