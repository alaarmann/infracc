import React, { Component } from 'react';
import ActionFilter from './ActionFilter';
import VisibleResources from './VisibleResources';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <ActionFilter/>
	<VisibleResources/>
      </div>
    );
  }
}

export default App;
