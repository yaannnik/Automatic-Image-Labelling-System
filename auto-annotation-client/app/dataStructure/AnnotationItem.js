
export default class AnnotationItem {
  category: string;
  bbox: [];
  confidence: number;

  constructor(category: string, bbox: [], confidence: number) {
    this.category = category;
    this.bbox = bbox;
    this.confidence = confidence;
  }
}
