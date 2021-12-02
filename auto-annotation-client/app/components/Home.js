/* eslint-disable import/no-unresolved */

// component ui framework
import React from "react";
import { Grid } from "semantic-ui-react";
// internal component

import ImageDisplay from "../features/imageDisplay/imageDisplay";
import ImageHistory from "../features/imageHistory/imageHistory";

// data structure

import AppData from "../dataStructure/AppData";

export default function imageHome() {
  const AppDataInfo = [];

  return (
    <div>
      <br />
      <Grid columns={2} divided>
        <Grid.Column computer={12} largeScreen={12} widescreen={12}>
          <div className=".app-info-panel" data-tid="appinfo">
            <ImageDisplay imgData={AppDataInfo} />
          </div>
        </Grid.Column>
        <Grid.Column computer={4} largeScreen={4} widescreen={4}>
          <ImageHistory />
        </Grid.Column>
      </Grid>
    </div>
  );
}
