import React from 'react';
import { Button } from 'semantic-ui-react';

export default function uploadButton(props: any) {
  const { appIconSrc } = props;

  return (
    <Button active>Upload</Button>
  );
}
