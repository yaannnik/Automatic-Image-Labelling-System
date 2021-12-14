/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React from 'react';
import { Modal, Header, Message } from 'semantic-ui-react';


export default function AddAnnotationModal() {
  const ChangeInformation = () => (
    <Message positive>
      Clear all the frames new added, note that this cannot be reverted.
    </Message>
    );
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
