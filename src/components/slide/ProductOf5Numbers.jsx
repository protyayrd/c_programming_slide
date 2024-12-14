import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Layers, Repeat, RefreshCw } from 'lucide-react';

const ProductOf5Numbers = () => {
    const [activeTab, setActiveTab] = useState('fordetail');
    const loopTypes = {
        fordetail: {
            title: 'Elements',
            icon: Layers,
            components: [
                { label: 'Initialization', description: 'Set starting values' },
                { label: 'Condition', description: 'Define loop continuation' },
                { label: 'Update', description: 'Modify loop variables' },
                {
                    label: 'Accumulation',
                    description: 'Add current value to running total',
                    extraHeight: true
                }
            ],
            color: 'bg-blue-600'
        },
        for: {
            title: 'For Loop',
            icon: Repeat,
            code: `#include <stdio.h>
int main() {
    int product = 1;
    for (int i = 1; i <= 5; i++) {
        sum = sum * i;
    }
    printf("Sum: %d", sum);
    return 0;
}`,
            color: 'bg-blue-500'
        },
        while: {
            title: 'While Loop',
            icon: RefreshCw,
            code: `#include <stdio.h>
int main() {
    int product = 1;
    int i = 1;
    while (i <= 5) {
        sum = sum * i;
        i++;
    }
    printf("Sum: %d", sum);
    return 0;
}`,
            color: 'bg-green-500'
        },
        dowhile: {
            title: 'Do-While Loop',
            icon: Code,
            code: `#include <stdio.h>
int main() {
    int product = 1;
    int i = 1;
    do {
        sum = sum * i;
        i++;
    } while (i <= 5);
    printf("Sum: %d", sum);
    return 0;
}`,
            color: 'bg-purple-500'
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 15
            }}
            className="w-full max-w-5xl bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border-4 border-slate-700"
        >
            {/* Tab Navigation */}
            <div className="flex border-b-4 border-slate-700">
                {Object.keys(loopTypes).map((loop) => {
                    const LoopIcon = loopTypes[loop].icon;
                    return (
                        <motion.button
                            key={loop}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 0 15px rgba(0,0,0,0.3)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveTab(loop)}
                            className={`
                  flex-1 py-5 text-xl font-bold 
                  flex items-center justify-center 
                  gap-3 transition-all duration-300
                  ${activeTab === loop
                                ? `${loopTypes[loop].color} text-white`
                                : 'text-slate-400 hover:bg-slate-700'}
                `}
                        >
                            <LoopIcon className="w-6 h-6" />
                            {loopTypes[loop].title}
                        </motion.button>
                    );
                })}
            </div>

            {/* Content Display */}
            <AnimatePresence mode="wait">
                {activeTab === 'fordetail' ? (
                    <motion.div
                        key="fordetail"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="bg-slate-900 p-8"
                    >
                        <div className="grid grid-cols-3 gap-6 mb-6">
                            {loopTypes.fordetail.components.slice(0, 3).map((component, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: index * 0.2,
                                        type: "spring",
                                        stiffness: 300
                                    }}
                                    className="
                      bg-transparent border-4 border-white/20
                      rounded-2xl p-6 h-48 relative
                      hover:border-white/40 transition-all
                      flex flex-col justify-between
                    "
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="text-lg font-bold text-white">{component.label}</div>
                                        <Layers className="w-6 h-6 text-slate-500" />
                                    </div>
                                    <div className="text-slate-400 mt-4">{component.description}</div>
                                </motion.div>
                            ))}
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.6,
                                type: "spring",
                                stiffness: 300
                            }}
                            className="grid grid-cols-1 gap-6"
                        >
                            <div className="
                  bg-transparent border-4 border-white/20
                  rounded-2xl p-6 h-72 relative
                  hover:border-white/40 transition-all
                  flex flex-col justify-between
                ">
                                <div className="flex justify-between items-center">
                                    <div className="text-lg font-bold text-white">Accumulation</div>
                                    <Code className="w-6 h-6 text-slate-500" />
                                </div>
                                <div className="text-slate-400 mt-4">
                                    Add current value to running total in each iteration
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.pre
                        key={activeTab}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="
                bg-slate-900 text-emerald-400
                p-8 text-3xl
                font-mono leading-relaxed
                overflow-x-auto max-h-[500px]
                border-t-4 border-slate-700
              "
                    >
                        <code>{loopTypes[activeTab].code}</code>
                    </motion.pre>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ProductOf5Numbers;