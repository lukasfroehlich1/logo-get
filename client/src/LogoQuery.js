import React, { Component } from 'react';

export default class LogoQuery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entries: [] 
    }
  }

  render () {

    return(
      <h1>i am the logo finder</h1>
    );
  }
}
