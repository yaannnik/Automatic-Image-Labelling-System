/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable promise/always-return */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Grid, Form, Button, Header, Message, Image, Segment, Modal } from 'semantic-ui-react';
import log from 'electron-log';

// back end api service
import ImgService from '../../utils/getService';

// internal components
import UserInfo from './userInfo';

export default function Login(props) {
  const { setUser } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line max-len
  const [loginStatus, setLoginStatus] = useState(3);  // login status: 0 for success, 1 for user not exist, \
  // 2 for pwd not right, 3 for not goin
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
        if (response.status === 200) {
          setLoginStatus(response.data);
          setUser(data.username);
        }
      })
      .catch(error => {
        log.info(error);
      });
  };
  // check the password persistence
  const CheckMessage = () => {
    if (loginStatus === 0) {
      return (
        <Message
          positive
          header="Login successfully!"
        />
      );
    }
    if (loginStatus === 1) {
      return (
        <Message
          negative
          header="There was some errors with your login"
          list={[
            'Login Failed: Invalid username.',
          ]}
        />
      );
    }
    if (loginStatus === 1) {
      return (
        <Message
          negative
          header="There was some errors with your login"
          list={[
            'Login Failed: Username and password does not match, please check again :)',
          ]}
        />
      );
    }
    return (
      <Message negative>
        User does not login
      </Message>
    );
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
          <Image src="./Images/logo.png" size="huge" /> Log-in to your account
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
            <CheckMessage />
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
