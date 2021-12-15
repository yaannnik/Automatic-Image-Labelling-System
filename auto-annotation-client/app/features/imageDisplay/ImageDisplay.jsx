/* eslint-disable max-len */
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
import Styles from '../imageDisplay/css/ImageDisplay.css';

// helper function: js
import { initDraw } from '../imageDisplay/js/DrawFrameOn';
import { DrawRectangle } from '../imageDisplay/js/drawFrame';
import { UpdateRectangle } from './js/updateRectangle';  // update an existed frame
import { clearRectangle } from '../imageDisplay/js/clearRectangle';  // clear all frames
import { removeRectangle } from './js/removeFrame';  // clear one single frame

// constants
import * as imgSrc from '../../constants/img.json';

// internal component
import ImageUpload from './ImageUpload';
import ImageHistory from '../imageHistory/ImageHistory';
import AddAnnotationModal from './AddAnnotationModal';
import ClearRectangleModal from './ClearRectangleModal';

// back end api service
import ImgService from '../../utils/getService';
import AnnotationItem from '../../dataStructure/AnnotationItem';
import AnnotationDisplay from './AnnotationDisplay';


var imglist = {};

export default function AppIcon(props: { imgData: [], user: string }) {
  // connection between front end and back end
  const { imgData, user } = props;
  const [open, setOpen] = useState(false);
  const [openClear, setopenClear] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [imgAnnotation, setAnnotation] = useState([]);
  const [imgIdx, setImgIdx] = useState([]);  // id of the annonation in the imgAnnotation corresponding position
  const [imgUpdated, setImgUpdated] = useState(new ImgItem(imgUrl, [], 0, 0));
  const [candidate, setCandidate] = useState([new AnnotationItem('', [], -100)]);

  
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
    imglist[2] = imglist[1];
    imglist[1] = imglist[0];
    imglist[0] = imgUrl;
    

    log.info(rsp);
    // eslint-disable-next-line promise/catch-or-return
    rsp.then(response => {
      imgUpdated.url = response.data.url;
      imgUpdated.height = response.data.height;
      imgUpdated.width = response.data.width;
      imgUpdated.annotation = [];
      // clear cached data
      clearRectangle('rectangle');
      setCandidate([new AnnotationItem('', [], -100)]);
      response.data.annotation.map((annotationNew) => {
        const id = imgIdx.length === 0 ? 0 : imgIdx[imgIdx.length - 1] + 1;
        imgUpdated.annotation.push(new AnnotationItem(
                                  annotationNew.category,
                                  annotationNew.bbox,
                                  annotationNew.confidence));
        DrawRectangle('bigimg', annotationNew.bbox[0], annotationNew.bbox[1],
                      annotationNew.bbox[2] - annotationNew.bbox[0],
                      annotationNew.bbox[3] - annotationNew.bbox[1],
                      id);
        // record id
        imgIdx.push(id);
        // log.info(imgUpdated);
        setAnnotation(imgUpdated.annotation);
        setImgUpdated(imgUpdated);
        log.info("add imgannotation from request");
        log.info(imgAnnotation);
        log.info(imgIdx);
        return response;
      })
      .catch(error => {
        log.info(error);
      });
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
        return response;
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
    setCandidate([new AnnotationItem('', [], -100)]);
    candidate.map((annotationNew) => {
      if (annotationNew.confidence !== -100) {
        const id = imgIdx.length === 0 ? 0 : imgIdx[imgIdx.length - 1] + 1;
        DrawRectangle('bigimg', annotationNew.bbox[0], annotationNew.bbox[1],
          annotationNew.bbox[2] - annotationNew.bbox[0],
          annotationNew.bbox[3] - annotationNew.bbox[1],
          id);
        imgAnnotation.push(annotationNew);
        // record id
        imgIdx.push(id);
      }
      log.info("add imgannotation from frame");
      log.info(imgAnnotation);
      log.info(imgIdx);
    });

    setOpen(false);
  };
  const onCancelAddFrame = () => {
    setCandidate([new AnnotationItem('', [], -100)]);
    setOpen(false);
  };
  const onClearFrame = () => {
    clearRectangle('rectangle');
    setopenClear(false);
  };

  // ----------------annotation options here----------
  // handle changes on annotation
  const addAnnoation = (imgItem) => {
    if (imgItem.confidence !== -1) {
      log.info('add new annotation: ', imgItem);
      const index = imgAnnotation.indexOf(imgItem);
      if (index === -1 && imgItem.bbox.length !== 0) {
        const id = imgIdx.length === 0 ? 0 : imgIdx[imgIdx.length - 1] + 1;
        imgAnnotation.push(imgItem);
        DrawRectangle('bigimg', imgItem.bbox[0], imgItem.bbox[1],
          imgItem.bbox[2] - imgItem.bbox[0],
          imgItem.bbox[3] - imgItem.bbox[1],
          id);
          // record id
        imgIdx.push(id);
      }  // drop duplicate
      log.info("add imgannotation from dropdown");
      log.info(imgAnnotation);
      log.info(imgIdx);
    }
  };

  // handle changes on delete annotation
  const deleteAnnotation = (imgItem) => {
    if (imgItem.confidence !== -1) {
      log.info('delete existed annotation: ', imgItem);
      const index = imgAnnotation.indexOf(imgItem);
      log.info("delete imgannotation from dropdown");
      log.info(index);
      log.info(imgIdx[index]);
      if (index !== -1) {
        imgAnnotation.splice(index, 1);
        removeRectangle(imgIdx[index]);
        imgIdx.splice(index, 1);
      }
    }
  };

  // handle changes on update annotation
  const updateAnnotation = (imgItem) => {
    if (imgItem.confidence !== -1) {
      log.info('update existed annotation: ', imgItem);
      const index = imgAnnotation.indexOf(imgItem);
      if (index !== -1) {
        UpdateRectangle(imgIdx[index], imgItem.bbox[0], imgItem[1],
                        imgItem.bbox[2] - imgItem.bbox[1],
                        imgItem.bbox[3] - imgItem.bbox[1]);
        imgAnnotation[index] = imgItem;
      }
      log.info(imgAnnotation);
    }
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
        <img src="https://react.semantic-ui.com/images/avatar/small/christian.jpg" alt="profile" />
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
                      <AddAnnotationModal candidates={candidate} />
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

                    <Modal
                      onClose={() => setopenClear(false)}
                      onOpen={() => setopenClear(true)}
                      open={openClear}
                      trigger={<Button color="green" >Clear frames</Button>}
                    >
                      <ClearRectangleModal />
                      <Modal.Actions>
                        <Button color="black" onClick={() => setopenClear(false)}>
                          Cancel
                        </Button>
                        <Button
                          content="Yes"
                          labelPosition="right"
                          icon="checkmark"
                          onClick={() => onClearFrame()}
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
                        imgIdx={imgIdx}
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
                    addAnnoation={addAnnoation}
                    deleteAnnotation={deleteAnnotation}
                    updateAnnotation={updateAnnotation}
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
          <ImageHistory imglist = {imglist}/>
        </Grid.Column>
      </Grid>
    </div>
  );
}
