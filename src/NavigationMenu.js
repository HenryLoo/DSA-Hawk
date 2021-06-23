import './NavigationMenu.css'

import { FaBars } from 'react-icons/fa';

function NavigationMenu(props) {
  return (
    <div className="Navigation">
      <input type="checkbox" id="Navigation-toggle"></input>

      <aside className="Navigation-aside">
        <label for="Navigation-toggle" className="Navigation-exit">X</label>
        <ul>
          {props.dsaList.map((dsa, i) => (
            <li><label for="Navigation-toggle" onClick={()=>props.handleDSASelect(i)}>{dsa.name}</label></li>
          ))}
        </ul>
      </aside>

      <label for="Navigation-toggle" className="Navigation-open"><FaBars /></label>
    </div>
  );
}

export default NavigationMenu;
