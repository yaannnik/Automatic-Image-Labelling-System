/* eslint-disable promise/always-return */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Grid, Form, Button, Header, Message, Image, Segment, Modal } from 'semantic-ui-react';
import log from 'electron-log';

// back end api service
import ImgService from '../../utils/getService';

// internal components
import UserInfo from './userInfo';

export default function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const clickLoginButton = () => {
    const service = new ImgService();
    const data = {
      username,
      password,
    };
    const rsp = service.postLogin(data);
    rsp
      .then((response) => {
        log.info(response);
      })
      .catch(error => {
        log.info(error);
      });
  };
  // listening on input change of username and password
  const inputUsername = (e) => {
    setUsername(e.target.value);
  };
  const inputPassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src="data/logos/login.jpeg" size="huge" /> Log-in to your account
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input fluid icon="user" iconPosition="left" placeholder="E-mail address" onChange={inputUsername} />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={inputPassword}
            />

            <Button color="teal" fluid size="large" onClick={clickLoginButton}>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us?
          <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size="tiny"
            closeIcon
            trigger={<Button color="teal" fluid >Sign Up</Button>}
          >
            <Modal.Header> Create your account with us</Modal.Header>
            <UserInfo />
            <Modal.Actions>
              <Button color="black" onClick={() => setOpen(false)}>
                Nope
              </Button>
              <Button
                content="Confirm"
                labelPosition="right"
                icon="checkmark"
                onClick={() => setOpen(false)}
                positive
              />
            </Modal.Actions>
          </Modal>
        </Message>
      </Grid.Column>
    </Grid>
  );
}
