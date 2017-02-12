import React, { Component } from 'react';
import { Card, CardText, CardMedia } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import LogoViewer from './LogoViewer';



export default class LogoQuery extends Component {
  render () {
    const { name, results, selected } = this.props.data;

    let logoViewerComponent = null;

    let cardTextStyle = {
      paddingTop: '10px',
      paddingBottom: '10px',
    }

    if (results.length != 0) {
      logoViewerComponent = (
        <CardText>
          <LogoViewer imgs={results} selected={selected} setSelected={this.props.setSelected} />
        </CardText>
      );
    }

    return(
      <div>
        <Card>
          <CardText style={cardTextStyle}>
            <TextField
              id="text-field-default"
              value={name}
              onChange={this.props.onChange}
              floatingLabelText="Company Name"/>
            <FlatButton onTouchTap={this.props.logoLookup} 
              label="Lookup" />

            <IconButton onTouchTap={this.props.remove}
                        style={{float: 'right'}}><NavigationClose /></IconButton>
          </CardText>
          {logoViewerComponent}
        </Card>
      </div>
    );
  }
}
