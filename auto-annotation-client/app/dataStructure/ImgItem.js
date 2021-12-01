import AnnotationItem from './AnnotationItem';

export default class ImgItem {
  url: string;
  annotation: AnnotationItem[];

  constructor(url: string, annotation: AnnotationItem[]) {
    this.url = url;
    this.annotation = annotation;
  }
}
