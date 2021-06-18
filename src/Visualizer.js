import React from 'react';
import './Visualizer.css';
import Sorting from './algorithms/Sorting'

class Visualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentStep: 0 };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.step(),
      500
    );

    const LENGTH = 10;
    const MAX_VAL = 100;
    let stepsArr = [];
    let arr = Array.from({length: LENGTH}, () => Math.floor(Math.random() * MAX_VAL));
    let getId;
    let proxy = new Proxy(arr, {
      get: function(target, key) {
        //console.log('get ' + key + ' ' + target);
        getId = key;
        stepsArr.push({getId: key, vals: target.slice()});
        return target[key];
      },
      set: function(target, key, val, receiver) {
        //console.log('set ' + key + ' ' + val + ' ' + target);
        target[key] = val;
        stepsArr.push({getId: getId, setId: key, vals: target.slice()});
        return true;
      }
    });

    Sorting.selectionSort(proxy);
    this.setState({
      steps: stepsArr
    });
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
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
        clearInterval(this.timerID);
      }
    }
  }

  render() {
    if (this.state.steps === undefined)
      return null;

    return (
      <div className="visualizer">
        {this.state.steps[this.state.currentStep].vals.map((val, i) => (
          <div className="col">
            <div
              className={`bar ${((this.state.steps[this.state.currentStep].setId == i) && `bar-set`) || ((this.state.steps[this.state.currentStep].getId == i) && `bar-get`)}`}
              style={{height: `${val * 4}px`}}>
            </div>
            <span>{val}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default Visualizer;
