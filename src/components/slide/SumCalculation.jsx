import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calculator,
    CheckCircle2,
    RefreshCw
} from 'lucide-react';

const CodeVisualization = ({ currentIndex, totalSum }) => {
    const codeLines = [
        '',
        '#include <stdio.h>',
        'int main() {',
        '    int sum = 0;',
        '    for(int i = 1; i<=5; i++) {',
        '        sum = sum + i;',
        '        printf("%d ", sum);',
        '    }',
        '    printf("Total: %d", sum);',
        '}',
    ];

    return (
        <div className="bg-gray-900/80 p-4 rounded-xl font-mono text-3xl backdrop-blur-sm">
            {codeLines.map((line, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0.5, x: -10 }}
                    animate={{
                        opacity: index === 4 || index === 5 || index === 6 || index === 7 ? 1 : 0.7,
                        x: 0,
                        backgroundColor:
                            (index === 4 || index === 5 || index === 6 || index === 7)
                                ? 'rgba(34, 197, 94, 0.2)'
                                : 'transparent'
                    }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`${(index === 4 || index === 5 || index === 6 || index === 7)
                        ? 'text-green-300 font-bold'
                        : 'text-gray-500'
                        } relative`}
                >
                    {line}
                    {(index === 10) && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="absolute right-0 flex space-x-2"
                        >
                            <span className="text-blue-200">
                                [Running Sum: {totalSum}]
                            </span>
                        </motion.div>
                    )}
                </motion.div>
            ))}
        </div>
    );
};

const NumberVisualization = ({ currentIndex }) => {
    const numbers = [1, 2, 3, 4, 5];
    return (
        <div className="flex justify-center space-x-12 mb-6 text-3xl">
            {numbers.map((num, index) => (
                <motion.div
                    key={index}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                        scale: index === currentIndex ? 1.3 : 1,
                        opacity: index <= currentIndex ? 1 : 0.5,
                        backgroundColor: index === currentIndex
                            ? 'rgba(59, 130, 246, 0.3)'
                            : 'transparent'
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 10
                    }}
                    className={`w-16 h-16 flex items-center justify-center 
                        rounded-full border-2 font-bold
                        ${index === currentIndex
                            ? 'border-blue-500 text-blue-300 ring-2 ring-blue-400'
                            : 'border-gray-600 text-gray-400'
                        }`}
                >
                    {num}
                </motion.div>
            ))}
        </div>
    );
};

const SumCalculation = () => {
    const [numbers] = useState([1, 2, 3, 4, 5]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [calculationSteps, setCalculationSteps] = useState([]);
    const [totalSum, setTotalSum] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    const advanceCalculation = () => {
        if (currentIndex < numbers.length - 1) {
            const nextIndex = currentIndex + 1;
            const nextNumber = numbers[nextIndex];
            const newTotal = totalSum + nextNumber;

            const newStep = {
                number: nextNumber,
                runningTotal: newTotal,
                operation: currentIndex === -1
                    ? `0 + 1`
                    : `(Previous sum: ${totalSum}) + (i: ${nextNumber})`
            };

            setCalculationSteps(prev => [...prev, newStep]);
            setTotalSum(newTotal);
            setCurrentIndex(nextIndex);

            if (nextIndex === numbers.length - 1) {
                setIsComplete(true);
            }
        }
    };

    const resetCalculation = () => {
        setCurrentIndex(-1);
        setCalculationSteps([]);
        setTotalSum(0);
        setIsComplete(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-5xl mx-auto bg-gray-900 rounded-xl shadow-2xl border border-gray-800 p-6"
        >
            <div className="bg-gray-800/80 rounded-xl p-4 backdrop-blur-sm">
                <NumberVisualization
                    currentIndex={currentIndex}
                />

                <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Calculation Steps */}
                    <motion.div
                        className="bg-gray-700/50 rounded-xl p-4 overflow-auto backdrop-blur-sm"
                    >
                        <h2 className="text-lg font-semibold text-white mb-3">
                            Calculation Steps
                        </h2>
                        <AnimatePresence>
                            {calculationSteps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-gray-600/70 p-3 rounded-md mb-2 flex justify-between items-center"
                                >
                                    <span className="text-blue-200 text-2xl">{step.operation}</span>
                                    <span className="text-green-300 font-bold ml-2 text-2xl">
                                        = {step.runningTotal}
                                    </span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {/* Code Visualization */}
                    <CodeVisualization
                        currentIndex={currentIndex}
                        totalSum={totalSum}
                    />
                </div>

                {/* Buttons */}
                <div className="flex space-x-4">
                    {!isComplete ? (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={advanceCalculation}
                            className="flex-1 p-3 rounded-lg flex items-center justify-center 
                                bg-gradient-to-r from-blue-600 to-blue-700 text-white 
                                hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                        >
                            {currentIndex === -1 ? 'Start Calculation' : 'Next Step'}
                        </motion.button>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex-1 p-3 rounded-lg flex items-center justify-center 
                                bg-green-600/20 text-green-300  text-2xl text-bold
                                border-2 border-green-500/50"
                        >
                            <CheckCircle2 className="mr-2" />
                            Final Sum: {totalSum}
                        </motion.div>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={resetCalculation}
                        className="bg-red-600/80 text-white p-3 rounded-lg 
                            hover:bg-red-700 transition-all duration-300 
                            flex items-center"
                    >
                        <RefreshCw className="mr-2" />
                        Reset
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default SumCalculation;