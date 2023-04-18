
import './index.css';
import "./styles.css"

import GridProvider from "./Contexts/GridContext";
import MainScene from "./MainScene";

export default function App() {

  return (
    <div className="main">
      <GridProvider>
        <MainScene />
      </GridProvider>
    </div>
  );
}