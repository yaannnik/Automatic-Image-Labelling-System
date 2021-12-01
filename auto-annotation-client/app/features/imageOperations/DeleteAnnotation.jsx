/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Grid, Dropdown } from 'semantic-ui-react';
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

export default function DeleteAnnotaion(props: {
  annotations: AnnotationItem[],
  deleteAnnotation: (candidate: AnnotationItem) => void
}) {
  const { annotations, deleteAnnotation } = props;
  const [annotationSelected, setAnnotationSelected] = useState(new AnnotationItem('', [], -1));
  const annotationsOptions: MyDropdown[] = annotations.map((
    annotation: AnnotationItem, index: number) => ({
      key: index,
      text: `${annotation.category} | ${annotation.bbox}`,
      value: annotation,
    }));
  // -----------hooks here--------------
  // listening on annotations change from above to update dropdown options
  // useEffect(() => {
  //   setObjectOptions(annotations.map((annotation: AnnotationItem, index: number) => ({
  //     key: index,
  //     text: `${annotation.category} | ${annotation.bbox}`,
  //     value: annotation,
  //   })));
  // }, []);
  // -----------listening port here --------------
  // listen change on dropdown for selecting bounding box
  const OnObjectChange = (e, { value }) => {
    log.info('select annotation to delete:', value);
    setAnnotationSelected(value);
  };
  return (
    <Grid columns={2} padded="vertically">
      <Grid.Row>
        <h1>Delete annotation</h1>
        <Dropdown
          selectOnBlur={false}
          scrolling
          search
          selection
          placeholder="Select an object to delete"
          onChange={OnObjectChange}
          options={annotationsOptions}
          clearable
        />
      </Grid.Row>
      <Grid.Row>
        <ConfirmChangeBtn
          option={1}
          candidate={annotationSelected}
          changeAnnotation={deleteAnnotation}
        />
      </Grid.Row>
    </Grid>
  );
}
