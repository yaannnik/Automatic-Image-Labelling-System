// debug console output
import log from 'electron-log';
import React from 'react';
import { Icon, Label, Card, Popup } from 'semantic-ui-react';
import AnnotationItem from '../../dataStructure/AnnotationItem';


export default function AnnotationDisplay(props: {
  annotation: AnnotationItem
}) {
  const {
    annotation
  } = props;
  // tag status in tag header
  const tagHeader = () => {
    return annotation.category;
  };
  // tag color based on min_screenshot
  const tagColor = () => {
    // red for unmask and green for mask
    if (annotation.category === 'mask') return 'green';
    return 'red';
  };
  // tag info in tag popup
  const tagDesc = () => {
    const content = (
      <Card.Meta>
        category: {annotation.category}
        <br />
        Bounding box: ({annotation.bbox[0]}, {annotation.bbox[1]}), ({annotation.bbox[2]}, {annotation.bbox[3]})
        <br />
        Confidence: {annotation.confidence}
      </Card.Meta>
    );
    return content;
  };
  // open tag modal
  const onClickTagLabel = () => {
    log.info("clicked");
  };

  return (
    <div>
      <Popup
        content={tagDesc()}
        key={annotation.bbox}
        header={tagHeader()}
        trigger={
          <Label
            color={tagColor()}
            style={{ marginTop: '2px' }}
            key={annotation.bbox}
            onClick={() => onClickTagLabel()}
          >
            {annotation.category}
            <Icon name="close" />
          </Label>
        }
      />
    </div>
  );
}
