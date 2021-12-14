/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React from 'react';
import { Modal, Header, Message } from 'semantic-ui-react';

export default function OptionConfirmation(props) {
  const { option, candidate } = props;
  const ChangeInformation = () => {
    if (option === 0) {
      return (
        <Message positive>Add a new annotation with category {candidate.category},
          bounding box ({candidate.bbox[0]}, {candidate.bbox[1]}), ({candidate.bbox[2]}, {candidate.bbox[3]})</Message>
      );
    }
    if (option === 1) {
      return (
        <Message positive>Delete an annotation with category {candidate.category},
          bounding box ({candidate.bbox[0]}, {candidate.bbox[1]}), ({candidate.bbox[2]}, {candidate.bbox[3]})</Message>
      );
    }
    if (option === 2) {
      return (
        <Message positive>Change annotation to category {candidate.category},
          bounding box ({candidate.bbox[0]}, {candidate.bbox[1]}), ({candidate.bbox[2]}, {candidate.bbox[3]})</Message>
      );
    }
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
