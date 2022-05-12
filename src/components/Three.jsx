import { Environment, OrbitControls, PerspectiveCamera, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { angleToRadians } from '../utils/angle';
import * as THREE from 'three';
import gsap from 'gsap';
import Car from './Car';

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
        // console.log(orbitControlsRef.current)
    }, [orbitControlsRef.current]);

    const ballRef = useRef(null);

    useEffect(() => {
        // ballRef.current && console.log(ballRef.current);
        //x-axis motion
        const timeline = gsap.timeline({ paused: true });

        timeline.to(ballRef.current.position, {
            x: 1,
            duration: 2,
            ease: 'power2.out'
        });

        //x-axis motion
        timeline.to(ballRef.current.position, {
            y: .5,
            duration: 1,
            ease: 'bounce.out'
        }, '<');

        // const coefficient = .8;
        // for (let i = 1; i <= 4; i++) {

        //     timeline.to(ballRef.current.position, {
        //         y: Math.pow(coefficient, i) * 1.5,
        //         duration: .2,
        //         ease: 'power2.out'
        //     }, '>');

        //     timeline.to(ballRef.current.position, {
        //         y: .5,
        //         duration: .2,
        //         ease: 'power2.in'
        //     }, '>');
        // }

        timeline.play();

    }, [ballRef.current])
    return (
        <>
            {/* CAMERA */}
            <PerspectiveCamera makeDefault position={[0, 1, 5]} />
            <OrbitControls
                ref={orbitControlsRef}
                minPolarAngle={angleToRadians(60)}
                maxPolarAngle={angleToRadians(80)}
            />

            {/* BALL */}
            <mesh position={[-2, 1.5, 0]} castShadow ref={ballRef}>
                <sphereGeometry args={[.5, 32, 32]} />
                <meshStandardMaterial color="#ffffff" metalness={.6} roughness={.2} />
            </mesh>

            {/* Car */}
            {/* <Car /> */}

            {/* FLOOR */}
            <mesh rotation={[(angleToRadians(270)), 0, 0]} receiveShadow >
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="#1ea3d8" />
            </mesh>

            {/* AMBIENT LIGHT */}
            <ambientLight args={["#FFFFFF", .25]} />
            {/* <directionalLight args={["#FFFFFF", 1]} position={[-3, 1, 0]} /> */}
            {/* <spotLight args={["#FFFFFF", 1]} position={[-3, 1, 0]} /> */}

            {/* SPOT LIGHT */}
            <spotLight args={["#FFFFFF", 1.5, 7, angleToRadians(45), .4]} position={[-3, 1, 0]} castShadow />
            {/* ENVIROMENT */}

            <Environment background>
                <mesh>
                    <sphereGeometry args={[50, 100, 100]} />
                    <meshBasicMaterial color="#1ce39d" side={THREE.BackSide} />
                </mesh>
            </Environment>
        </>
    );
}