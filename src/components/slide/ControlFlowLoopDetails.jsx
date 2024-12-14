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
            code: "for (initialization; condition; update) {\n    if (another condition) {\n        // Code to execute if condition is true\n    }\n}",
        },
        {
            description: "Basic If-Else Statement Structure",
            code: "if (condition) {\n    // Code to execute if condition is true\n} else {\n    // Code to execute if condition is false\n}",
            explanation: "If-else provides two execution paths:\n- First block executes if condition is true\n- Alternate block executes if condition is false\n- Enables binary decision-making"
        },
        {
            description: "If-Else in For Loop",
            code: "for (initialization; condition; update) {\n    if (another condition) {\n        // Code to execute if condition is true\n    } else {\n        // Code to execute if condition is false\n    }\n}",
        },
        {
            description: "If-Else Ladder Structure",
            code: "if (condition1) {\n    // Code to execute if condition1 is true\n} else if (condition2) {\n    Code to execute if condition2 is true\n} else if (condition3) {\n    Code to execute if condition3 is true\n} else {\n    Code to execute if all condition is false\n}",
            explanation: "If-else ladder allows multiple condition checks:\n- Checks conditions sequentially\n- Executes first matching condition block\n- Provides default fallback option"
        },
        {
            description: "If-Else Ladder in For Loop",
            code: "for (initialization; condition; update) {\n     if (condition1) {\n    // Code to execute if condition1 is true\n} else if (condition2) {\n    Code to execute if condition2 is true\n} else if (condition3) {\n    Code to execute if condition3 is true\n} else {\n    Code to execute if all condition is false\n}",
        },
        {
            description: "Continue Statement Structure",
            code: "for (int i = 0; i < 10; i++) {\n    if (condition) {\n        continue;  // Skip remaining loop body\n    }\n    // Remaining code\n}",
            explanation: "Continue statement:\n- Skips remaining code in current iteration\n- Moves to next loop iteration immediately\n- Useful for filtering or selective processing"
        },
        {
            description: "Continue in For Loop",
            code: "for (int i = 0; i < 10; i++) {\n    if (i % 2 == 0) {\n        continue;  // Skip even numbers\n    }\n    // Process only odd numbers\n}",
            explanation: "Continue within loop iteration:\n- Selectively skips specific iterations\n- Allows precise control over loop execution\n- Filters data during iteration"
        },
        {
            description: "Break Statement Structure",
            code: "for (int i = 0; i < 10; i++) {\n    if (condition) {\n        break;  // Exit loop entirely\n    }\n    // Remaining code\n}",
            explanation: "Break statement:\n- Immediately terminates loop\n- Exits loop regardless of original termination condition\n- Useful for early loop termination"
        },
        {
            description: "Break in For Loop",
            code: "for (int i = 0; i < 100; i++) {\n    if (i > 50) {\n        break;  // Stop at 50\n    }\n    // Process numbers until 50\n}",
            explanation: "Break within loop iteration:\n- Provides early exit mechanism\n- Stops processing when specific condition met\n- Helps in searching or conditional termination"
        }
    ];

    const controlFlowExamples = [
        {
            code: "#include <stdio.h>\n\nint main() {\n    int x = 10;\n    if (x > 5) {\n        printf(\"x is greater than 5\");\n    }\n    return 0;\n}"
        },
        {
            code: "#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 10; i++) {\n        if (i % 2 == 0) {\n            printf(\"%d, \", i);\n        }\n    }\n    return 0;\n}"
        },
        {
            code: "#include <stdio.h>\n\nint main() {\n    int x = 7;\n    if (x % 2 == 0) {\n        printf(\"Even\");\n    } else {\n        printf(\"Odd\");\n    }\n    return 0;\n}"
        },
        {
            code: "#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 10; i++) {\n        if (i % 2 == 0) {\n            printf(\"Even: %d \", i);\n        } else {\n            printf(\"Odd: %d \", i);\n        }\n    }\n    return 0;\n}"
        },
        {
            code: "#include <stdio.h>\n\nint main() {\n    int x = 75;\n    if (x >= 90) {\n        printf(\"A Grade\");\n    } else if (x >= 80) {\n        printf(\"B Grade\");\n    } else if (x >= 70) {\n        printf(\"C Grade\");\n    } else {\n        printf(\"Fail\");\n    }\n    return 0;\n}"
        },
        {
            code: "#include <stdio.h>\n\nint main() {\n    for (int score = 60; score <= 100; score += 10) {\n        if (score >= 90) {\n            printf(\"%d: A Grade\\n\", score);\n        } else if (score >= 80) {\n            printf(\"%d: B Grade\\n\", score);\n        } else if (score >= 70) {\n            printf(\"%d: C Grade\\n\", score);\n        } else {\n            printf(\"%d: Fail\\n\", score);\n        }\n    }\n    return 0;\n}"
        },
        {
            code: "#include <stdio.h>\n\nint main() {\n    for (int i = 0; i < 10; i++) {\n        if (i == 5) {\n            continue;\n        }\n        printf(\"%d \", i);\n    }\n    return 0;\n}"
        },
        {
            code: "#include <stdio.h>\n\nint main() {\n    for (int i = 0; i < 10; i++) {\n        if (i % 2 == 0) {\n            continue;\n        }\n        printf(\"Odd: %d \", i);\n    }\n    return 0;\n}"
        },
        {
            code: "#include <stdio.h>\n\nint main() {\n    for (int i = 0; i < 10; i++) {\n        if (i == 6) {\n            break;\n        }\n        printf(\"%d \", i);\n    }\n    return 0;\n}"
        },
        {
            code: "#include <stdio.h>\n\nint main() {\n    for (int i = 0; i < 100; i++) {\n        if (i > 50) {\n            break;\n        }\n        printf(\"%d \", i);\n    }\n    return 0;\n}"
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
                        >
                            <h2 className="text-3xl text-cyan-300 mb-6 font-bold">
                                {controlFlowExamples[currentStep].description}
                            </h2>
                            <pre className="bg-gray-700 p-6 rounded-xl text-4xl overflow-auto text-green-300">
                                <code>
                                    {controlFlowExamples[currentStep].code}
                                </code>
                            </pre>

                        </motion.div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ControlFlowLoopDetails;
