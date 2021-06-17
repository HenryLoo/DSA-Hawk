import './Visualizer.css';
import Sorting from './algorithms/Sorting'

function Visualizer() {
  const LENGTH = 10;
  const MAX_VAL = 100;
  let arr = Array.from({length: LENGTH}, () => Math.floor(Math.random() * MAX_VAL));
  Sorting.selectionSort(arr);
  return (
    <div className="visualizer">
      {arr.map((val, _) => (
        <div className="col">
          <div className="bar" style={{height: `${val * 4}px`}}></div>
          <span>{val}</span>
        </div>
      ))}
    </div>
  );
}

export default Visualizer;
