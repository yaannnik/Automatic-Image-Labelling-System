/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Grid, Dropdown } from 'semantic-ui-react';
import log from 'electron-log';

// internal component
import AddAnnotation from './AddAnnotation';
import DeleteAnnotaion from './DeleteAnnotation';
import UpdateAnnotation from './UpdateAnnotation';

// data structure
import AnnotationItem from '../../dataStructure/AnnotationItem';

type MyDropdown = {
  key: number,
  text: string,
  value: number
};

export default function ImageOperation(props: { Annotations: AnnotationItem[], canEdit: boolean}) {
  const { Annotations, canEdit } = props;
  const [option, setOption] = useState(-1);  // specify options on annotation: add, delete or update
  // -----------component data here --------------
  const objectOptions: MyDropdown[] = [
    { key: 0, value: 0, text: 'add' },
    { key: 1, value: 1, text: 'remove' },
    { key: 2, value: 2, text: 'update' }
  ];
  // -----------listening port here --------------
  // listen change on dropdown for selecting bounding box
  const OnObjectChange = (e, selection) => {
    setOption(selection.value);
  };
  // listen change on selection for options on annotation
  const AnnotationOptionComponent = () => {
    // add annotaion
    if (option === 0) {
      return (
        <AddAnnotation
          addAnnoation={addAnnoation}
        />
      );
    }
    // remove annotation
    if (option === 1) {
      return (
        <DeleteAnnotaion
          annotations={Annotations}
          deleteAnnotation={deleteAnnotation}
        />
      );
    }
    // update annotation
    if (option === 2) {
      return (
        <UpdateAnnotation
          annotations={Annotations}
          updateAnnotation={updateAnnotation}
        />
      );
    }
    return (
      <h1>Please specify an option</h1>
    );
  };

    // handle changes on annotation
  const addAnnoation = (imgItem: AnnotationItem) => {
    if (imgItem.confidence !== -1) {
      log.info('add new annotation: ', imgItem);
      const index = Annotations.indexOf(imgItem);
      if (index === -1) Annotations.push(imgItem);  // drop duplicate
      log.info(Annotations);
    }
  };

  // handle changes on delete annotation
  const deleteAnnotation = (imgItem: AnnotationItem) => {
    if (imgItem.confidence !== -1) {
      log.info('delete existed annotation: ', imgItem);
      const index = Annotations.indexOf(imgItem);
      if (index !== -1) {
        Annotations.splice(index, 1);
      }
      log.info(Annotations);
    }
  };

  // handle changes on update annotation
  const updateAnnotation = (imgItem: AnnotationItem) => {
    if (imgItem.confidence !== -1) {
      log.info('update existed annotation: ', imgItem);
      const index = Annotations.indexOf(imgItem);
      if (index !== -1) {
        Annotations[index] = imgItem;
      }
      log.info(Annotations);
    }
  };

  return (
    <Grid columns={2} padded="vertically">
      <Grid.Row>
        <h1>Annotation Options</h1>
        <Dropdown
          selectOnBlur={false}
          scrolling
          search
          selection
          placeholder="Select an option"
          onChange={OnObjectChange}
          disabled={!canEdit}
          options={objectOptions}
          clearable
        />
      </Grid.Row>
      <Grid.Row>
        <AnnotationOptionComponent />
      </Grid.Row>
    </Grid>
  );
}
