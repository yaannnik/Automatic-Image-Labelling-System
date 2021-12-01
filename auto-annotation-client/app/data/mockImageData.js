import * as imgData from './mockImageData.json';
import AnnotationItem from '../dataStructure/AnnotationItem';

type mockType = {
  category: string,
  bbox: [],
  confidence: number
};
export default function mockImageData() {
  const mockItem = imgData.annotation.map((imgItem: mockType) => new AnnotationItem(
      imgItem.category,
      imgItem.bbox,
      imgItem.confidence
    ));
  return mockItem;
}
