
/* eslint-disable import/no-unresolved */

// component ui framework
import React from 'react';
import { Grid } from 'semantic-ui-react';
// internal component

import ImageDisplay from '../features/imageDisplay/imageDisplay';
import ImageHistory from '../features/imageHistory/imageHistory';

// data structure

import AppData from '../dataStructure/AppData';

export default function imageHome() {
  const AppDataInfo = [];

  return (
    <Grid columns={2} divided>
      <Grid.Column computer={8} largeScreen={10} widescreen={12}>
        <div className=".app-info-panel" data-tid="appinfo">
          <ImageDisplay
            imgData={AppDataInfo}
          />
        </div>
      </Grid.Column>
      <Grid.Column computer={8} largeScreen={6} widescreen={4}>
        <ImageHistory />
      </Grid.Column>
    </Grid>
  );
}
