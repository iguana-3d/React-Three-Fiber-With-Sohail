import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Three from '../components/Three';
import '../styles/App.css';

function App() {
  return (
    <Suspense fallback={null}>
      <Canvas style={{ height: '100vh' }} shadows>
        <Three />
      </Canvas>
    </Suspense>
  )
}

export default App
