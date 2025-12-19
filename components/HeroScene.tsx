
import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Float, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

class InfinityCurve extends THREE.Curve<THREE.Vector3> {
  scale: number;
  constructor(scale = 1) {
    super();
    this.scale = scale;
  }
  getPoint(t: number, optionalTarget = new THREE.Vector3()) {
    const tx = (Math.cos(t * 2 * Math.PI) * this.scale) / (Math.pow(Math.sin(t * 2 * Math.PI), 2) + 1);
    const ty = (Math.sin(t * 2 * Math.PI) * Math.cos(t * 2 * Math.PI) * this.scale) / (Math.pow(Math.sin(t * 2 * Math.PI), 2) + 1);
    const tz = Math.sin(t * 4 * Math.PI) * (this.scale * 0.1); 
    return optionalTarget.set(tx, ty, tz);
  }
}

const MinimalistLoop: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const curve = useMemo(() => new InfinityCurve(11), []);
  
  // 确保颜色对象在当前 Three.js 实例下正确创建
  const whiteColor = useMemo(() => new THREE.Color('#ffffff'), []);
  const attenuationColor = useMemo(() => new THREE.Color('#94a3b8'), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.z = Math.PI / 4 + Math.sin(time * 0.1) * 0.05;
    meshRef.current.rotation.y = time * 0.15;
    
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    const targetX = 2.8 + (scrollY / 1000) * 5;
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[2.8, -0.5, 0]}>
        <tubeGeometry args={[curve, 200, 0.45, 32, false]} />
        <meshPhysicalMaterial
          color={whiteColor}
          transmission={0.9}
          roughness={0.1}
          thickness={2.5}
          ior={1.45}
          envMapIntensity={2}
          attenuationColor={attenuationColor}
          attenuationDistance={0.5}
          transparent={true}
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
};

const SimpleShadow: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const shadowColor = useMemo(() => new THREE.Color('#000000'), []);

  useFrame(() => {
    if (meshRef.current) {
      const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
      meshRef.current.position.x = 2.8 + (scrollY / 1000) * 5;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -11, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[40, 15]} />
      <meshBasicMaterial color={shadowColor} transparent opacity={0.03} />
    </mesh>
  );
};

const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 bg-node-bg">
      <Canvas 
        dpr={[1, 1.5]} 
        gl={{ 
          antialias: true, 
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color('#E3E5E8'), 0);
        }}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={35} />
          
          <Environment resolution={256}>
            <group rotation={[-Math.PI / 3, 0, 0]}>
              <Lightformer form="rect" intensity={10} position={[0, 10, -10]} scale={[20, 20, 1]} rotation-x={Math.PI / 2} />
              <Lightformer form="circle" intensity={5} position={[-10, 2, -5]} scale={[10, 10, 1]} />
            </group>
          </Environment>

          <ambientLight intensity={1} />
          <pointLight position={[15, 15, 15]} intensity={800} />
          
          <MinimalistLoop />
          <SimpleShadow />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroScene;
