import React, { Component } from 'react';
import { Card, CardText, CardMedia } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ImagesClient from 'google-images';
import LogoViewer from './LogoViewer';


const cse_id = '002397762875892531818:o0-s0h36feo';
const api = 'AIzaSyBN12GuRVsgxzvI8Eshuej0Q4z2Vhi14zk';


const sampleQuery = '[{"type":"image/png","width":1000,"height":257,"size":20170,"url":"http://logo-load.com/uploads/posts/2016-08/amgen-logo.png","thumbnail":{"url":"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR1Ow2A5pcZDlzz698r8OMGPosF7sMZfa66anjmIt-ZBq-XMOYcWKD4ndXI","width":149,"height":38}},{"type":"image/jpeg","width":3472,"height":1028,"size":112765,"url":"http://static.wixstatic.com/media/0c6955_53dc11a4250e4e8bae558597d3e6ae9f.jpg","thumbnail":{"url":"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRgs2IreqivgqMoMTgI7YivlfH8JHIJyi2RsL4-XumNt7ZzpX_hgtimfb4","width":150,"height":44}},{"type":"image/png","width":1500,"height":844,"size":14152,"url":"http://dwglogo.com/wp-content/uploads/2016/05/amgen_logo.png","thumbnail":{"url":"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSLoSw_TtkSxejagDHNls6oXPaBX9vjVChui8jBHVvevYDnDqys1JmhkxQL","width":150,"height":84}},{"type":"image/png","width":2000,"height":515,"size":43671,"url":"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Amgen.svg/2000px-Amgen.svg.png","thumbnail":{"url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRCHL_EP-aeRuLIWFS54uD63rw0ymGusZKkQfROiWHMPa9LOQZ-R_OKg8","width":150,"height":39}},{"type":"image/jpeg","width":1500,"height":1033,"size":53664,"url":"http://dwglogo.com/wp-content/uploads/2016/05/white_logo_amgen.jpg","thumbnail":{"url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFaObl8FRegwUZyn-_RR-9tiy4imP9p4gOS2G4xsxk9GHx_FJTFHb45vhy","width":150,"height":103}},{"type":"image/png","width":180,"height":180,"size":12387,"url":"https://media.glassdoor.com/sqll/1130/amgen-squarelogo-1453220514353.png","thumbnail":{"url":"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcReprWPyUlMUl2TR9dja3jgxjJrZyGkr0GVj8hnrZa-AJDe6u5-xuT-_h0","width":101,"height":101}},{"type":"image/jpeg","width":1130,"height":432,"size":70918,"url":"http://www.protasis.net/blog/wp-content/uploads/2014/05/Amgen-Logo-Wallpaper-Background.jpg","thumbnail":{"url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZWjHHxeQQAVW9MHhB8Vtkumxd9cIvaEmSG0Eq2XdfiA4Rhwo17DNdOAM","width":150,"height":57}},{"type":"image/jpeg","width":700,"height":172,"size":62661,"url":"https://stocksaints.com/sites/default/files/styles/article_image_full_node/public/field/image/Amgen%20Inc..jpg?itok=8jNFZ273","thumbnail":{"url":"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ_JUL4H5cZomyRWMtIAVJk3KCYDvhH7Z2xMv-MAwTJa5jjlX9SUYhlfaA","width":140,"height":34}},{"type":"image/jpeg","width":417,"height":417,"size":27684,"url":"http://terryhealey.com/wp-content/uploads/2016/01/Amgen-logo1.jpg","thumbnail":{"url":"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQUUF0VnTG0CoOTxwjV9gGRs5101qGXMmsytQ4-bEHoCXXm7bEvWa3WF2I","width":125,"height":125}},{"type":"image/png","width":1728,"height":1152,"size":24014,"url":"http://theoptionspecialist.com/wp-content/uploads/2015/04/Amgen-Logo.png","thumbnail":{"url":"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT7t05wCWKN0SD8iDGgc_dj8sL1GJGpXLoo-YOGmt4pRiwUrY0f_zmJhNL7","width":150,"height":100}}]';


export default class LogoQuery extends Component {
  constructor(props) {
    super(props);

    this.client = new ImagesClient(cse_id, api);
  }

  logoLookup = () => {
    // this.client.search(this.props.text + ' logo')
    //   .then(function (images) {
    //     console.log(images);
    //     console.log(images.toString());
    //     console.log(JSON.stringify(images));
    //   });
    
    let res = JSON.parse(sampleQuery);

    this.props.setResults(res);
  }

  render () {
    const { name, results, selected } = this.props.data;

    return(
      <div>
        <Card>
          <CardText>
            <TextField
              id="text-field-default"
              value={name}
              onChange={this.props.onChange}
              floatingLabelText="Company Name"/>
            <FlatButton onTouchTap={this.logoLookup} 
              label="Lookup" />

            <IconButton onTouchTap={this.props.remove}
                        style={{float: 'right'}}><NavigationClose /></IconButton>
          </CardText>
          <CardMedia>
            <LogoViewer imgs={results} selected={selected} setSelected={this.props.setSelected} />
          </CardMedia>
        </Card>
      </div>
    );
  }
}
