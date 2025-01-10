import React, { useState } from 'react';
import { Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ForLoopDetails = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const forLoopSteps = [
        {
            description: "The anatomy of a For Loop!",
            code: "for (initialization; condition; update) {\n   Loop's body\n}"
        },
        {
            description: "Initialization: Setting the Starting Point",
            code: "for (int i = 1; condition; update) {\n   Loop's body\n}"
        },
        {
            description: "Condition: Deciding When to Stop",
            code: "for (int i = 1; i <= 5; update) {\n  loop's body\n}"
        },
        {
            description: "Update: Changing the Loop Variable",
            code: "for (int i = 1; i <= 5; i++) {\n  loop's body\n}"
        },
        {
            description: "Loop Body: The Code that Repeats",
            code: "for (int i = 1; i <= 5; i++) {\n  printf(\"%d\\n\", i);\n}"
        },
        {
            description: "Complete For Loop Example in C",
            code: "#include <stdio.h>\n\nint main() {\n  for (int i = 1; i <= 5; i++) {\n    printf(\"%d\\n\", i);\n  }\n  return 0;\n}"
        }
    ];

    const handleNext = () => {
        setCurrentStep((prev) =>
            prev < forLoopSteps.length - 1 ? prev + 1 : prev
        );
    };

    const handlePrevious = () => {
        setCurrentStep((prev) =>
            prev > 0 ? prev - 1 : prev
        );
    };

    return (
        <div className="min-h-screen-900 flex flex-col items-center justify-center p-4">
            <div className="bg-gray-800 shadow-2xl rounded-2xl p-8 max-w-4xl w-full overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center mb-8"
                >
                    <Code className="mr-4 w-12 h-12 text-cyan-500" />
                    <h1 className="text-5xl font-bold text-white">For Loop Explorer</h1>
                </motion.div>

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
                            {forLoopSteps[currentStep].description}
                        </p>
                        <pre className="bg-gray-700 p-6 rounded-xl text-2xl overflow-auto mb-6">
                            <code className="text-cyan-200">
                                {forLoopSteps[currentStep].code}
                            </code>
                        </pre>
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
                        onClick={handleNext}
                        disabled={currentStep === forLoopSteps.length - 1}
                        className="bg-cyan-600 text-white px-8 py-4 rounded-lg
                        disabled:bg-gray-600 disabled:cursor-not-allowed
                        text-2xl font-bold transition"
                    >
                        Next
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default ForLoopDetails;