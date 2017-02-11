import React, { Component } from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};

export default class LogoViewer extends Component {

  render () {
    return (
      <div style={styles.root}>
        <GridList style={styles.gridList} cols={2.2}>
          {this.props.imgs.map((tile, idx) => {
            let actionIcon = null;

            if (idx === this.props.selected) {
              actionIcon = <IconButton><CheckCircle color="rgb(0, 188, 212)" /></IconButton>;
            }
            
            return (
              <GridTile
                key={idx}
                title=' '
                actionIcon={actionIcon}
                titleStyle={styles.titleStyle}
                titleBackground="none"
                onClick={() => this.props.setSelected(idx)}
              >
                <img src={tile.url} />
              </GridTile>
            );
          })}
        </GridList>
      </div>
    );
  }
}
