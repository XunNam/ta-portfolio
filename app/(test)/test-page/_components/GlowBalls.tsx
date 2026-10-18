"use client";
import { motion } from "motion/react";

export default function GlowBalls() {
  const glowBalls = [
    {
      id: "blue",
      position: "top-50 left-30",
      gradient: "from-blue-300/70 via-blue-300/40",
      size: "size-64",
      duration: 10,
      delay: 1,
    },
    {
      id: "purple",
      position: "top-60 left-70",
      gradient: "from-purple-300/70 via-purple-300/40",
      size: "size-64",
      duration: 10,
      delay: 0,
    },
  ];

  return (
    <div>
      {glowBalls.map((quaBong) => (
        <motion.div
          key={quaBong.id}
          className={`${quaBong.size} ${quaBong.gradient} bg-radial absolute ${quaBong.position} via-30% to-70% to-transparent`}
          initial={{ scale: 1, opacity: 0.4 }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            type: "tween",
            duration: quaBong.duration,
            delay: quaBong.delay,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        ></motion.div>
      ))}
    </div>
  );
}
