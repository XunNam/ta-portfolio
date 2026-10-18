"use client";
import { motion } from "motion/react";

export default function GlowBalls() {
    return(
        <div>
            <motion.div className="h-20 w-20 bg-blue-200 rounded-full absolute top-70 left-20 z-1 blur-3xl"
            initial={{ scale: 1 }}
            animate={{ scale:3 }}
            transition={{ type: "spring", repeat: Infinity, repeatType: "reverse", duration: 10 }}></motion.div>
            <motion.div className="h-20 w-20 bg-purple-200 rounded-full absolute top-140 left-50 z-1 blur-3xl"
            initial={{ scale: 1 }}
            animate={{ scale:3 }}
            transition={{ type: "tween", repeat: Infinity, repeatType: "reverse", duration: 20, delay: 2 }}></motion.div>
            <motion.div className="h-20 w-20 bg-red-200 rounded-full absolute top-60 right-30 z-1 blur-3xl"
            initial={{ scale: 1 }}
            animate={{ scale:3 }}
            transition={{ type: "tween", repeat: Infinity, repeatType: "reverse", duration: 15, delay: 4 }}></motion.div>
        </div>
    );
}