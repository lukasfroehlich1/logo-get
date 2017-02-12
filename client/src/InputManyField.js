import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class InputManyField extends Component {
  constructor(props) {
    super(props);

    this.state = {
        text: ''
    }
  }

  setText = (e) => {
    this.setState({text: e.target.value});
  }

  render () {
    return (
      <div>
        <TextField
          hintText="Put in many companies here"
          multiLine={true}
          rows={1}
          rowsMax={8}
          onChange={this.setText}
          fullWidth={true}
        />
        <RaisedButton label="Load" onTouchTap={() => this.props.loadText(this.state.text)} />
                                                       
      </div>
    );
  }
}

