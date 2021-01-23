import React from 'react';
import Switch from "react-switch";
import {RiCelsiusFill, RiFahrenheitFill} from 'react-icons/ri';

const SwitchBtn = ({isCelsius, setIsCelsius})=> {

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
        </div>
      );

}

export default SwitchBtn