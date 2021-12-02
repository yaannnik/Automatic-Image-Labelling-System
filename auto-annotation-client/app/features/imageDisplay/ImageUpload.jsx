import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Button,
  Segment,
  Divider,
  Tab,
  Message,
  Icon,
  Form
} from 'semantic-ui-react';
import { put } from 'axios';

export default class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
  }

  fileInputRef = React.createRef();

  fileChange = e => {
    this.setState({ file: e.target.files[0] }, () => {
      console.log('File chosen --->', this.state.file);
    });
    this.props.setImgUrl(e.target.files[0].path);
  };

  // Export Schedules Tab 2
  fileExport = () => {
    // handle save for export button function
  };

  render() {
    const { file } = this.state;
    const panes = [
      {
        menuItem: ' Import ',
        render: () => (
          <Tab.Pane attached={false}>
            <Message>{file === undefined || file === null ? 'Nothing' : file.name} selected</Message>
            <Form onSubmit={this.onFormSubmit}>
              <Form.Field>
                <Button
                  content="Choose File"
                  labelPosition="left"
                  icon="file"
                  onClick={() => this.fileInputRef.current.click()}
                />
                <input
                  ref={this.fileInputRef}
                  type="file"
                  hidden
                  onChange={this.fileChange}
                />
                <Button
                  positive
                  floated="right"
                  onClick={() => this.props.onUploadClick()}
                  disabled={file === undefined || file === null}

                >
                  <Icon name="arrow alternate circle up" />
                  Upload
                </Button>
              </Form.Field>

            </Form>
          </Tab.Pane>
        )
      }
    ];
    return (
      <Segment style={{ padding: '5em 1em' }} vertical>
        <Divider horizontal>Upload an image</Divider>
        <Tab menu={{ pointing: true }} panes={panes} />
      </Segment>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<ImageUpload />, rootElement);
