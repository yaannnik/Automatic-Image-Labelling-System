import React, { useState } from 'react';
import { Modal, Button } from 'semantic-ui-react';
import log from 'electron-log';

// data structure
import AnnotationItem from '../../dataStructure/AnnotationItem';

// internal component
import OptionConfirmation from './OptionConfirmation';

export default function ConfirmChangeBtn(props: {
  option: number,
  candidate: AnnotationItem,
  changeAnnotation: (candidate: AnnotationItem) => void
}) {
  const { option, candidate, changeAnnotation } = props;
  const [open, setOpen] = useState(false);  // modal window control
// handle confirm change: switch based on option(0, 1, 2)
  const handleOptionConfirm = () => {
    log.info('ready to change ', candidate);
    changeAnnotation(candidate);
    setOpen(false);  // close modal
  };
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Update Annotation</Button>}
    >
      <OptionConfirmation
        option={option}
        candidate={candidate}
      />
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          content="Yes"
          labelPosition="right"
          icon="checkmark"
          onClick={() => handleOptionConfirm()}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}
