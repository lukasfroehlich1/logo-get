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
const api = 'AIzaSyAEqBynMdYqKAc8905z_n3Wc5tqF5Ublqs';

const sampleQuery = '[{"type":"image/png","width":1000,"height":257,"size":20170,"url":"http://logo-load.com/uploads/posts/2016-08/amgen-logo.png","thumbnail":{"url":"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR1Ow2A5pcZDlzz698r8OMGPosF7sMZfa66anjmIt-ZBq-XMOYcWKD4ndXI","width":149,"height":38}},{"type":"image/jpeg","width":3472,"height":1028,"size":112765,"url":"http://static.wixstatic.com/media/0c6955_53dc11a4250e4e8bae558597d3e6ae9f.jpg","thumbnail":{"url":"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRgs2IreqivgqMoMTgI7YivlfH8JHIJyi2RsL4-XumNt7ZzpX_hgtimfb4","width":150,"height":44}},{"type":"image/png","width":1500,"height":844,"size":14152,"url":"http://dwglogo.com/wp-content/uploads/2016/05/amgen_logo.png","thumbnail":{"url":"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSLoSw_TtkSxejagDHNls6oXPaBX9vjVChui8jBHVvevYDnDqys1JmhkxQL","width":150,"height":84}},{"type":"image/png","width":2000,"height":515,"size":43671,"url":"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Amgen.svg/2000px-Amgen.svg.png","thumbnail":{"url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRCHL_EP-aeRuLIWFS54uD63rw0ymGusZKkQfROiWHMPa9LOQZ-R_OKg8","width":150,"height":39}},{"type":"image/jpeg","width":1500,"height":1033,"size":53664,"url":"http://dwglogo.com/wp-content/uploads/2016/05/white_logo_amgen.jpg","thumbnail":{"url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFaObl8FRegwUZyn-_RR-9tiy4imP9p4gOS2G4xsxk9GHx_FJTFHb45vhy","width":150,"height":103}},{"type":"image/png","width":180,"height":180,"size":12387,"url":"https://media.glassdoor.com/sqll/1130/amgen-squarelogo-1453220514353.png","thumbnail":{"url":"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcReprWPyUlMUl2TR9dja3jgxjJrZyGkr0GVj8hnrZa-AJDe6u5-xuT-_h0","width":101,"height":101}},{"type":"image/jpeg","width":1130,"height":432,"size":70918,"url":"http://www.protasis.net/blog/wp-content/uploads/2014/05/Amgen-Logo-Wallpaper-Background.jpg","thumbnail":{"url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZWjHHxeQQAVW9MHhB8Vtkumxd9cIvaEmSG0Eq2XdfiA4Rhwo17DNdOAM","width":150,"height":57}},{"type":"image/jpeg","width":700,"height":172,"size":62661,"url":"https://stocksaints.com/sites/default/files/styles/article_image_full_node/public/field/image/Amgen%20Inc..jpg?itok=8jNFZ273","thumbnail":{"url":"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ_JUL4H5cZomyRWMtIAVJk3KCYDvhH7Z2xMv-MAwTJa5jjlX9SUYhlfaA","width":140,"height":34}},{"type":"image/jpeg","width":417,"height":417,"size":27684,"url":"http://terryhealey.com/wp-content/uploads/2016/01/Amgen-logo1.jpg","thumbnail":{"url":"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQUUF0VnTG0CoOTxwjV9gGRs5101qGXMmsytQ4-bEHoCXXm7bEvWa3WF2I","width":125,"height":125}},{"type":"image/png","width":1728,"height":1152,"size":24014,"url":"http://theoptionspecialist.com/wp-content/uploads/2015/04/Amgen-Logo.png","thumbnail":{"url":"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT7t05wCWKN0SD8iDGgc_dj8sL1GJGpXLoo-YOGmt4pRiwUrY0f_zmJhNL7","width":150,"height":100}}]';


export default class LogoFinder extends Component {
  constructor(props) {
    super(props);

    this.client = new ImagesClient(cse_id, api);

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
            <RaisedButton label="Download All" onTouchTap={this.downloadAll} />
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
