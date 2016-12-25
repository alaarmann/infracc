import React, { Component } from 'react';
import ActionFilter from './ActionFilter';
import ActionActivities from './ActionActivities';
import VisibleResources from './VisibleResources';
import MessagesContainer from './MessagesContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <ActionFilter/>
        <ActionActivities/>
	<VisibleResources/>
          <MessagesContainer/>
      </div>
    );
  }
}

export default App;
