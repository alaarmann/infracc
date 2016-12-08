import React, { Component } from 'react';
import ActionFilter from './ActionFilter';
import ActionActivities from './ActionActivities';
import VisibleResources from './VisibleResources';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <ActionFilter/>
        <ActionActivities/>
	<VisibleResources/>
      </div>
    );
  }
}

export default App;
