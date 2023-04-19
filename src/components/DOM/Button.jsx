import { useContext } from "react";
import "./Button.css";
import { GridContext } from "../../Contexts/GridContext";
import { PREVIEW_STATES } from "../../lib/consts/states";

const Button = () => {

  const { setPreviewState, previewState } = useContext(GridContext);

  const handleButtonClick = () => {
    setPreviewState(PREVIEW_STATES.DOME);
  }

  const isVisible = previewState === PREVIEW_STATES.BOOTH;
  return (
    <div onClick={() => handleButtonClick()} className={`button ${isVisible ? "active" : ""}`} >
      Close
    </div>
  )
}

export default Button;