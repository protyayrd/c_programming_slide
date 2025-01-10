import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ContinueStatement = () => {
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
      continue;
    }
    printf("%d\\n", i);
  }
  return 0;
}`;

    useEffect(() => {
        let timer;
        if (isPlaying && step < 20) {
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
        if (step < 20) {
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

        if (newIteration <= 5) {
            switch (stepInIteration) {
                case 1: // For loop condition check
                    setHighlightedLines([4]);
                    break;
                case 2: // If statement
                    setHighlightedLines([5]);
                    if (newIteration === 3) {
                        setHighlightedLines([5, 6]);
                    }
                    break;
                case 3: // Printf statement or continue
                    if (newIteration === 3) {
                        setHighlightedLines([4]); // Jump back to for loop for next iteration
                    } else {
                        setHighlightedLines([8]);
                        setOutput(prev => [...prev, newIteration.toString()]);
                    }
                    break;
                case 0: // Increment i in for loop
                    setHighlightedLines([4]);
                    break;
            }
        } else {
            setHighlightedLines([9]); // Return statement
        }
    };

    const CodeHighlight = ({ code, language, highlightedLines }) => {
        return (
            <pre className="bg-gray-900 p-6 rounded-lg overflow-x-auto text-lg">
                <code>
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
                <div className="flex justify-between mb-4">
                    {iterations.map((i) => (
                        <div key={i} className="flex flex-col items-center">
                            <motion.div
                                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${i === currentIteration
                                    ? 'bg-blue-600 text-white'
                                    : i < currentIteration
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-700 text-gray-300'
                                    } ${i === 3 ? 'border-2 border-yellow-400' : ''}`}
                                animate={{
                                    scale: i === currentIteration ? 1.2 : 1,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                {i}
                            </motion.div>
                            <motion.div
                                className="mt-2 text-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: i <= currentIteration ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {i === 3 ? 'Skipped' : i < currentIteration ? 'Printed' : ''}
                            </motion.div>
                        </div>
                    ))}
                </div>
                <div className="bg-gray-900 p-4 rounded-lg mt-4">
                    <h3 className="text-xl font-semibold mb-2 text-gray-300">Output:</h3>
                    <div className="font-mono text-green-400">
                        <AnimatePresence>
                            {output.map((line, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.3 }}
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
                <h1 className="text-4xl font-bold mb-8 text-blue-400">Continue Statement in C</h1>
                <p className="text-xl mb-6 text-gray-300">
                    The continue statement skips the rest of the current iteration and moves to the next iteration of the loop.
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
                        disabled={step >= 20 || isPlaying}
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
                                className={`px-4 py-2 text-lg rounded-lg ${speed === s ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                                    }`}
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

export default ContinueStatement;