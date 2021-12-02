// debug console output
import log from 'electron-log';
// react and semantic ui framework
import React, { useState } from 'react';
import {
  Item,
  Button,
  Label,
  Image,
  Grid
} from 'semantic-ui-react';
// TODO: internal component
import ImageOperation from '../imageOperations/ImageOperation';
// import uploadButton from './uploadButton';

// data structure
import ImgItem from '../../dataStructure/ImgItem';

// constants
import * as imgSrc from '../../constants/img.json';

// TODO: replace mockData for image item
import mockImageData from '../../data/mockImageData';

// internal component
import ImageUpload from './ImageUpload';
// back end api service
import ImgService from '../../utils/getService';
import AnnotationItem from '../../dataStructure/AnnotationItem';
import AnnotationDisplay from './AnnotationDisplay';

export default function AppIcon(props: { imgData: [] }) {
  // connection between front end and back end
  const { imgData } = props;
  const [imgUrl, setImgUrl] = useState('');
  const [imgAnnotation, setAnnotation] = useState([]);
  const [imgUpdated, setImgUpdated] = useState(new ImgItem(imgUrl, []));

  const onUploadClick = () => {
    log.info('submit pic');
    log.info(imgUrl);
    // setImgUpdated(new ImgItem(imgUrl, []));
    // TODO: replace mock data with HTTP post
    // setAnnotation(mockImageData());
    log.info(mockImageData());
    setImgUpdated(new ImgItem(imgUrl, mockImageData()));
    const service = new ImgService();
    const rsp = service.getImage({ url: imgUrl });
    log.info(rsp);
    rsp
      .then(response => {
        imgUpdated.url = response.data.url;
        const annotationNew = response.data.annotation[0];
        imgUpdated.annotation = [
          new AnnotationItem(
            annotationNew.category,
            annotationNew.bbox,
            annotationNew.confidence
          )
        ];
        log.info(imgUpdated.annotation);
        setAnnotation(imgUpdated.annotation);
        setImgUpdated(imgUpdated);
      })
      .catch(error => {
        log.info(error);
      });
  };
  const onInputChange = e => {
    setImgUrl(e.target.value);
  };
  const onSubmitChange = () => {
    log.info('change img', imgUpdated);
    log.info('whole data changed: ', imgData);
    imgUpdated.annotation = imgAnnotation;
    imgData.push(imgUpdated);
    const data = JSON.stringify(imgUpdated);
    // TODO: upload with HTTP POST here

    const service = new ImgService();
    log.info(imgUrl);
    const rsp = service.postAnnotation({ data });
    rsp
      .then(response => {
        log.info(response);
      })
      .catch(error => {
        log.info(error);
      });
  };
  return (
    <div>
      {/* <h1> Image Upload </h1> */}
      <Label as='a' size='huge' color='green' tag>
        Image Upload
      </Label>
      <p> </p>
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <Grid.Row>
              <Image
                src={imgUpdated.url === '' ? imgSrc.hold : imgUpdated.url}
                centered
              />
            </Grid.Row>
              <Grid.Column>
              {imgAnnotation.map((annotation) => (
                <AnnotationDisplay
                  annotation={annotation}
                />
              ))}
              </Grid.Column>
            <Grid.Row>
              <ImageUpload onUploadClick={onUploadClick} setImgUrl={setImgUrl} />
            </Grid.Row>
          </Grid.Column>
          <Grid.Column>
            <ImageOperation
              Annotations={imgAnnotation}
              canEdit={imgUpdated.url !== ''}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Button positive onClick={onSubmitChange}>
            Submit Annotation Changes
          </Button>
        </Grid.Row>
      </Grid>
    </div>
  );
}
