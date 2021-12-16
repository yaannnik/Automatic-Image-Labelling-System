/* eslint-disable import/no-unresolved */

// component ui framework
import React, {useState} from 'react';
import { Tab } from 'semantic-ui-react';
// internal component

import ImageDisplay from '../features/imageDisplay/imageDisplay';
import Login from '../features/login/Login';
import SettingsForm from '../features/settings/settings';

// data structure


export default function imageHome() {
  const AppDataInfo = [];
  const [user, setUser] = useState('');
  const panes = [
    { menuItem: 'Home', render: () => <Tab.Pane>{<ImageDisplay imgData={AppDataInfo} user={user} />}</Tab.Pane> },
    { menuItem: 'Login', render: () => <Tab.Pane>{<Login setUser={setUser} />}</Tab.Pane> },
    { menuItem: 'Settings', render: () => <Tab.Pane>{<SettingsForm user={user} />}</Tab.Pane> },
  ];

  return (
    <div>
      <br />
      {/* <Grid columns={2} divided>
        <Grid.Column computer={12} largeScreen={12} widescreen={12}>
          <div className=".app-info-panel" data-tid="appinfo">
            <ImageDisplay imgData={AppDataInfo} />
          </div>
        </Grid.Column>
        <Grid.Column computer={4} largeScreen={4} widescreen={4}>
          <ImageHistory />
        </Grid.Column>
      </Grid> */}
      <Tab panes={panes}/>
    </div>
  );
}
