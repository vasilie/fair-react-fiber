import { PureComponent, useState } from 'react';
import Grid from './Grid';

class GridScene extends PureComponent {
  
  render() {
    console.log("Greeting was rendered at", new Date().toLocaleTimeString());
    return <Grid />;
  }
}

export default GridScene;