import React, { Component } from 'react';
import ActionFilter from './ActionFilter';
import ActionActivities from './ActionActivities';
import VisibleResources from './VisibleResources';
import MessagesContainer from './MessagesContainer';
import ResourceEditorConnector from './ResourceEditorConnector';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <ActionFilter/>
        <ActionActivities/>
	<VisibleResources/>
          <MessagesContainer/>
          <ResourceEditorConnector/>
      </div>
    );
  }
}

export default App;
