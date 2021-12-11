import AnnotationItem from './AnnotationItem';

export default class ImgItem {
  url: string;
  annotation: AnnotationItem[];
  height: number;
  width: number;

  constructor(url: string, annotation: AnnotationItem[], height: number, width: number) {
    this.url = url;
    this.annotation = annotation;
    this.height = height;
    this.width = width;
  }
}
