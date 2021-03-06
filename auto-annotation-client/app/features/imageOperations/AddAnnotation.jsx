/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Grid, Input, Icon, Button, Form, Segment, Dropdown, Divider } from 'semantic-ui-react';
import log from 'electron-log';

// data structure
import AnnotationItem from '../../dataStructure/AnnotationItem';

// internal component
import ConfirmChangeBtn from './ConfirmChangeBtn';

export default function AddAnnotation(props: {
  addAnnoation: (candidate: AnnotationItem) => void
}) {
  const { addAnnoation } = props;
  const [inputUpperX, setInputUpperX] = useState(0);
  const [inputUpperY, setInputUpperY] = useState(0);
  const [inputLowerY, setInputLowerY] = useState(0);
  const [inputLowerX, setInputLowerX] = useState(0);
  const [annotationSelected, setAnnotationSelected] = useState(new AnnotationItem('', [], 1));
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
  // -----------listening port here --------------
  // listen change on input for bounding box
  const onChangeUpperX = (e) => {
    setInputUpperX(e.target.value);
  };
  const onChangeUpperY = (e) => {
    setInputUpperY(e.target.value);
  };
  const onChangeLowerX = (e) => {
    setInputLowerX(e.target.value);
  };
  const onChangeLowerY = (e) => {
    setInputLowerY(e.target.value);
  };
  const onConfirm = () => {
    log.info('set new bbox...');
    log.info([inputUpperX, inputUpperY, inputLowerX, inputLowerY]);
    annotationSelected.bbox = [inputUpperX, inputUpperY, inputLowerX, inputLowerY];
    setAnnotationSelected(annotationSelected);
  };
  // handle on dropdown change
  const categoryChange = (e, selection) => {
    annotationSelected.category = selection.value;
    setAnnotationSelected(annotationSelected);
  };
  return (
    <Grid padded="vertically">
      <Grid.Row>
        {/* <h1>Add an annotation</h1> */}
        {/* <Label size="large" color="green">Add an annotation</Label> */}
      </Grid.Row>
      <Grid.Row>
        <Divider horizontal>Choose a category: mask/unmask</Divider>
        {/* <Label size="large" color="green"></Label> */}
      </Grid.Row>
      <Grid.Row>
        <Dropdown
          placeholder="Choose an category"
          fluid
          selection
          clearable
          options={categoryOptions}
          onChange={categoryChange} />
      </Grid.Row>
      <Grid.Row>
        <Divider horizontal>Add bounding box</Divider>
        {/* <Label size="large" color="green">Add bounding box</Label> */}
        <br />
      </Grid.Row>
      <Grid.Row>
        <Form>
          <Segment stacked>
            <Form.Field>
              <Divider horizontal>Left upper</Divider>
              <Input
                onChange={onChangeUpperX}
                icon={<Icon name="check" inverted circular link />}
                placeholder="Input upper x" />
              <Input
                onChange={onChangeUpperY}
                icon={<Icon name="check" inverted circular link />}
                placeholder="Input upper y" />
            </Form.Field>
            <Form.Field>
              <Divider horizontal>Right bottom</Divider>
              <Input
                onChange={onChangeLowerX}
                icon={<Icon name="check" inverted circular link />}
                placeholder="Input lower x" />
              <Input
                onChange={onChangeLowerY}
                icon={<Icon name="check" inverted circular link />}
                placeholder="Input lower y" />
              <Button positive floated='right' onClick={onConfirm}>
                Confirm bounding box
              </Button>
            </Form.Field>
          <Form.Field/>
          </Segment>
        </Form>
      </Grid.Row>
      <Grid.Row>
      </Grid.Row>
      <Grid.Row>
        <ConfirmChangeBtn
          option={0}
          candidate={annotationSelected}
          changeAnnotation={addAnnoation} />
      </Grid.Row>
    </Grid >
  );
}
