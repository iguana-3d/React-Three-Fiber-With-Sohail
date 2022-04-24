import React from 'react';
import { angleToRadians } from '../utils/angle';

export default function Three() {
    return (
        <>
            <mesh>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh rotation={[angleToRadians(90), 0, 0]} >
                <planeGeometry args={[7, 7]} />
                <meshStandardMaterial color="#0fb4d9" />
            </mesh>
            <ambientLight args={["#FFFFFF", 1]} />
        </>
    );
}