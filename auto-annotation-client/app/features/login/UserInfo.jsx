/* eslint-disable promise/always-return */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Grid, Form, Button, Header, Modal, Image, Segment, Message } from 'semantic-ui-react';
import log from 'electron-log';

// back end api service
import ImgService from '../../utils/getService';

export default function UserInfo() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [signup, setSignup] = useState(false);
  const [signupDisable, setSignupDisable] = useState(true);  // control ability of signup button
  const clickSignupButton = () => {
    const service = new ImgService();
    const data = {
      username,
      password,
    };
    const rsp = service.postSignup(data);
    rsp
      .then(response => {
        log.info(response);
        if (response.status === 200) {
          setSignup(true);
        }
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
  const inputRepeatedPassword = (e) => {
    setRePassword(e.target.value);
  };
  // check the password persistence
  const CheckMessage = () => {
    if (!signup) {
      if (username === '' && password === '') {
        setSignupDisable(false);
        return (
          <Message
            negative
            header="There was some errors with your submission"
            list={[
              'You must input your username.',
              'You must input your password.',
            ]}
          />
        );
      }
      if (username === '') {
        setSignupDisable(false);
        return (
          <Message
            negative
            header="There was some errors with your submission"
            list={[
              'You must input your username.',
            ]}
          />
        );
      }
      if (password === '') {
        setSignupDisable(false);
        return (
          <Message
            negative
            header="There was some errors with your submission"
            list={[
              'You must input your password.',
            ]}
          />
        );
      }
      if (password !== repassword) {
        setSignupDisable(true);
        return (
          <Message
            negative
            header="There was some errors with your submission"
            list={[
              'Inconsistent passwords, please check your password.',
            ]}
          />
        );
      }
      setSignupDisable(false);
      return (
        <Message positive>
          Valid username and password!
        </Message>
      );
    }
    return (
      <Message positive>
        Successfully sign up!
      </Message>
    );
  };

  return (
    <Modal.Content image>
      <Modal.Description>
        <Grid textAlign="center" style={{ height: '50' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              <Image src="data/logos/login.jpeg" size="huge" /> Sign-up a new account
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input fluid icon="user" iconPosition="left" placeholder="Username" onChange={inputUsername} />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  onChange={inputPassword}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Repeat your Password"
                  type="password"
                  onChange={inputRepeatedPassword}
                />
                <CheckMessage />
                <Button color="teal" fluid size="large" onClick={clickSignupButton} disabled={signupDisable}>
                  Sign up
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </Modal.Description>
    </Modal.Content>

  );
}
