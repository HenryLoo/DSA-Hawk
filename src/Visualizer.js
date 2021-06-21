import './Visualizer.css';

function Visualizer(props) {
  if (props.steps === undefined)
    return null;

  return (
    <div className="Visualizer">
      {props.steps.vals.map((val, i) => (
        <div className="Visualizer-col" key={i}>
          <div className="Visualizer-space"></div>
          <div className={"Visualizer-bar" +
            (props.steps.setId.includes(i.toString()) ? " Visualizer-bar-set" : "") +
            (props.steps.getId === i.toString() ? " Visualizer-bar-get" : "")}
            style={{height: `${val}%`}}>
          </div>
          <span>{val}</span>
        </div>
      ))}
    </div>
  );
}

export default Visualizer;
