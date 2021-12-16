/* eslint-disable no-confusing-arrow */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
// debug console output
import log from 'electron-log';
import React, { useEffect, useState } from 'react';
import { Icon, Label, Card, Popup, Modal, Button } from 'semantic-ui-react';

// internal components
import OptionConfirmation from '../imageOperations/OptionConfirmation';

// js helper function
import { removeRectangle } from './js/removeFrame';

export default function AnnotationDisplay(props) {
  const {
    annotation, Annotations, imgIdx
  } = props;
  const [open, setOpen] = useState(false);  // modal window control
  // tag status in tag header
  const tagHeader = () => annotation.confidence === -100 ? 'Deleted' : `${annotation.category} with confidence: ${annotation.confidence}`;
  // tag color based on min_screenshot
  const tagColor = () => {
    // red for unmask and green for mask
    if (annotation.confidence === -100) return 'black';
    if (annotation.category === 'mask') return 'green';

    return 'red';
  };
  useEffect(() => {
    console.log('add label');
    console.log(annotation);
  }, []);
  // tag info in tag popup
  const tagDesc = () => {
    const content = (
      <Card.Meta>
        category: {annotation.category}
        <br />
        Bounding box: ({annotation.bbox[0]}, {annotation.bbox[1]}), ({annotation.bbox[2]}, {annotation.bbox[3]})
        <br />
        Confidence: {annotation.confidence}
      </Card.Meta>
    );
    return content;
  };
  // handle changes on delete annotation
  const deleteAnnotation = (imgItem) => {
    if (imgItem.confidence !== -1) {
      log.info('delete existed annotation: ', imgItem);
      const index = Annotations.indexOf(imgItem);
      log.info("delete imgannotation from frame");
      log.info(index);
      log.info(imgIdx[index]);
      if (index !== -1) {
        Annotations.splice(index, 1);
        removeRectangle(imgIdx[index]);
        imgIdx.splice(index, 1);
      }
      log.info(Annotations);
    }
    setOpen(false);
    annotation.confidence = -100;
  };
  return (
    <div>
      <Popup
        content={tagDesc()}
        key={annotation.bbox}
        header={tagHeader()}
        trigger={
          <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Label
              color={tagColor()}
              style={{ marginTop: '2px' }}
              key={annotation.bbox}
              onClick={() => setOpen(true)}
            >
              {tagHeader()}
              <Icon name="close" />
            </Label>}
          >
            <OptionConfirmation
              option={1}
              candidate={annotation}
            />
            <Modal.Actions>
              <Button color="black" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                content="Yes"
                labelPosition="right"
                icon="checkmark"
                onClick={() => deleteAnnotation(annotation)}
                positive
              />
            </Modal.Actions>
          </Modal>
        }
      />
    </div>
  );
}
