/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
// debug console output
import log from 'electron-log';
// react and semantic ui framework
import React, { useEffect, useState } from 'react';
import {
  Button,
  Label,
  Modal,
  Grid,
  Divider,
  Dimmer,
  Header,
  Icon
} from 'semantic-ui-react';
// TODO: internal component
import ImageOperation from '../imageOperations/ImageOperation';
// import uploadButton from './uploadButton';

// data structure
import ImgItem from '../../dataStructure/ImgItem';

// css
import Styles from './ImageDisplay.css';

// helper function: js
import { initDraw } from './DrawFrameOn';
import { DrawRectangle } from './drawFrame';

// constants
import * as imgSrc from '../../constants/img.json';

// TODO: replace mockData for image item
import mockImageData from '../../data/mockImageData';

// internal component
import ImageUpload from './ImageUpload';
import ImageHistory from '../imageHistory/ImageHistory';
import AddAnnotationModal from './AddAnnotationModal';

// back end api service
import ImgService from '../../utils/getService';
import AnnotationItem from '../../dataStructure/AnnotationItem';
import AnnotationDisplay from './AnnotationDisplay';

export default function AppIcon(props: { imgData: [] }) {
  // connection between front end and back end
  const { imgData, user } = props;
  const [open, setOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [imgAnnotation, setAnnotation] = useState([]);
  const [imgUpdated, setImgUpdated] = useState(new ImgItem(imgUrl, [], 0, 0));
  const [candidate, setCandidate] = useState([new AnnotationItem('', [], -1)]);


  useEffect(() => {
    console.log(imgAnnotation);
    initDraw('bigimg', candidate);
  }, [candidate, imgUpdated, imgAnnotation]);

  // style of div putting image style="width:500px;height:100px;border:1px solid #000
  const backgroundStyle = {
    backgroundImage: `url("${imgUpdated.url === '' ? imgSrc.hold : imgUpdated.url}")`,
    height: 256,
    width: 256

  };

  const onUploadClick = () => {
    log.info('submit pic');
    log.info(imgUrl);
    const service = new ImgService();
    const rsp = service.getImage({ url: imgUrl });
    log.info(rsp);
    rsp
      .then(response => {
        imgUpdated.url = response.data.url;
        imgUpdated.height = response.data.height;
        imgUpdated.width = response.data.width;
        imgUpdated.annotation = [];
        response.data.annotation.map((annotationNew) => {
          imgUpdated.annotation.push(new AnnotationItem(
            annotationNew.category,
            annotationNew.bbox,
            annotationNew.confidence));
          DrawRectangle('bigimg', annotationNew.bbox[0], annotationNew.bbox[1],
                                  annotationNew.bbox[2] - annotationNew.bbox[0],
                                  annotationNew.bbox[3] - annotationNew.bbox[1]);
        });

        log.info(imgUpdated);
        setAnnotation(imgUpdated.annotation);
        setImgUpdated(imgUpdated);
      })
      .catch(error => {
        log.info(error);
      });
  };
  const onSubmitChange = () => {
    log.info('change img', imgUpdated);
    log.info('whole data changed: ', imgData);
    imgUpdated.annotation = imgAnnotation;
    imgData.push(imgUpdated);
    const data = JSON.stringify(imgUpdated);
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

  // handle on confirm add bbox change
  const onAddFrame = () => {
    if (candidate[1] === undefined || candidate[1].category === '') {
      setOpen(false);
      return;
    }
    setCandidate([new AnnotationItem('', [], -1)]);
    imgAnnotation.push(candidate[1]);
    setOpen(false);
  };
  const onCancelAddFrame = () => {
    setCandidate([new AnnotationItem('', [], -1)]);
    setOpen(false);
  };
  return (
    <div>
      <Dimmer active={user === ''} >
        <Header as="h2" icon inverted>
          <Icon name="heart" />
          Please switch to the Login tab to login
          <Header.Subheader>User does not login</Header.Subheader>
        </Header>
      </Dimmer>
      <Label as="a" color="green" floating ribbon="right" image>
        <img src="https://react.semantic-ui.com/images/avatar/small/christian.jpg" />
        User: {user === '' ? 'not login' : user}
        <Label.Detail>Log out</Label.Detail>
      </Label>
      <br />
      {/* <h1> Image Upload </h1> */}
      <Grid columns={2} divided>
        <Grid.Column computer={12} largeScreen={12} widescreen={12}>
          <div className=".app-info-panel" data-tid="appinfo">
            <Grid columns={2} divided>
              <Grid.Row>
                <Grid.Column>
                  <Label as="a" size="huge" color="green" tag>
                    Image Upload
                  </Label>
                  <p> </p>
                  <Grid.Row>
                    {/* ?can be deleted later */}
                    {/* <Image
                      id="bigimg"
                      src={imgUpdated.url === '' ? imgSrc.hold : imgUpdated.url}
                      centered
                    /> */}
                    <div
                      id="bigimg"
                      style={backgroundStyle}
                      className={Styles.backgroundImage}
                    />
                    <br />
                    <Modal
                      onClose={() => setOpen(false)}
                      onOpen={() => setOpen(true)}
                      open={open}
                      trigger={<Button color="green" >Add Annotation</Button>}
                    >
                      <AddAnnotationModal candidate={candidate[1] === undefined ? candidate[0] : candidate[1]} />
                      <Modal.Actions>
                        <Button color="black" onClick={() => onCancelAddFrame()}>
                          Cancel
                        </Button>
                        <Button
                          content="Yes"
                          labelPosition="right"
                          icon="checkmark"
                          onClick={() => onAddFrame()}
                          disabled={candidate[1] === undefined}
                          positive
                        />
                      </Modal.Actions>
                    </Modal>
                  </Grid.Row>
                  <Grid.Column>
                    <Divider horizontal>Annotation display</Divider>
                    {imgAnnotation.map((annotation) => (
                      <AnnotationDisplay
                        annotation={annotation}
                        Annotations={imgAnnotation}
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
                <Button positive disabled={imgUpdated.url === ''} onClick={onSubmitChange}>
                  Submit Annotation Changes
                </Button>
              </Grid.Row>
            </Grid>
          </div>
        </Grid.Column>
        <Grid.Column computer={4} largeScreen={4} widescreen={4}>
          <ImageHistory />
        </Grid.Column>
      </Grid>
    </div>
  );
}
