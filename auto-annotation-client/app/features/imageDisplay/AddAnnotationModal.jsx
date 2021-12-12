/* eslint-disable max-len */
import React from 'react';
import { Modal, Header, Message } from 'semantic-ui-react';

// data structure
import AnnotationItem from '../../dataStructure/AnnotationItem';

export default function AddAnnotationModal(props: {
  candidate: AnnotationItem
}) {
  const { candidate } = props;
  const ChangeInformation = () => {
    if (candidate.confidence === -1) {
      return (
        <Message negative>
        No frame selected, please add a frame:)
      </Message>
      )
    }
    return (
      <Message positive>
        Add a new annotation with coordinate ({candidate.bbox[0]}, {candidate.bbox[1]}), ({candidate.bbox[2]}, {candidate.bbox[3]}).
      </Message>
    );
  };
  return (
    <Modal.Content image>
      <Modal.Description>
        <Header>Option Confirmation</Header>
        <p>
          Do you want to do the following changes?
        </p>
        <ChangeInformation />
      </Modal.Description>
    </Modal.Content>
  );
}
