import React from 'react';
import './App.css';

import Visualizer from './Visualizer';
import Controls from './Controls';
import Sorting from './dsa/Sorting'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 0,
      steps: [],
      currentDSA: Sorting.selectionSort,
      isPlaying: false
    };

    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleStepForward = this.handleStepForward.bind(this);
    this.handleStepBackward = this.handleStepBackward.bind(this);
    this.handleStepEnd = this.handleStepEnd.bind(this);
  }

  componentDidMount() {
    this.initializeSteps(this.state.currentDSA);
    this.handlePlay();
  }

  componentWillUnmount() {
    this.handleStop();
  }

  step() {
    if (this.state.steps.length > 0)
    {
      if (this.state.currentStep < this.state.steps.length - 1) {
        this.setState((prevState, props) => ({
          currentStep: prevState.currentStep + 1
        }));
      }
      else {
        this.stopTimer();
      }
    }
  }

  initializeSteps(algorithm) {
    const LENGTH = 10;
    const MAX_VAL = 89;
    let stepsArr = [];
    let arr = Array.from({length: LENGTH}, () => Math.floor(Math.random() * MAX_VAL + 10));
    let swapIds = [];
    let proxy = new Proxy(arr, {
      get: function(target, key) {
        //console.log('get ' + key + ' ' + target);
        stepsArr.push({getId: key, setId: [], vals: target.slice()});
        return target[key];
      },
      set: function(target, key, val, receiver) {
        //console.log('set ' + key + ' ' + val + ' ' + target);
        target[key] = val;
        swapIds.push(key);
        if (swapIds.length === 2) {
          stepsArr.push({getId: null, setId: swapIds.slice(), vals: target.slice()});
          swapIds = [];
        }
        return true;
      }
    });

    algorithm(proxy);
    this.setState({
      currentStep: 0,
      steps: stepsArr
    });
  }

  handlePlay() {
    this.timerID = setInterval(
      () => this.step(),
      500
    );

    this.setState({ isPlaying: true });
  }

  handlePause() {
    this.stopTimer();
  }

  handleStop() {
    this.stopTimer();
    this.setState({ currentStep: 0 });
  }

  stopTimer() {
    clearInterval(this.timerID);
    this.setState({ isPlaying: false });
  }

  handleStepForward() {
    this.setState((prevState, props) => ({
      currentStep: Math.min(prevState.currentStep + 1, prevState.steps.length - 1)
    }));

    this.stopTimer();
  }

  handleStepBackward() {
    this.setState((prevState, props) => ({
      currentStep: Math.max(prevState.currentStep - 1, 0)
    }));

    this.stopTimer();
  }

  handleStepEnd() {
    this.setState((prevState, props) => ({
      currentStep: prevState.steps.length - 1
    }));

    this.stopTimer();
  }

  render() {
    console.log(this.state.currentDSA.toString());
    return (
      <div className="App">
        <div className="App-header App-dark">
          <span>DSA-Hawk</span>
        </div>
        <div className="App-display App-light">
          <Visualizer steps={this.state.steps[this.state.currentStep]}/>
        </div>
        <div className="App-side App-light">
          <code>
            {this.state.currentDSA.toString()}
          </code>
        </div>
        <div className="App-footer App-dark">
          <Controls
            currentStep={this.state.currentStep}
            maxSteps={this.state.steps.length}
            isPlaying={this.state.isPlaying}
            handlePlay={this.handlePlay}
            handlePause={this.handlePause}
            handleStop={this.handleStop}
            handleStepForward={this.handleStepForward}
            handleStepBackward={this.handleStepBackward}
            handleStepEnd={this.handleStepEnd}
          />
        </div>
      </div>
    );
  }
}

export default App;
