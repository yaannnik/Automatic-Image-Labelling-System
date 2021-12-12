/* eslint-disable react/prop-types */
/* eslint-disable max-len */
// debug console output
import log from 'electron-log';
import React, { useState } from 'react';
import { Icon, Label, Card, Popup, Modal, Button } from 'semantic-ui-react';
import AnnotationItem from '../../dataStructure/AnnotationItem';

// internal components
import OptionConfirmation from '../imageOperations/OptionConfirmation';

export default function AnnotationDisplay(props) {
  const {
    annotation, Annotations
  } = props;
  const [open, setOpen] = useState(false);  // modal window control
  // tag status in tag header
  const tagHeader = () => `${annotation.category} with confidence: ${annotation.confidence}`;
  // tag color based on min_screenshot
  const tagColor = () => {
    // red for unmask and green for mask
    if (annotation.category === 'mask') return 'green';
    return 'red';
  };
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
      if (index !== -1) {
        Annotations.splice(index, 1);
      }
      log.info(Annotations);
    }
    setOpen(false);
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
