import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BreakStatement = () => {
    const [step, setStep] = useState(0);
    const [output, setOutput] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(1);
    const [highlightedLines, setHighlightedLines] = useState([]);
    const [currentIteration, setCurrentIteration] = useState(1);

    const codeString = `#include <stdio.h>

int main() {
    for (int i = 1; i <= 5; i++) {
        if (i == 3) {
            break;
        }
        printf("%d\\n", i);
    }
    printf("Loop ended!\\n");
    return 0;
}`;

    useEffect(() => {
        let timer;
        if (isPlaying && step < 12) {
            timer = setTimeout(() => {
                nextStep();
            }, 1000 / speed);
        }
        return () => clearTimeout(timer);
    }, [isPlaying, step, speed]);

    const resetDemo = () => {
        setStep(0);
        setOutput([]);
        setHighlightedLines([]);
        setIsPlaying(false);
        setCurrentIteration(1);
    };

    const nextStep = () => {
        if (step < 12) {
            setStep(step + 1);
            updateHighlightedLines(step + 1);
        } else {
            setIsPlaying(false);
        }
    };

    const updateHighlightedLines = (currentStep) => {
        const newIteration = Math.floor(currentStep / 4) + 1;
        if (newIteration !== currentIteration) {
            setCurrentIteration(newIteration);
        }

        const stepInIteration = currentStep % 4;

        if (newIteration <= 2) {
            switch (stepInIteration) {
                case 1:
                    setHighlightedLines([4]);
                    break;
                case 2:
                    setHighlightedLines([5]);
                    break;
                case 3:
                    setHighlightedLines([8]);
                    setOutput(prev => [...prev, newIteration.toString()]);
                    break;
                case 0:
                    setHighlightedLines([4]);
                    break;
            }
        } else if (newIteration === 3) {
            switch (stepInIteration) {
                case 1:
                    setHighlightedLines([4]);
                    break;
                case 2:
                    setHighlightedLines([5, 6]);
                    break;
                case 3:
                    setHighlightedLines([10]);
                    setOutput(prev => [...prev, "Loop ended!"]);
                    break;
                case 0:
                    setHighlightedLines([4]);
                    break;
            }
        }
    };

    const CodeHighlight = ({ code, language, highlightedLines }) => {
        return (
            <pre className="bg-gray-900 p-6 rounded-lg overflow-x-auto">
                <code className="text-lg">
                    {code.split('\n').map((line, index) => (
                        <div
                            key={index + 1}
                            className={`${highlightedLines.includes(index + 1) ? 'bg-gray-700' : ''
                                } ${index === highlightedLines[0] - 1 ? 'animate-pulse' : ''}`}
                        >
                            <span className="mr-6 text-gray-500">{index + 1}</span>
                            {line}
                        </div>
                    ))}
                </code>
            </pre>
        );
    };

    const LoopVisualization = ({ currentIteration, output }) => {
        const iterations = [1, 2, 3, 4, 5];

        return (
            <div className="flex flex-col h-full">
                <div className="flex justify-between mb-6">
                    {iterations.map((i) => (
                        <div key={i} className="flex flex-col items-center">
                            <motion.div
                                className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold ${i === currentIteration
                                    ? 'bg-blue-600 text-white'
                                    : i < currentIteration
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-700 text-gray-300'
                                    } ${i === 3 ? 'border-4 border-red-500' : ''}`}
                                animate={{
                                    scale: i === currentIteration ? 1.2 : 1,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                {i}
                            </motion.div>
                            <motion.div
                                className="mt-3 text-lg font-semibold"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: i <= currentIteration ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {i === 3 ? 'Break!' : i < currentIteration ? 'Printed' : ''}
                            </motion.div>
                        </div>
                    ))}
                </div>
                <div className="bg-gray-900 p-6 rounded-lg mt-6">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-300">Output:</h3>
                    <div className="font-mono text-xl text-green-400">
                        <AnimatePresence>
                            {output.map((line, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.3 }}
                                    className="mb-2"
                                >
                                    {line}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 flex items-center justify-center">
            <div className="w-full max-w-6xl bg-gray-800 p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-8 text-blue-400">Break Statement in C</h1>
                <p className="text-xl mb-6 text-gray-300">
                    The break statement immediately terminates the loop and continues with the next statement after the loop.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-300">Code</h2>
                        <CodeHighlight code={codeString} language="c" highlightedLines={highlightedLines} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-300">Visualization</h2>
                        <LoopVisualization currentIteration={currentIteration} output={output} />
                    </div>
                </div>
                <div className="mt-8 flex flex-wrap justify-center items-center gap-6">
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="px-6 py-3 text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {isPlaying ? 'Pause' : 'Play'}
                    </button>
                    <button
                        onClick={nextStep}
                        disabled={step >= 12 || isPlaying}
                        className="px-6 py-3 text-lg bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next Step
                    </button>
                    <button
                        onClick={resetDemo}
                        className="px-6 py-3 text-lg bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Reset
                    </button>
                    <div className="flex items-center space-x-4">
                        <span className="text-lg text-gray-400">Speed:</span>
                        {[1, 2, 4].map((s) => (
                            <button
                                key={s}
                                onClick={() => setSpeed(s)}
                                className={`px-4 py-2 text-lg rounded-lg ${speed === s ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                            >
                                {s}x
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BreakStatement; 