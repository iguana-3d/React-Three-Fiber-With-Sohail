import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { angleToRadians } from '../utils/angle';

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
            <mesh position={[0, .5, 0]}>
                <sphereGeometry args={[.5, 32, 32]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh rotation={[(angleToRadians(270)), 0, 0]} >
                <planeGeometry args={[7, 7]} />
                <meshStandardMaterial color="#0fb4d9" />
            </mesh>
            <ambientLight args={["#FFFFFF", 1]} />
        </>
    );
}