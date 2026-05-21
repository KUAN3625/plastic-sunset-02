import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { usePomodoroTimer } from './usePomodoroTimer';

const colorMap = {
  focus: 'red',
  rest: 'green',
  paused: 'yellow',
  done: 'blue',
  idle: 'gray',
};

export default function SphereByStatus() {
  const meshRef = useRef();
  const status = usePomodoroTimer((state) => state.status);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.material.color.set(colorMap[status] || 'gray');
    }
  }, [status]);

  return (
    <mesh ref={meshRef} position={[0, 1, 0]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={colorMap[status] || 'gray'} />
    </mesh>
  );
}
