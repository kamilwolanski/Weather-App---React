import React, {useState} from 'react';
import Switch from "react-switch";
import {RiCelsiusFill, RiFahrenheitFill} from 'react-icons/ri';

const SwitchBtn = ({isCelsius, setIsCelsius})=> {

    // const [isCelsius, setIsCelsius] = useState(true);
    
    return (
        <div className="switch-btn">
          <label>
            <Switch
              onChange={()=> setIsCelsius(!isCelsius)}
              checked={!isCelsius}
              className="react-switch"
              offColor="#2E8B57"
              onColor="#6495ED"
              checkedIcon={<RiFahrenheitFill/>}
              uncheckedIcon={<RiCelsiusFill/>}
            />
          </label>
          {/* <p>
            The switch is celsius <span>{isCelsius ? "YES" : "NO"}</span>.
          </p> */}
        </div>
      );

}

export default SwitchBtn