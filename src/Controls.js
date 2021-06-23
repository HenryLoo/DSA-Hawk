import './Controls.css';
import { FaPlay, FaPause, FaStop, FaStepBackward, FaStepForward, FaFastForward } from 'react-icons/fa';

function Controls(props) {
  let playButton = props.isPlaying === false ?
    <button onClick={props.handlePlay}><FaPlay /></button> :
    <button onClick={props.handlePause}><FaPause /></button>;

  let currentStep = (props.currentStep + 1) ?? 0;
  let maxSteps = props.maxSteps ?? 0;

  return (
    <div className="Controls">
      {playButton}
      <button onClick={props.handleStop}><FaStop /></button>
      <button onClick={props.handleStepBackward}><FaStepBackward /></button>
      <button onClick={props.handleStepForward}><FaStepForward /></button>
      <button onClick={props.handleStepEnd}><FaFastForward /></button>
      <span>{`${currentStep}/${maxSteps}`}</span>
    </div>
  );
}

export default Controls;
