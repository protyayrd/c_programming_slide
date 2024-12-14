import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CodeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 mr-4 text-gray-400">
        <path d="M17 11.2L12 16l-5-4.8" />
        <path d="M17 6.2L12 11l-5-4.8" />
    </svg>
);

const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
);

const RepeatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polyline points="17 1 21 5 17 9"></polyline>
        <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
        <polyline points="7 23 3 19 7 15"></polyline>
        <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
    </svg>
);

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 mr-4">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
);

const DoWhileLoopVisualizer = () => {
    const [start, setStart] = useState(1);
    const [end, setEnd] = useState(5);
    const [currentStep, setCurrentStep] = useState(-1);
    const [output, setOutput] = useState([]);
    const [variables, setVariables] = useState({ counter: start });
    const [instruction, setInstruction] = useState("Press 'Run Step' to start the loop demonstration");
    const [loopCompleted, setLoopCompleted] = useState(false);
    const [hasInitialized, setHasInitialized] = useState(false);

    const code = [
        {
            line: 1,
            text: `#include <stdio.h>`,
        },
        {
            line: 2,
            text: `int main() {`,
        },
        {
            line: 3,
            text: `    int i = ${start};`,
        },
        {
            line: 4,
            text: `    do {`,
        },
        {
            line: 5,
            text: `        printf("%d\\n", i);`
        },
        {
            line: 6,
            text: `        i++;`
        },
        {
            line: 7,
            text: `    } while (`,
            condition: `i <= ${end}`,
            closeBrace: `);`
        },
        {
            line: 8,
            text: `    return 0;`
        },
        {
            line: 9,
            text: `}`
        },
    ];

    const steps = [
        {
            line: 3,
            description: "Initialize variable",
            execute: () => {
                if (!hasInitialized) {
                    setInstruction(`Initializing loop: counter starts at ${start}`);
                    setHasInitialized(true);
                }
            }
        },
        {
            line: 5,
            description: "Print current value",
            execute: () => {
                setOutput((prev) => [...prev, variables.counter]);
                setInstruction(`Printing current value of i: ${variables.counter}`);
            },
        },
        {
            line: 6,
            description: "Increment variable",
            execute: () => {
                const newValue = variables.counter + 1;
                setVariables((prev) => ({ counter: newValue }));
                setInstruction(`Incrementing i from ${variables.counter} to ${newValue}`);
            },
        },
        {
            line: 7,
            description: "Check loop condition",
            execute: () => {
                if (variables.counter > end) {
                    setLoopCompleted(true);
                    setInstruction("Loop condition is false. Stopping iteration.");
                    return false;
                }
                setInstruction(`Checking condition: Is ${variables.counter} ≤ ${end}?`);
                return true;
            }
        },
    ];

    const runStep = () => {
        if (loopCompleted) return;

        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);

        const step = steps[nextStep % steps.length];
        step.execute();

        if (nextStep % steps.length === 3 && variables.counter > end) {
            setLoopCompleted(true);
            setInstruction("Loop condition is false. Stopping iteration.");
        }
    };

    const resetLoop = () => {
        setCurrentStep(-1);
        setVariables({ counter: start });
        setOutput([]);
        setInstruction("Press 'Run Step' to start the loop demonstration");
        setLoopCompleted(false);
        setHasInitialized(false);
    };

    return (
        <div className="w-full max-w-5xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl text-white p-6">
            <div className="grid md:grid-cols-2 gap-6">
                {/* Code Visualization */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h3 className="text-3xl font-semibold mb-4 text-blue-300">Code Visualization</h3>
                    <div className="bg-slate-800 p-6 rounded-xl border-2 border-blue-500/30">
                        {code.map((line) => (
                            <div
                                key={line.line}
                                className={`flex items-center font-mono text-3xl mb-1 transition-all duration-300 ${
                                    (currentStep === -1 && line.line === 2) || (line.line === 3 && !hasInitialized)
                                        ? "text-green-300 font-bold scale-105"
                                        : currentStep % steps.length === 1 && line.line === 5
                                            ? "bg-blue-900/50 text-blue-200"
                                            : currentStep % steps.length === 2 && line.line === 6
                                                ? "bg-purple-900/50 text-purple-200"
                                                : currentStep % steps.length === 3 && line.line === 7
                                                    ? "text-yellow-300 font-bold animate-pulse"
                                                    : "text-gray-300"
                                }`}
                            >
                                <span className="mr-4 text-gray-500 text-lg">{line.line}.</span>
                                <span>{line.text}</span>
                                {line.condition && (
                                    <span
                                        className={`ml-1 ${
                                            currentStep % steps.length === 3
                                                ? "text-yellow-300 font-bold animate-pulse"
                                                : "text-gray-300"
                                        }`}
                                    >
                    {line.condition}
                  </span>
                                )}
                                {line.closeBrace && (
                                    <span className="text-gray-300">{line.closeBrace}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Output Stream */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h3 className="text-3xl font-semibold mb-4 text-green-300">Output Stream</h3>
                    <div className="bg-slate-800 p-6 rounded-xl border-2 border-green-500/30 min-h-[412px]">
                        <AnimatePresence>
                            {output.map((value, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="flex items-center text-green-300 text-3xl mb-2"
                                >
                                    <span className="mr-4 text-gray-500 text-lg">{index + 1}.</span>
                                    <span>{value}</span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>

            {/* Variables and Instruction Section */}
            <div className="mt-6 grid md:grid-cols-2 gap-6">
                {/* Current Variables */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <h3 className="text-3xl font-semibold mb-4 text-purple-300">Current Variables</h3>
                    <div className="bg-slate-800 p-6 rounded-xl border-2 border-purple-500/30">
                        <motion.div
                            key={variables.counter}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            <div className="flex items-center">
                                <CodeIcon />
                                <span className="text-2xl font-medium">Counter</span>
                            </div>
                            <div className="bg-slate-700 rounded-lg p-3 text-center">
                                <span className="text-2xl font-mono text-green-300">{variables.counter}</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Current Instruction */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <h3 className="text-3xl font-semibold mb-4 text-yellow-300">Current Instruction</h3>
                    <div className="bg-slate-800 p-6 rounded-xl border-2 border-yellow-500/30">
                        <motion.div
                            key={instruction}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center text-yellow-300 text-xl"
                        >
                            <ArrowRightIcon />
                            <span>{instruction}</span>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Controls */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-6 flex flex-col md:flex-row items-center justify-between gap-6"
            >
                <div className="flex items-center gap-6">
                    <label className="flex items-center gap-3 text-xl">
                        Start:
                        <input
                            type="number"
                            value={start}
                            onChange={(e) => setStart(Number(e.target.value))}
                            className="bg-slate-800 text-white px-4 py-3 rounded-lg w-32 text-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </label>
                    <label className="flex items-center gap-3 text-xl">
                        End:
                        <input
                            type="number"
                            value={end}
                            onChange={(e) => setEnd(Number(e.target.value))}
                            className="bg-slate-800 text-white px-4 py-3 rounded-lg w-32 text-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </label>
                </div>
                <div className="flex items-center gap-6">
                    <button
                        onClick={runStep}
                        disabled={loopCompleted}
                        className="flex items-center gap-3 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <PlayIcon /> Run Step
                    </button>
                    <button
                        onClick={resetLoop}
                        className="flex items-center gap-3 px-6 py-3 bg-blue-800 hover:bg-blue-700 text-white rounded-lg text-xl transition-all duration-300"
                    >
                        <RepeatIcon /> Reset
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default DoWhileLoopVisualizer;