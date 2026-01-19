"use client";

import { motion } from "framer-motion";
import React from "react";

export const LoaderOne = () => {
    const transition = (x: number) => ({
        duration: 1,
        repeat: Infinity,
        repeatType: "loop" as const,
        delay: x * 0.2,
        ease: "easeInOut",
    });

    return (
        <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    initial={{ y: 0 }}
                    animate={{ y: [0, 10, 0] }}
                    transition={transition(i)}
                    className="h-4 w-4 rounded-full border border-primary bg-primary"
                />
            ))}
        </div>
    );
};
