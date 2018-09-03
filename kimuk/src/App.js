import React, { Component } from 'react';

import Menubar from './components/navigation/MenuBar';
import Index from './components/index';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Menubar/>
        <Index/>
      </div>
    );
  }
}

export default App;
