
import './index.css';
import "./styles.css"

import GridProvider from "./Contexts/GridContext";
import MainScene from "./MainScene";
import Button from './components/DOM/Button';

export default function App() {

  return (
    <div className="main">
      <GridProvider>
        <Button />
        <MainScene />
      </GridProvider>
    </div>
  );
}