import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { angleToRadians } from '../utils/angle';
import * as THREE from 'three';

export default function Three() {
    const orbitControlsRef = useRef(null);

    useFrame((state) => {

        if (orbitControlsRef.current) {
            const { x, y } = state.mouse;
            orbitControlsRef.current.setAzimuthalAngle(-x * angleToRadians(45));
            orbitControlsRef.current.setPolarAngle((y + 1) * angleToRadians(60))
            orbitControlsRef.current.update();
        }
    });

    useEffect(() => {
        orbitControlsRef.current && console.log(orbitControlsRef.current)
        console.log(orbitControlsRef.current)
    }, [orbitControlsRef.current])

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 1, 5]} />
            <OrbitControls
                ref={orbitControlsRef}
                minPolarAngle={angleToRadians(60)}
                maxPolarAngle={angleToRadians(80)}
            />
            <mesh position={[0, .5, 0]} castShadow>
                <sphereGeometry args={[.5, 32, 32]} />
                <meshStandardMaterial color="#ffffff" metalness={.6} roughness={.2} />
            </mesh>
            <mesh rotation={[(angleToRadians(270)), 0, 0]} receiveShadow >
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="#1ea3d8" />
            </mesh>
            <ambientLight args={["#FFFFFF", .25]} />
            {/* <directionalLight args={["#FFFFFF", 1]} position={[-3, 1, 0]} /> */}
            {/* <spotLight args={["#FFFFFF", 1]} position={[-3, 1, 0]} /> */}
            <spotLight args={["#FFFFFF", 1.5, 7, angleToRadians(45), .4]} position={[-3, 1, 0]} castShadow />

            <Environment background>
                <mesh>
                    <sphereGeometry args={[50, 100, 100]} />
                    <meshBasicMaterial color="#2266cc" side={THREE.BackSide} />
                </mesh>
            </Environment>
        </>
    );
}