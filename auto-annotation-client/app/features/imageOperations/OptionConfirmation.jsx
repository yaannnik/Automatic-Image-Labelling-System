import React from 'react';
import { Modal, Header } from 'semantic-ui-react';

// data structure
import AnnotationItem from '../../dataStructure/AnnotationItem';

export default function OptionConfirmation(props: {
  option: number,
  candidate: AnnotationItem
}) {
  const { option, candidate } = props;
  const ChangeInformation = () => {
    if (option === 0) {
      return (
        <p>Add a new annotation with category {candidate.category}, bounding box {candidate.bbox}</p>
      );
    }
    if (option === 1) {
      return (
        <p>Delete an annotation with category {candidate.category}, bounding box {candidate.bbox}</p>
      );
    }
    if (option === 2) {
      return (
        <p>Change annotation to category {candidate.category}, bounding box {candidate.bbox}</p>
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
