/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Grid, Form, Button, Header, Message, Image, Segment } from 'semantic-ui-react';
import log from 'electron-log';

// back end api service
import ImgService from '../../utils/getService';

export default function Login(props: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const clickLoginButton = () => {
    const service = new ImgService();
    const data = {
      username,
      password,
    };
    const rsp = service.postLogin({ data });
    rsp
      .then((response) => {
        log.info(response);
      })
      .catch(error => {
        log.info(error);
      });
  };
  const clickSignupButton = () => {
    const service = new ImgService();
    const rsp = service.postSignup({ data });
    rsp
      .then(response => {
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
          New to us? <Button color="teal" fluid onClick={clickSignupButton}>Sign Up</Button>
        </Message>
      </Grid.Column>
    </Grid>
  );
}
