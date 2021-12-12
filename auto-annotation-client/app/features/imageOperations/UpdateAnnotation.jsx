/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Grid, Input, Icon, Button, Dropdown, Segment, Divider, Form } from 'semantic-ui-react';
import log from 'electron-log';

// data structure
import AnnotationItem from '../../dataStructure/AnnotationItem';

// internal component
import ConfirmChangeBtn from './ConfirmChangeBtn';

type MyDropdown = {
  key: number,
  text: string,
  value: AnnotationItem
};

export default function UpdateAnnotation(props: {
  annotations: AnnotationItem[],
  updateAnnotation: (candidate: AnnotationItem) => void
}) {
  const { annotations, updateAnnotation } = props;
  const [inputUpperX, setInputUpperX] = useState(0);
  const [inputUpperY, setInputUpperY] = useState(0);
  const [inputLowerY, setInputLowerY] = useState(0);
  const [inputLowerX, setInputLowerX] = useState(0);
  const [inputCategory, setInputCategory] = useState('');
  const [annotationSelected, setAnnotationSelected] = useState(new AnnotationItem('', [], -1));
  const annotationsOptions: MyDropdown[] = annotations.map((
    annotation: AnnotationItem, index: number) => ({
      key: index,
      text: `${annotation.category} | ${annotation.bbox}`,
      value: annotation,
    }));
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
  const OnObjectChange = (e, { value }) => {
    log.info('select annotation:', value);
    setAnnotationSelected(value);
  };
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
        {/* <h1>Change an annotation</h1> */}
        <Divider horizontal>Update an annotation</Divider>
      </Grid.Row>
      <Grid.Row>
        <Dropdown
          selectOnBlur={false}
          scrolling
          fluid
          search
          selection
          placeholder="Select an object"
          onChange={OnObjectChange}
          options={annotationsOptions}
          clearable
        />
      </Grid.Row>
      <Grid.Row>
        {/* <Label size="large" color="green">Choose a category: mask/unmask</Label> */}
        <Divider horizontal>Choose a category: mask/unmask</Divider>
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
        {/* <h1> Add bounding box </h1> */}
        {/* <Label size="large" color="green">Update bounding box</Label> */}
        <Divider horizontal>Update bounding box</Divider>
        <br />
      </Grid.Row>
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
          <Form.Field>
          </Form.Field>
        </Segment>
      </Form>
      <Grid.Row>
        <ConfirmChangeBtn
          option={0}
          candidate={annotationSelected}
          changeAnnotation={updateAnnotation} />
      </Grid.Row>
    </Grid>
  );
}
