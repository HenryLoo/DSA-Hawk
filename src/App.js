import './App.css';

import Visualizer from './Visualizer';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
      </header> */}
      <div className="App-header App-dark">
        <span>DSA-Hawk</span>
      </div>
      <div className="App-display App-light">
        <Visualizer />
      </div>
      <div className="App-side App-light">
        Content
      </div>
      <div className="App-footer App-dark">
        Footer
      </div>
    </div>
  );
}

export default App;
