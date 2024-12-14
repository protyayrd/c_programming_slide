import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, RefreshCw, Pause } from 'lucide-react';

const LoopFlow = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [currentStage, setCurrentStage] = useState('initialization');
    const [loopData, setLoopData] = useState({
        iterations: 0,
        value: 0,
        threshold: 5
    });

    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setTimeout(() => {
                const stageTransitions = {
                    initialization: () => ({
                        nextStage: 'condition',
                        updates: { value: 0, iterations: 0 }
                    }),
                    condition: () => ({
                        nextStage: loopData.value < loopData.threshold ? 'body' : 'end',
                        updates: {}
                    }),
                    body: () => ({
                        nextStage: 'update',
                        updates: {}
                    }),
                    update: () => ({
                        nextStage: 'condition',
                        updates: {
                            value: loopData.value + 1,
                            iterations: loopData.iterations + 1
                        }
                    }),
                    end: () => ({
                        nextStage: 'end',
                        updates: {},
                        stop: true
                    })
                };

                const { nextStage, updates, stop } = stageTransitions[currentStage]();
                setCurrentStage(nextStage);
                setLoopData(prev => ({ ...prev, ...updates }));

                if (stop) {
                    setIsRunning(false);
                }
            }, 1000);
        }

        return () => clearTimeout(timer);
    }, [currentStage, isRunning, loopData.value, loopData.threshold]);

    const stageDetails = {
        initialization: {
            description: "Initializing loop variables",
            color: "bg-gradient-to-r from-blue-500 to-blue-700",
            icon: "🚀"
        },
        condition: {
            description: `Checking loop condition: ${loopData.value} < ${loopData.threshold}`,
            color: "bg-gradient-to-r from-green-500 to-green-700",
            icon: "🔍"
        },
        body: {
            description: "Executing loop body logic",
            color: "bg-gradient-to-r from-yellow-500 to-yellow-700",
            icon: "🧩"
        },
        update: {
            description: "Updating loop variables",
            color: "bg-gradient-to-r from-purple-500 to-purple-700",
            icon: "🔄"
        },
        end: {
            description: "Loop completed, reached exit condition",
            color: "bg-gradient-to-r from-red-500 to-red-700",
            icon: "🏁"
        }
    };

    const handleStart = () => {
        setIsRunning(true);
        setCurrentStage('initialization');
    };

    const handlePause = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        setCurrentStage('initialization');
        setLoopData({ iterations: 0, value: 0, threshold: 5 });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-8">
            <div className="w-full max-w-5xl bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
                <div className="p-12">
                    {/* Stage Progression */}
                    <div className="flex items-center justify-between mb-20">
                        {Object.keys(stageDetails).map((stage, index) => (
                            <React.Fragment key={stage}>
                                <div className="flex flex-col items-center">
                                    <motion.div
                                        className={`relative w-40 h-40 rounded-full flex items-center justify-center 
                      ${stageDetails[stage].color} 
                      ${currentStage === stage ? 'scale-110 shadow-2xl' : 'opacity-50'}`}
                                        animate={{
                                            scale: currentStage === stage ? [1, 1.1, 1] : 1,
                                            opacity: currentStage === stage ? 1 : 0.5
                                        }}
                                    >
                                        <span className="text-6xl">{stageDetails[stage].icon}</span>
                                        {currentStage === stage && (
                                            <motion.div
                                                className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full"
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                            />
                                        )}
                                    </motion.div>
                                    <p className="text-white mt-4 text-2xl font-semibold capitalize">
                                        {stage}
                                    </p>
                                </div>
                                {index < Object.keys(stageDetails).length - 1 && (
                                    <ArrowRight className="text-gray-600" size={64} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Information Panel */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStage}
                            className="bg-gray-700 rounded-2xl p-10 text-white"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <div className="grid grid-cols-3 gap-6 mb-8">
                                <div className="text-center">
                                    <p className="text-gray-400 mb-2 text-xl">Current Stage</p>
                                    <p className="font-bold text-2xl capitalize">{currentStage}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-gray-400 mb-2 text-xl">Loop Value</p>
                                    <p className="font-bold text-2xl">{loopData.value}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-gray-400 mb-2 text-xl">Iterations</p>
                                    <p className="font-bold text-2xl">{loopData.iterations}</p>
                                </div>
                            </div>

                            <p className="text-center italic text-xl text-gray-300">
                                {stageDetails[currentStage].description}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Control Buttons */}
                    <div className="flex justify-center space-x-6 mt-12">
                        {!isRunning ? (
                            <motion.button
                                onClick={handleStart}
                                className="bg-green-600 text-white px-8 py-4 rounded-lg text-xl flex items-center space-x-3 hover:bg-green-700 transition"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Play size={28} />
                                <span>Start</span>
                            </motion.button>
                        ) : (
                            <motion.button
                                onClick={handlePause}
                                className="bg-yellow-600 text-white px-8 py-4 rounded-lg text-xl flex items-center space-x-3 hover:bg-yellow-700 transition"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Pause size={28} />
                                <span>Pause</span>
                            </motion.button>
                        )}
                        <motion.button
                            onClick={handleReset}
                            className="bg-red-600 text-white px-8 py-4 rounded-lg text-xl flex items-center space-x-3 hover:bg-red-700 transition"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <RefreshCw size={28} />
                            <span>Reset</span>
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoopFlow;