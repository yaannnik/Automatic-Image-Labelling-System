import ImgItem from './ImgItem';

export default class AppData {
  imgItems: ImgItem[]

  constructor(imgItems: ImgItem[]) {
    this.imgItems = imgItems;
  }
}
