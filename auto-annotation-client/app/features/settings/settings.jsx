/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { Dimmer, Grid, Header, Icon } from 'semantic-ui-react';

import UploadModal from './uploadModal';

const SettingsForm = (props) => (
  <div>
    <Dimmer active={props.user === ''} >
      <Header as="h2" icon inverted>
        <Icon name="heart" />
        Please switch to the Login tab to login
        <Header.Subheader>User does not login</Header.Subheader>
      </Header>
    </Dimmer>
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <UploadModal user={props.user} />
      </Grid.Column>
    </Grid>
  </div>
);

export default SettingsForm;
