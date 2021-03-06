import React from 'react';
import beautify from 'js-beautify';
import './App.css';

import NavigationMenu from './NavigationMenu';
import Visualizer from './Visualizer';
import TabMenu from './TabMenu';
import Controls from './Controls';
import Sorting from './dsa/Sorting';

class App extends React.Component {
  constructor(props) {
    super(props);

    let dsaList = [];
    for (let key in Sorting) {
      dsaList.push(Sorting[key]);
    }

    this.state = {
      currentStep: 0,
      steps: [],
      dsaList: dsaList,
      currentDSA: 0,
      isPlaying: false,
    };

    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleStepForward = this.handleStepForward.bind(this);
    this.handleStepBackward = this.handleStepBackward.bind(this);
    this.handleStepEnd = this.handleStepEnd.bind(this);
    this.handleDSASelect = this.handleDSASelect.bind(this);
  }

  componentDidMount() {
    this.handleDSASelect(0);
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

  initializeSteps(currentDSA) {
    if (currentDSA < 0 || currentDSA >= this.state.dsaList.length) {
      return;
    }

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

    this.state.dsaList[currentDSA](proxy);
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

  handleDSASelect(index) {
    this.setState({
      currentDSA: index
    });

    this.initializeSteps(index);
    this.handleStop();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header App-dark">
          <NavigationMenu dsaList={this.state.dsaList} handleDSASelect={this.handleDSASelect}/>
          <span className="App-title">DSA-Hawk </span>
          <span className="App-title App-selected">[{this.state.dsaList[this.state.currentDSA].name}]</span>
        </div>
        <div className="App-display App-light">
          <Visualizer steps={this.state.steps[this.state.currentStep]}/>
        </div>
        <div className="App-side App-light">
          <code>
            {beautify(this.state.dsaList[this.state.currentDSA].toString(), { indent_size: 2, space_in_empty_paren: true })}
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
