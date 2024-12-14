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

const ForLoopVisualizer = () => {
  const [loopStart, setLoopStart] = useState(1);
  const [loopEnd, setLoopEnd] = useState(5);
  const [currentStep, setCurrentStep] = useState(-1);
  const [output, setOutput] = useState([]);
  const [variables, setVariables] = useState({ i: loopStart });
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
      text: `    for(`,
      initialization: `int i = ${loopStart};`,
      condition: ` i<=${loopEnd}; `,
      incrementVar: ` i++`,
      closeBrace: ` ) {`,
    },
    { line: 4, text: `        printf("%d\\n", i);` },
    { line: 5, text: `    }` },
    { line: 6, text: `    return 0;` },
    { line: 7, text: `}` },
  ];

  const steps = [
    {
      line: 0,
      description: "Initialize variable",
      execute: () => {
        if (!hasInitialized) {
          setInstruction(`Initializing loop: i starts at ${loopStart}`);
          setHasInitialized(true);
        }
      }
    },
    {
      line: 0,
      description: "Check loop condition",
      execute: () => {
        if (variables.i > loopEnd) {
          setLoopCompleted(true);
          setInstruction("Loop condition is false. Stopping iteration.");
          return false;
        }
        setInstruction(`Checking condition: Is ${variables.i} ≤ ${loopEnd}?`);
        return true;
      }
    },
    {
      line: 1,
      description: "Print current value",
      execute: () => {
        setOutput((prev) => [...prev, variables.i]);
        setInstruction(`Printing current value of i: ${variables.i}`);
      },
    },
    {
      line: 0,
      description: "Increment variable",
      execute: () => {
        const newValue = variables.i + 1;
        setVariables((prev) => ({ i: newValue }));
        setInstruction(`Incrementing i from ${variables.i} to ${newValue}`);
      },
    },
  ];

  const runStep = () => {
    if (loopCompleted) return;

    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);

    const step = steps[nextStep % steps.length];
    step.execute();

    if (nextStep % steps.length === 1 && variables.i > loopEnd) {
      setLoopCompleted(true);
      setInstruction("Loop completed. All iterations finished.");
    }
  };

  const resetLoop = () => {
    setCurrentStep(-1);
    setVariables({ i: loopStart });
    setOutput([]);
    setInstruction("Press 'Run Step' to start the loop demonstration");
    setLoopCompleted(false);
    setHasInitialized(false);
  };

  return (
      <div className="w-full max-w-5xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl text-white p-10">
        <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Code Visualization */}
          <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-3xl font-semibold mb-6 text-blue-300">Code Visualization</h3>
            <div className="bg-slate-800 p-8 rounded-xl border-2 border-blue-500/30">
              {code.map((line) => (
                  <div
                      key={line.line}
                      className={`flex items-center font-mono text-2xl mb-2 transition-all duration-300 ${
                          currentStep === -1 && line.line === 2
                              ? "text-green-300 font-bold scale-105"
                              : currentStep % steps.length === 2 && line.line === 4
                                  ? "bg-blue-900/50 text-blue-200"
                                  : "text-gray-300"
                      }`}
                  >
                    <span className="mr-4 text-gray-500 text-xl">{line.line}.</span>
                    <span>{line.text}</span>
                    {line.initialization && (
                        <span
                            className={`${
                                currentStep === 0
                                    ? "text-green-300 font-bold animate-pulse"
                                    : "text-gray-300"
                            }`}
                        >
                    {line.initialization}
                  </span>
                    )}
                    {line.condition && (
                        <span
                            className={`ml-1 ${
                                currentStep % steps.length === 1
                                    ? "text-yellow-300 font-bold animate-pulse"
                                    : "text-gray-300"
                            }`}
                        >
                    {line.condition}
                  </span>
                    )}
                    {line.incrementVar && (
                        <span
                            className={`${
                                currentStep % steps.length === 3
                                    ? "text-purple-300 font-bold animate-pulse"
                                    : "text-gray-300"
                            }`}
                        >
                    {line.incrementVar}
                  </span>
                    )}
                    {line.closeBrace && (
                        <span className="text-gray-300">
                    {line.closeBrace}
                  </span>
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
            <h3 className="text-3xl font-semibold mb-6 text-green-300">Output Stream</h3>
            <div className="bg-slate-800 p-8 rounded-xl border-2 border-green-500/30 min-h-[300px]">
              <AnimatePresence>
                {output.map((value, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-center text-green-300 text-xl mb-2"
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
        <div className="mt-10 grid md:grid-cols-2 gap-10">
          {/* Current Variables */}
          <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-3xl font-semibold mb-6 text-purple-300">Current Variables</h3>
            <div className="bg-slate-800 p-8 rounded-xl border-2 border-purple-500/30">
              <motion.div
                  key={variables.i}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center">
                  <CodeIcon />
                  <span className="text-2xl font-medium">Variable i</span>
                </div>
                <div className="bg-slate-700 rounded-lg p-3 text-center">
                  <span className="text-2xl font-mono text-green-300">{variables.i}</span>
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
            <h3 className="text-3xl font-semibold mb-6 text-yellow-300">Current Instruction</h3>
            <div className="bg-slate-800 p-8 rounded-xl border-2 border-yellow-500/30">
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
            className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-3 text-xl">
              Start:
              <input
                  type="number"
                  value={loopStart}
                  onChange={(e) => setLoopStart(Number(e.target.value))}
                  className="bg-slate-800 text-white px-4 py-3 rounded-lg w-32 text-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="flex items-center gap-3 text-xl">
              End:
              <input
                  type="number"
                  value={loopEnd}
                  onChange={(e) => setLoopEnd(Number(e.target.value))}
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

export default ForLoopVisualizer;