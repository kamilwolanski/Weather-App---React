import React from "react";
import Button from "@material-ui/core/Button";
import { MdCancel } from "react-icons/md";

const PopUp = ({ setIsSubmitting, setCurrentPosition, setShowPopUp }) => {
  function getLocalization() {
    navigator.geolocation.getCurrentPosition((x) =>
      setCurrentPosition({ lat: x.coords.latitude, lon: x.coords.longitude })
    );
    setIsSubmitting(true);
    setShowPopUp(false);
  }

  return (
    <div className="popup-container">
      <button className="close-menu-btn" onClick={() => setShowPopUp(false)}>
        <MdCancel />
      </button>
      <div className="popup-wrapper">
        <div className="permission">
          <span>Do you want to get weather based on your localization?</span>
        </div>
        <div className="buttons">
          <Button
            className="agree-btn"
            variant="contained"
            color="primary"
            onClick={getLocalization}
          >
            yes
          </Button>
          <Button
            className="cancel-btn"
            onClick={() => setShowPopUp(false)}
            variant="contained"
            color="default"
          >
            NO
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
