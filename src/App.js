import React, { Component } from 'react';
import FilterConnector from './FilterConnector';
import ActivitiesConnector from './ActivitiesConnector';
import VisibleResources from './VisibleResources';
import MessagesConnector from './MessagesConnector';
import ResourceEditorConnector from './ResourceEditorConnector';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <FilterConnector/>
        <ActivitiesConnector/>
	<VisibleResources/>
          <MessagesConnector/>
          <ResourceEditorConnector/>
      </div>
    );
  }
}

export default App;
