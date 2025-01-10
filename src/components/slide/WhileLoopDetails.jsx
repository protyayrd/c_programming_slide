import React, { useState } from 'react';
import { Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WhileLoopDetails = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const whileLoopSteps = [
        {
            description: "The anatomy of a While Loop!",
            code: "while(condition){\n\\\\Loop's body\n}"
        },
        {
            description: "Initialization: Setting the Starting Point",
            code: "int i = 1;\nwhile(condition) {\n\\\\Loop's body\n}",
            explanation: "We create a variable 'i' and set its initial value to 1. This is where our counting begins."
        },
        {
            description: "Condition: Deciding When to Stop",
            code: "int i = 1;\nwhile(i <= 5) {\n\\\\Loop's body\n}",
            explanation: "The loop will keep running as long as 'i' is less than or equal to 5. This determines how many times the loop will execute."
        },
        {
            description: "Loop Body: The Code that Repeats",
            code: "int i = 1;\nwhile(i <= 5) {\n  printf(\"%d\\n\", i);\n}",
            explanation: "Inside the loop body, we print the current value of 'i'. This is the action repeated for each iteration."
        },
        {
            description: "Update: Changing the Loop Variable",
            code: "int i = 1;\nwhile(i <= 5) {\n  printf(\"%d\\n\", i);\n  i++;\n}",
            explanation: "We increase 'i' by 1 after each iteration. This ensures we eventually exit the loop when 'i' becomes 6."
        },
        {
            description: "Complete While Loop Example in C",
            code: "#include <stdio.h>\n\nint main() {\n  int i = 1;\n  while (i <= 5) {\n    printf(\"%d\\n\", i);\n    i++;\n  }\n  return 0;\n}",
            explanation: "This complete program will print numbers 1, 2, 3, 4, and 5 on separate lines."
        }
    ];

    const handleNext = () => {
        setCurrentStep((prev) =>
            prev < whileLoopSteps.length - 1 ? prev + 1 : prev
        );
    };

    const handlePrevious = () => {
        setCurrentStep((prev) =>
            prev > 0 ? prev - 1 : prev
        );
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="bg-gray-800 shadow-2xl rounded-2xl p-8 max-w-4xl w-full overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center mb-8"
                >
                    <Code className="mr-4 w-12 h-12 text-cyan-500" />
                    <h1 className="text-5xl font-bold text-white">While Loop Explorer</h1>
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
                        {whileLoopSteps[currentStep].title && (
                            <h2 className="text-3xl text-cyan-400 mb-4">
                                {whileLoopSteps[currentStep].title}
                            </h2>
                        )}
                        <p className="text-cyan-300 mb-6 text-[44px] font-semibold">
                            {whileLoopSteps[currentStep].description}
                        </p>
                        <pre className="bg-gray-700 p-6 rounded-xl text-2xl overflow-auto mb-6">
                            <code className="text-cyan-200">
                                {whileLoopSteps[currentStep].code}
                            </code>
                        </pre>
                        {whileLoopSteps[currentStep].explanation && (
                            <p className="text-white text-xl">
                                {whileLoopSteps[currentStep].explanation}
                            </p>
                        )}
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
                        disabled={currentStep === whileLoopSteps.length - 1}
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

export default WhileLoopDetails;