import './TabMenu.css';

function TabMenu(props) {
  return (
    <div className="TabMenu">
      <span className="TabMenu-button" onClick={()=>{alert("test");}}>Visualizer</span>
      <span className="TabMenu-button">Code</span>
      <span className="TabMenu-button">Description</span>
    </div>
  );
}

export default TabMenu;
