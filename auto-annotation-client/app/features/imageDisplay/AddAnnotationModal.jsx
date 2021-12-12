/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { Modal, Header, Message, Grid, Dropdown } from 'semantic-ui-react';

// data structure
import AnnotationItem from '../../dataStructure/AnnotationItem';

export default function AddAnnotationModal(props: {
  candidate: AnnotationItem
}) {
  const { candidate } = props;
  useEffect(() => {

  }, [candidate]);
  // ----------dropdown options here--------------
  const categoryOptions = [
    {
      key: 'mask',
      text: 'mask',
      value: 'mask',
    },
    {
      key: 'unmask',
      text: 'unmask',
      value: 'unmask',
    },
  ];
  const ChangeInformation = () => {
    if (candidate.confidence === -1) {
      return (
        <Message negative>
          No frame selected, please add a frame:)
        </Message>
      );
    }
    return (
      <Message positive>
        Add a new annotation
        <br />
        Note: {candidate.category === '' ? 'Please specify a category, you cannot submit without specifying a category' : candidate.category}
        <br />
        Bounding box: ({candidate.bbox[0]}, {candidate.bbox[1]}), ({candidate.bbox[2]}, {candidate.bbox[3]}).
      </Message>
    );
  };
  // handle on dropdown change
  const categoryChange = (e, selection) => {
    candidate.category = selection.value;
  };
  return (
    <Modal.Content image>
      <Modal.Description>
        <Header>Option Confirmation</Header>
            <Dropdown
              placeholder="Choose an category"
              fluid
              selection
              clearable
              options={categoryOptions}
              onChange={categoryChange}
            />
            <p>
              Do you want to do the following changes?
            </p>
            <ChangeInformation />

      </Modal.Description>
    </Modal.Content>
  );
}
