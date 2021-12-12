/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Grid, Input, Icon, Button, Label, Dropdown } from 'semantic-ui-react';
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
  const [inputCategory, setInputCategory] = useState('');
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
    console.log(localStorage.masker);
    // TODO: add frame on image
    // let ctx = localStorage.masker.getContext("2d");
    // ctx.beginPath();
    // ctx.rect(20, 20, 150, 100);
    // ctx.stroke();
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
        <h1>Add an annotation</h1>
      </Grid.Row>
      <Grid.Row>
        <Label size="large" color="green">Choose a category: mask/unmask</Label>
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
        <Label size="large" color="green">Add bounding box</Label>
        <br />
      </Grid.Row>
      <Grid.Row>
        <Input
          onChange={onChangeUpperX}
          icon={<Icon name="check" inverted circular link />}
          placeholder="Input upper x" />
      </Grid.Row>
      <Grid.Row>
        <Input
          onChange={onChangeUpperY}
          icon={<Icon name="check" inverted circular link />}
          placeholder="Input upper y" />
      </Grid.Row>
      <Grid.Row>
        <Input
          onChange={onChangeLowerX}
          icon={<Icon name="check" inverted circular link />}
          placeholder="Input lower x" />
      </Grid.Row>
      <Grid.Row>
        <Input
          onChange={onChangeLowerY}
          icon={<Icon name="check" inverted circular link />}
          placeholder="Input lower y" />
      </Grid.Row>
      <Grid.Row>
        <Button positive onClick={onConfirm}>
          Confirm bounding box
        </Button>
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
