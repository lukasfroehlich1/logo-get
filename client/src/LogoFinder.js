import React, { Component } from 'react';
import LogoQuery from './LogoQuery';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ImagesClient from 'google-images';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import FileSaver from 'file-saver';
import InputManyField from './InputManyField';


const cse_id = '002397762875892531818:o0-s0h36feo';
const apikeys = [
  'AIzaSyAEqBynMdYqKAc8905z_n3Wc5tqF5Ublqs',
  'AIzaSyBN12GuRVsgxzvI8Eshuej0Q4z2Vhi14zk',
  'AIzaSyCpya759BU7r5qhqeZbSbvMQugJONZKxRs',
  'AIzaSyAzP1xitmd6MPXGcMIpW814ogFQMEPHdag',
  'AIzaSyDaTiYjj8uUn4m-mO41siXKMJ5Wxh4-pzQ',
];


export default class LogoFinder extends Component {
  constructor(props) {
    super(props);

    this.cur_key = 0;
    this.client = new ImagesClient(cse_id, apikeys[this.cur_key]);

    this.state = {
      queries: [
        {
          name: "Teradyne",
          results: [],
          selected: 0,
          lastQuery: ''
        },
      ] 
    }
  }

  addQuery = arg => {
    const newQuery = [{
      name: '',
      results: [],
      selected: 0,
      lastQuery: ''
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

  setSelected = (q, idx) => {
    let prevQueries = this.state.queries.slice();
    const index = prevQueries.findIndex((x) => x === q);
    prevQueries[index].selected = idx;

    this.setState({ queries: prevQueries });
  }

  logoLookup = (q) => {
    if (q.lastQuery !== q.name) {

      this.client.search(q.name + ' logo', {
        colorType: "trans"
      }).then((images) => {
        let prevQueries = this.state.queries.slice();
        const index = prevQueries.findIndex((x) => x === q);

        prevQueries[index].results = images;
        prevQueries[index].selected = 0;
        prevQueries[index].lastQuery = q.name;

        this.setState({ queries: prevQueries });
      }).catch((e) => {
        console.log("API limit hit. Swapping in a new key: " + this.cur_key);

        if (this.cur_key === apikeys.length - 1) {
          alert("Out of queries for today. Please wait until midnight for the number of queries to refresh.");
        }
        else {
          this.cur_key++;

          this.client = new ImagesClient(cse_id, apikeys[this.cur_key]);
        }
      });
    }
  }


  lookupAll = () => {
    let i;

    for (i = 0; i < this.state.queries.length; i++) {
      this.logoLookup(this.state.queries[i]);
    }
  }

  urlToPromise(url) {
    return new Promise(function(resolve, reject) {
      JSZipUtils.getBinaryContent(url, function (err, data) {
        if(err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  downloadAll = () => {
    var zip = new JSZip();

    zip.file("amgen-logo.png", this.urlToPromise("http://logo-load.com/uploads/posts/2016-08/amgen-logo.png"), {binary:true});

    zip.generateAsync({type:"blob"})
      .then(function(content) {
        // see FileSaver.js
        FileSaver.saveAs(content, "example.zip");
      });
  }

  loadText = (text) => {
    let newQueries = [];

    console.log(text.split('\n'));

    const splitText = text.split('\n');

    let i;
    for (i = 0; i < splitText.length; i++) {
      newQueries.push({
        name: splitText[i],
        results: [],
        selected: 0,
        lastQuery: ''
      });
    }

    const prevQueries = this.state.queries.slice();

    this.setState({queries: newQueries.concat(prevQueries)});
  }

  render () {
    const queries = this.state.queries.map((query, idx) => {
      return <LogoQuery data={query} key={idx} id={idx}
                        onChange={this.handleTextChange.bind(this, query)}
                        remove={this.deleteQuery.bind(this, query)}
                        setSelected={this.setSelected.bind(this, query)}
                        logoLookup={this.logoLookup.bind(this, query)}/>;
    });

    return (
      <div>
        <Toolbar>
          <ToolbarGroup firstChild={true} style={{float: 'left'}}>
          </ToolbarGroup>
          <ToolbarGroup lastChild={true} style={{float: 'right'}}>
            <IconButton onTouchTap={this.addQuery}>
              <ContentAdd />
            </IconButton>
            <RaisedButton label="Lookup All" onTouchTap={this.lookupAll} />
            // <RaisedButton label="Download All" onTouchTap={this.downloadAll} />
          </ToolbarGroup>
        </Toolbar>
        <InputManyField loadText={this.loadText} />
        <div>
          {queries}
        </div>
      </div>
    );
  }
}
