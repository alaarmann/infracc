import React, { Component } from 'react';
import Filter from './Filter';
import Resources from './Resources';
import './App.css';

const resources=['Resource01', 'Resource02', 'Resource03'];

class App extends Component {
  render() {
    return (
      <div className="app">
        <Filter/>
	<Resources resources={resources}/>
      </div>
    );
  }
}

export default App;
