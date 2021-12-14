/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Modal, Header, Message, Dropdown } from 'semantic-ui-react';


export default function AddAnnotationModal(props) {
  const { candidates } = props;
  const [category, setCategory] = useState('');
  useEffect(() => {

  }, [candidates]);
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
    if (candidates[1] === undefined) {
      return (
        <Message negative>
          No frame selected, please add a frame:)
        </Message>
      );
    }
    return (
      candidates.map((candidate) => {
        if (candidate.confidence !== -100) {
          return (<Message positive>
            Add a new annotation
            <br />
            Note: {candidate.category === '' ? 'Please specify a category, you cannot submit without specifying a category' : candidate.category}
            <br />
            Bounding box: ({candidate.bbox[0]}, {candidate.bbox[1]}), ({candidate.bbox[2]}, {candidate.bbox[3]}).
          </Message>);
        }
      })

    );
  };
  // handle on dropdown change
  const categoryChange = (e, selection) => {
    setCategory(selection.value);
    candidates.map(candidate => {
      candidate.category = selection.value;
    });
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
