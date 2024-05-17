'use client';

import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls, Center } from '@react-three/drei';
import { useRef } from 'react';

const Model: React.FC = () => {
    const myModel = useLoader(GLTFLoader, '/3.glb');
    const modelRef = useRef();

    useFrame(() => {
        if (modelRef.current) {
            //@ts-ignore
            modelRef.current.rotation.y += 0.01; // Вращение модели вокруг её центра
        }
    });

    return (
        <primitive 
            ref={modelRef} 
            object={myModel.scene} 
            scale={[0.15, 0.15, 0.15]} // Измените масштаб по необходимости
        />
    );
};

export const ModelViewer: React.FC = () => {
    return (
        <Canvas 
            style={{ height: '300px' }} 
            camera={{ position: [0, 0, 10], fov: 50 }} // Настройка камеры
        >
            <pointLight position={[10, -10, -10]} color="#48cc90" intensity={2000} />
            <pointLight position={[10, 10, 10]} color="#36e2e2" intensity={2000} />
            <pointLight position={[10, -10, 10]} color="#36e2e2" intensity={2000} />
            <pointLight position={[-10, 10, 10]} color="#36e2e2" intensity={2000} />
            <pointLight position={[-10, 10, -10]} color="#36e2e2" intensity={2000} />
            <Center> {/* Центрируем модель */}
                <Model />
            </Center>
            <OrbitControls 
              enableDamping={false}
              target={[0, 0, 0]} // Центрируем камеру на модель
            />
        </Canvas>
    );
};
