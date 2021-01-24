import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import { MdCancel } from "react-icons/md";

const PopUp = ({ setIsSubmitting, setCurrentPosition, setShowPopUp, setIsAccessToLocalization }) => {
  function getLocalization() {

    function success(position) {
        setCurrentPosition({ lat: position.coords.latitude, lon: position.coords.longitude });
    }

    function error() {
        setIsSubmitting(false)
        setIsAccessToLocalization(false);
    }
    navigator.geolocation.getCurrentPosition(success, error);
    setIsSubmitting(true);
    setShowPopUp(false);
  }

  return (
      <>
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
    </>
  );
};

export default PopUp;
