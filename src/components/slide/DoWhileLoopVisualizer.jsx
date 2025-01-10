import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Icons
const CodeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mr-2">
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
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
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
        { line: 1, text: `#include <stdio.h>` },
        { line: 2, text: `int main() {` },
        { line: 3, text: `    int i = ${start};` },
        { line: 4, text: `    do {` },
        { line: 5, text: `        printf("%d\\n", i);` },
        { line: 6, text: `        i++;` },
        {
            line: 7,
            text: `    } while (`,
            condition: `i <= ${end}`,
            closeBrace: `);`,
        },
        { line: 8, text: `    return 0;` },
        { line: 9, text: `}` },
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
            },
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
            },
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

    const getLineHighlightClass = (line, codeElement) => {
        // Highlight initialization line when initialization step occurs
        if (codeElement.line === 3 && currentStep === 0) {
            return "bg-blue-900/50 text-blue-200";
        }

        const stepIndex = currentStep % steps.length;
        switch (stepIndex) {
            case 1: // Print
                return line === 5 ? "bg-green-900/50 text-green-200" : "text-gray-300";
            case 2: // Increment
                return line === 6 ? "bg-purple-900/50 text-purple-200" : "text-gray-300";
            case 3: // Condition check
                return line === 7 ? "text-yellow-300 font-bold animate-pulse" : "text-gray-300";
            default:
                return "text-gray-300";
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl text-white p-8">
            {/* Header */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
                Do-While Loop Visualizer
            </motion.h1>

            {/* Code and Output Section */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* Code Visualization */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700"
                >
                    <h3 className="text-2xl font-semibold mb-6 text-blue-400">Code Visualization</h3>
                    <div className="space-y-4">
                        {code.map((line) => (
                            <div
                                key={line.line}
                                className={`flex items-center font-mono text-2xl transition-all duration-300 ${getLineHighlightClass(
                                    line.line,
                                    line
                                )}`}
                            >
                                <span className="mr-4 text-gray-500 text-xl">{line.line}.</span>
                                <span>{line.text}</span>
                                {line.condition && (
                                    <span
                                        className={`ml-1 ${currentStep % steps.length === 3
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
                    className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700"
                >
                    <h3 className="text-2xl font-semibold mb-6 text-green-400">Output Stream</h3>
                    <div className="space-y-2">
                        <AnimatePresence>
                            {output.map((value, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="flex items-center text-green-400 text-2xl"
                                >
                                    <span className="mr-4 text-gray-500 text-xl">{index + 1}.</span>
                                    <span>{value}</span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>

            {/* Variables and Instruction Section */}
            <div className="mt-8 grid md:grid-cols-2 gap-8">
                {/* Current Variables */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700"
                >
                    <h3 className="text-2xl font-semibold mb-6 text-purple-400">Current Variables</h3>
                    <div className="flex items-center gap-4">
                        <CodeIcon />
                        <div className="bg-gray-700 p-4 rounded-lg">
                            <span className="text-xl font-mono text-purple-400">i = {variables.counter}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Current Instruction */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700"
                >
                    <h3 className="text-2xl font-semibold mb-6 text-yellow-400">Current Instruction</h3>
                    <div className="flex items-center gap-4">
                        <ArrowRightIcon />
                        <span className="text-lg text-yellow-400">{instruction}</span>
                    </div>
                </motion.div>
            </div>

            {/* Controls */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6"
            >
                <div className="flex items-center gap-6">
                    <label className="flex items-center gap-3 text-lg">
                        Start:
                        <input
                            type="number"
                            value={start}
                            onChange={(e) => setStart(Number(e.target.value))}
                            className="bg-gray-700 text-white px-4 py-2 rounded-lg w-24 text-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </label>
                    <label className="flex items-center gap-3 text-lg">
                        End:
                        <input
                            type="number"
                            value={end}
                            onChange={(e) => setEnd(Number(e.target.value))}
                            className="bg-gray-700 text-white px-4 py-2 rounded-lg w-24 text-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </label>
                </div>
                <div className="flex items-center gap-6">
                    <button
                        onClick={runStep}
                        disabled={loopCompleted}
                        className="flex items-center gap-3 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <PlayIcon /> Run Step
                    </button>
                    <button
                        onClick={resetLoop}
                        className="flex items-center gap-3 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg transition-all duration-300"
                    >
                        <RepeatIcon /> Reset
                    </button>
                </div>
            </motion.div>

            {/* Progress Bar */}
            <div className="mt-8">
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <motion.div
                        className="bg-green-500 h-2.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{
                            width: loopCompleted
                                ? "100%"
                                : `${((currentStep + 1) / (steps.length * (end - start + 1))) * 100}%`,
                        }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>
        </div>
    );
};

export default DoWhileLoopVisualizer;