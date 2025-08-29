'use client';

import { useEffect, useState } from 'react';
import { useSpring } from 'framer-motion';

type Props = { value: number; durationMs?: number };

export default function AnimatedCounter({ value, durationMs = 600 }: Props) {
  const spring = useSpring(0, { duration: durationMs / 1000 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsub = spring.on('change', (v) => setDisplay(Math.round(v as number)));
    spring.set(value);
    return () => unsub();
  }, [value, spring]);

  return <span>{display.toLocaleString('el-GR')}</span>;
}