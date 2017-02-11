import React, { Component } from 'react';
import LogoQuery from './LogoQuery';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


export default class LogoFinder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      queries: [
        {
          name: "Amgen",
          results: [],
          selected: 0
        },
        {
          name: "Raytheon",
          results: [],
          selected: 0
        },
        {
          name: "Microsoft",
          results: [],
          selected: 0
        },
      ] 
    }
  }

  addQuery = arg => {
    const newQuery = [{
      name: '',
      results: [],
      selected: 0
    }];

    this.setState({queries: newQuery.concat(this.state.queries)});
  }

  deleteQuery = (query) => {
    this.setState((prevState) => ({
      queries: prevState.queries.filter((q) => q !== query)
    }));
  }

  handleTextChange = (q, e) => {
    let prevQueries = this.state.queries.slice();
    const index = prevQueries.findIndex((x) => x === q);
    prevQueries[index].name = e.target.value;

    this.setState({ queries: prevQueries });
  }

  setResults = (q, res) => {
    let prevQueries = this.state.queries.slice();
    const index = prevQueries.findIndex((x) => x === q);
    prevQueries[index].results = res;
    prevQueries[index].selected = 0;

    this.setState({ queries: prevQueries });
  }

  setSelected = (q, idx) => {
    let prevQueries = this.state.queries.slice();
    const index = prevQueries.findIndex((x) => x === q);
    prevQueries[index].selected = idx;

    this.setState({ queries: prevQueries });
  }

  render () {
    const queries = this.state.queries.map((query, idx) => {
      return <LogoQuery data={query} key={idx} id={idx}
                        onChange={this.handleTextChange.bind(this, query)}
                        remove={this.deleteQuery.bind(this, query)}
                        setResults={this.setResults.bind(this, query)} 
                        setSelected={this.setSelected.bind(this, query)}/>;
    });

    return (
      <div>
        <FloatingActionButton onTouchTap={this.addQuery}>
          <ContentAdd />
        </FloatingActionButton>
        {queries}
      </div>
    );
  }
}
