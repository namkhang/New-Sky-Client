import React from 'react'
import {Switch , Route} from 'react-router-dom'

import Upload from './Component/Upload/Upload'
import Compare from './Component/Upload/Compare';
import './assets/css/styles.css';
function App() {
  return (
    <div className="App">
          <Switch>
            <Route path='/' exact component={Upload} />
            <Route path='/compare' exact component={Compare} />
          </Switch>
    </div>
  );
}

export default App;
