/* eslint-disable no-undef */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Button,
  Segment,
  Divider,
  Tab,
  Message,
  Icon,
  Grid,
  Form
} from 'semantic-ui-react';

const { exec } = require('child_process');

export default class UploadModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      modelUpload: false,
      fileUpload: false,
    };
  }

  fileInputRef = React.createRef();

  fileChange = e => {
    this.setState({ file: e.target.files[0] }, () => {
      console.log('File chosen --->', this.state.file);
    });
  };

  // Export Schedules Tab 2
  modelExport = () => {
    // handle save for export button function
    const { file } = this.state;
    const { user } = this.props;
    this.setState({ modelUpload: true });
    exec(`cp ${file.path} $PWD/../auto-annotation-server/users/${user}/model`);
  };

  // Export Schedules Tab 2
  fileExport = () => {
    // handle save for export button function
    const { file } = this.state;
    const { user } = this.props;
    this.setState({ fileUpload: true });
    exec(`cp ${file.path} $PWD/../auto-annotation-server/users/${user}/config`);
  };

  render() {
    const { file, fileUpload, modelUpload } = this.state;
    const panes = [
      { menuItem: 'Upload your model',
        render: () => (
          <Tab.Pane attached={false}>
            <Message positive={file !== undefined}>
              <Message.List>
                <Message.Item>{file === undefined || file === null ? 'Nothing' : file.name} selected</Message.Item>
                <Message.Item>{modelUpload ? 'Successfully upload your model!' : 'no model'}</Message.Item>
              </Message.List>
            </Message>
            <Form onSubmit={this.onFormSubmit}>
              <Form.Field>
                <Grid columns={2}>
                  <Grid.Column computer={8}>
                    <Button
                      positive
                      floated="left"
                      onClick={() => this.fileInputRef.current.click()}
                    >
                      <Icon name="file" />
                      Open
                    </Button>
                    <input
                      ref={this.fileInputRef}
                      type="file"
                      hidden
                      onChange={this.fileChange}
                      placeholder="Choose a model"
                    />
                  </Grid.Column>

                  <Grid.Column computer={8}>
                    <Button
                      positive
                      floated="right"
                      onClick={this.modelExport}
                      disabled={file === undefined || file === null}

                    >
                      <Icon name="arrow alternate circle up" />
                      Upload
                    </Button>

                  </Grid.Column>
                </Grid>
              </Form.Field>

            </Form>
          </Tab.Pane>
        )
      },
      { menuItem: 'Upload your configure file',
        render: () => (
          <Tab.Pane attached={false}>
            <Message positive={file !== undefined}>
              <Message.List>
                <Message.Item>{file === undefined || file === null ? 'Nothing' : file.name} selected</Message.Item>
                <Message.Item>{fileUpload ? 'Successfully upload your configure file!' : 'no configure file'}</Message.Item>
              </Message.List>
            </Message>
            <Form onSubmit={this.onFormSubmit}>
              <Form.Field>
                <Grid columns={2}>
                  <Grid.Column computer={8}>
                    <Button
                      positive
                      floated="left"
                      onClick={() => this.fileInputRef.current.click()}
                    >
                      <Icon name="file" />
                      Open
                    </Button>
                    <input
                      ref={this.fileInputRef}
                      type="file"
                      hidden
                      onChange={this.fileChange}
                      placeholder="Choose a model"
                    />
                  </Grid.Column>

                  <Grid.Column computer={8}>
                    <Button
                      positive
                      floated="right"
                      onClick={this.fileExport}
                      disabled={file === undefined || file === null}

                    >
                      <Icon name="arrow alternate circle up" />
                      Upload
                    </Button>

                  </Grid.Column>
                </Grid>
              </Form.Field>

            </Form>
          </Tab.Pane>
        )
      }
    ];
    return (
      <Segment style={{ padding: '5em 1em' }} vertical>
        <Divider horizontal>Upload files</Divider>
        <Tab menu={{ pointing: true }} panes={panes} />
      </Segment>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<UploadModal />, rootElement);
