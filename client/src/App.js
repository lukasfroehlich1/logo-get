import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LogoFinder from './LogoFinder';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    let containerStyle = {
      "marginLeft": 'auto',
      "marginRight": 'auto',
      "maxWidth": '900px',
      "paddingLeft": '20px',
      "paddingRight": '20px',
      "paddingTop": '30px',
      "paddingBottom": '50px'
    }

    let headerStyle = {
      "marginLeft": 'auto',
      "marginRight": 'auto',
      "maxWidth": '1000px',
      "boxShadow": '0 1px 0 rgba(0,0,0,.17)',
      "height": '55px',
      "paddingLeft": '25px',
      "paddingTop": '9px'
    }

    let titleStyle = {
      'margin': '0px',
      'float': 'left',
      'marginTop': '11px'
    }

    return (
      <MuiThemeProvider>
        <div className="app">
          <div className="header" style={headerStyle}>
            <h1 style={titleStyle}>LOGO FINDER</h1>
          </div>
          <div className="body" style={containerStyle}>
            <LogoFinder />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
