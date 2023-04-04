import { Suspense, useContext, useState, useTransition, useRef } from "react";
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { OrbitControls,  Stage, Environment, ContactShadows, RandomizedLight, Line, BakeShadows, Effects, Html, Sky, useHelper, Cloud} from '@react-three/drei'
import './index.css';
import Box from "./components/Box";
import { Dome } from "./components/models/Dome";
import { generateCubes, generateCurvedLinePoints } from './lib/helpers/sceneGeneration';
// const radians = angleInDegrees * Math.PI / 180
import "./styles.css"
import { dummyData } from './lib/helpers/dummyData';
import { AmbientLight, CircleGeometry,  CameraHelper } from 'three';
import * as THREE from 'three';
import Sector from './components/Sector';
import { useControls, folder } from 'leva'
import Grid from "../src/components/Grid";
import GridProvider, { GridContext } from "./Contexts/GridContext";
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