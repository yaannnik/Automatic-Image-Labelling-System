/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { Button, Checkbox, Form, Grid, Segment } from 'semantic-ui-react';

const SettingsForm = () => (
  <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
    <Grid.Column style={{ maxWidth: 450 }}>
      <Form>
      <Segment stacked>
        <Form.Field>
          <label>First Name</label>
          <input placeholder="First Name" />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input placeholder="Last Name" />
        </Form.Field>
        <Form.Field>
          <label>Credentials</label>
          <input placeholder="Please input the credentials" />
        </Form.Field>
        <Form.Field>
          <Checkbox label="Remember me" />
        </Form.Field>
        </Segment>
        <Button color="green" type="submit">Save</Button>
      </Form>
    </Grid.Column>
  </Grid>
);

export default SettingsForm;
