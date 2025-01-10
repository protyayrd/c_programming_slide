import React, { useState } from 'react';
import { Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ControlFlowLoopDetails = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [showExample, setShowExample] = useState(false);

    const controlFlowSteps = [
        {
            description: "Basic If Statement Structure",
            code: "if (condition) {\n    // Code to execute if condition is true\n}",
            explanation: "An if statement allows conditional execution:\n- Checks a condition\n- Executes code block only if condition is true\n- Helps in decision-making within code"
        },
        {
            description: "If Statement in For Loop",
            code: "for (initialization; condition; update) {\n    if (condition) {\n        // Code to execute if condition is true\n    }\n}",
            explanation: "If statement in loop:\n- Checks condition each iteration\n- Executes block only when condition is met\n- Allows selective processing"
        },
        {
            description: "Basic If-Else Statement Structure",
            code: "if (condition) {\n    // Code to execute if condition is true\n} else {\n    // Code to execute if condition is false\n}",
            explanation: "If-else provides two execution paths:\n- First block executes if condition is true\n- Alternate block executes if condition is false\n- Enables binary decision-making"
        },
        {
            description: "If-Else in For Loop",
            code: "for (initialization; condition; update) {\n    if (condition) {\n        // Code to execute if condition is true\n    } else {\n        // Code to execute if condition is false\n    }\n}",
            explanation: "If-else in loop:\n- Provides two paths each iteration\n- Executes one block per iteration\n- Handles binary conditions in loop"
        }
    ];

    const controlFlowExamples = [
        {
            description: "Basic If Statement Example",
            code: "#include <stdio.h>\n\nint main() {\n    int x = 10;\n    \n    if (x > 5) {\n        printf(\"x is greater than 5\\n\");\n    }\n    \n    return 0;\n}"
        },
        {
            description: "If Statement in Loop Example",
            code: "#include <stdio.h>\n\nint main() {\n    int i;\n    \n    for (i = 1; i <= 10; i++) {\n        if (i % 2 == 0) {\n            printf(\"%d is even\\n\", i);\n        }\n    }\n    \n    return 0;\n}"
        },
        {
            description: "Basic If-Else Example",
            code: "#include <stdio.h>\n\nint main() {\n    int x = 7;\n    \n    if (x % 2 == 0) {\n        printf(\"%d is even\\n\", x);\n    } else {\n        printf(\"%d is odd\\n\", x);\n    }\n    \n    return 0;\n}"
        },
        {
            description: "If-Else in Loop Example",
            code: "#include <stdio.h>\n\nint main() {\n    int i;\n    \n    for (i = 1; i <= 10; i++) {\n        if (i % 2 == 0) {\n            printf(\"%d is even\\n\", i);\n        } else {\n            printf(\"%d is odd\\n\", i);\n        }\n    }\n    \n    return 0;\n}"
        }
    ];

    const handleNext = () => {
        if (currentStep < controlFlowSteps.length - 1) {
            setCurrentStep((prev) => prev + 1);
            setShowExample(false);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
            setShowExample(false);
        }
    };

    const toggleExample = () => {
        setShowExample(!showExample);
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 w-[900px] mx-auto">
            <div className="bg-gray-800 shadow-2xl rounded-2xl p-8 overflow-hidden">
                {/* <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center mb-8"
                >
                    <Code className="mr-4 w-12 h-12 text-cyan-500" />
                    <h1 className="text-5xl font-bold text-white">Control Flow in Loops</h1>
                </motion.div> */}

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className="mb-8"
                    >
                        <p className="text-cyan-300 mb-6 text-[44px] font-semibold">
                            {controlFlowSteps[currentStep].description}
                        </p>
                        <pre className="bg-gray-700 p-6 rounded-xl text-2xl overflow-auto mb-6">
                            <code className="text-green-300">
                                {controlFlowSteps[currentStep].code}
                            </code>
                        </pre>
                        {/* <div className="text-white text-xl bg-gray-700 p-6 rounded-xl">
                            <p>{controlFlowSteps[currentStep].explanation}</p>
                        </div> */}
                    </motion.div>
                </AnimatePresence>

                <div className="flex justify-between mt-8">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handlePrevious}
                        disabled={currentStep === 0}
                        className="bg-cyan-600 text-white px-8 py-4 rounded-lg
                        disabled:bg-gray-600 disabled:cursor-not-allowed
                        text-2xl font-bold transition"
                    >
                        Previous
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleExample}
                        className="bg-green-600 text-white px-8 py-4 rounded-lg
                        text-2xl font-bold transition"
                    >
                        View Example
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNext}
                        disabled={currentStep === controlFlowSteps.length - 1}
                        className="bg-cyan-600 text-white px-8 py-4 rounded-lg
                        disabled:bg-gray-600 disabled:cursor-not-allowed
                        text-2xl font-bold transition"
                    >
                        Next
                    </motion.button>
                </div>

                {/* Example Modal */}
                {showExample && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                        onClick={toggleExample}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-gray-800 p-8 rounded-2xl max-w-4xl w-full"
                        >
                            <div className="mb-8">
                                <h2 className="text-3xl text-cyan-300 font-bold mb-2">
                                    {controlFlowExamples[currentStep].description}
                                </h2>
                                <div className="h-1 w-20 bg-cyan-500/50 rounded-full"></div>
                            </div>
                            <pre className="bg-gray-900/50 p-6 rounded-xl text-xl overflow-auto mb-6">
                                <code className="text-green-400">
                                    {controlFlowExamples[currentStep].code}
                                </code>
                            </pre>
                            <div className="flex justify-end">
                                <button
                                    onClick={toggleExample}
                                    className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors text-lg flex items-center space-x-2"
                                >
                                    Close Example
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ControlFlowLoopDetails;
