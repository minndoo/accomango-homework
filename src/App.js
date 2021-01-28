import React, {useState} from 'react';

import {JsonObjectViewer} from './components/JsonObjectViewer/JsonObjectViewer';
import {JsonStringInput} from './components/JsonStringInput/JsonStringInput';

function App() {
  const [jsonObjectToView, setJsonObjectToView] = useState({});
  return (
    <div className="App" style={{paddingLeft: "10px"}}>
      <div><JsonStringInput onButtonClick={setJsonObjectToView}/></div>
      <JsonObjectViewer objectToView={jsonObjectToView} />
    </div>
  );
}

export default App;
