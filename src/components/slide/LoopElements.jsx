import React, { useState, useRef, useEffect } from 'react';
import { Target, Info, RefreshCw, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LoopElements = () => {
    const [activeElement, setActiveElement] = useState('initialization');
    const descriptionRef = useRef(null);

    const loopElements = {
        initialization: {
            icon: <Target className="text-cyan-500 w-12 h-12" />,
            title: 'Initialization',
            description: 'লুপ পরিচালনা করার জন্য এক বা একাধিক ভেরিয়েবল তৈরি বা সেট করা হয়।',
            details: [
                'সাধারণত লুপের আগে ডিক্লেয়ার করা হয়।',
                'Initialization শুধুমাত্র একবারই করা হয়।',
                'সাধারণত কাউন্টার বা সিরিজের প্রথম মান দেওয়া হয়।',
            ],
            codeExample: 'int i = 0;  // একটি এক লাইনের ইনিশিয়ালাইজেশন\n// অথবা, int i; \n i = 0;',
            gradient: 'from-cyan-500 to-blue-500'
        },
        condition: {
            icon: <Info className="text-emerald-500 w-12 h-12" />,
            title: 'Condition',
            description: 'কন্ডিশন হল এক গুরুত্বপূর্ণ চেকপয়েন্ট যা সিদ্ধান্ত নেয় লুপ কি চলবে নাকি থেমে যাবে।',
            details: [
                'Initialization এ তৈরি করা Variable এর উপর এমন কিছু শর্ত দেওয়া যার মাধ্যমে True/False ফলাফল পাওয়া যায়।',
                'লুপের প্রত্যেকবার পুনরাবৃত্তির পর Condition Check হবে। Condition সত্য(True) হলে লুপ চলবে এবং Condition মিথ্যা(False) হলে লুপ বন্ধ হয়ে যাবে।',
                'লুপ কখন শেষ হবে তার শর্ত দেওয়া হয়।',
            ],
            codeExample: 'i < 10;\ni > 100;',
            gradient: 'from-emerald-500 to-green-500'
        },
        body: {
            icon: <Code className="text-rose-500 w-12 h-12" />,
            title: 'Body',
            description: 'প্রতিবার পুনরাবৃত্তি করা লজিক যা লুপের মূল কাজ সম্পাদন করে।',
            details: [
                'কন্ডিশন সত্য(True) থাকাকালীন বারবার সম্পাদিত হয়।',
                'এক বা একাধিক Statement থাকতে পারে।',
                'সাধারণত পুনরাবৃত্তি কাজের মূল যুক্তি লেখা হয়।',
            ],
            codeExample: '{\n    printf("%d\\n", i);\n}',
            gradient: 'from-rose-500 to-pink-500'
        },
        update: {
            icon: <RefreshCw className="text-violet-500 w-12 h-12" />,
            title: 'Update',
            description: 'লুপ ভেরিয়েবলগুলি পরিবর্তন করে লুপ সমাপ্তির দিকে এগিয়ে নেওয়া।',
            details: [
                'লুপের প্রত্যেকবার পুনরাবৃত্তির সময় ভেরিয়েবলের মান পরিবর্তন করা হয়।',
                'সাধারণত Variable এর মান বাড়ানো বা কমানোর মাধ্যমে লুপকে সমাপ্তির দিকে এগিয়ে নেয়।',
                'লুপের প্রতিটি উপাদানের মধ্যে পার্থক্য দেওয়া হয়।',
            ],
            codeExample: 'i++;\ni--;\ni = i + 1;',
            gradient: 'from-violet-500 to-purple-500'
        }
    };

    useEffect(() => {
        if (descriptionRef.current) {
            descriptionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [activeElement]);

    return (
        <div className="w-full max-w-5xl mx-auto bg-gray-900 rounded-2xl shadow-2xl border-2 border-gray-800 overflow-hidden flex flex-col">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 border-b-2 border-gray-700 flex items-center"
            >
                <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                    Elements of Loop
                </h1>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3 border-b border-gray-800 bg-gray-850">
                {Object.keys(loopElements).map((element) => (
                    <button
                        key={element}
                        onClick={() => setActiveElement(element)}
                        className={`
                            flex flex-col items-center justify-center 
                            py-3 rounded-xl transition-all duration-300 
                            text-base group relative overflow-hidden
                            ${activeElement === element
                                ? 'bg-cyan-600/40 border-cyan-500/60 text-cyan-200'
                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            } 
                            border-2 shadow-xl`}
                    >
                        {activeElement === element && (
                            <div
                                className="absolute inset-0 bg-gradient-to-br opacity-20"
                                style={{
                                    backgroundImage: `linear-gradient(${loopElements[element].gradient})`
                                }}
                            />
                        )}
                        {loopElements[element].icon}
                        <span className="mt-1 text-xl font-bold relative z-10">
                            {loopElements[element].title}
                        </span>
                    </button>
                ))}
            </div>

            <div className="flex-grow overflow-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeElement}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        ref={descriptionRef}
                        className="p-5"
                    >
                        <div className="flex items-center mb-5">
                            {loopElements[activeElement].icon}
                            <h2 className="ml-4 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                                {loopElements[activeElement].title}
                            </h2>
                        </div>

                        <p className="text-gray-300 mb-5 text-2xl">
                            {loopElements[activeElement].description}
                        </p>

                        <div className="bg-gray-800 rounded-xl p-5 mb-5 border border-gray-700 shadow-xl">
                            <h3 className="text-3xl font-bold text-cyan-400 mb-4">
                                মূল বিষয়সমূহ
                            </h3>
                            <ul className="space-y-3 text-gray-200 text-xl">
                                {loopElements[activeElement].details.map((detail, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-start"
                                    >
                                        <span className="mr-3 text-cyan-500 text-xl">•</span>
                                        {detail}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-gray-900 rounded-xl p-5 border border-gray-800 shadow-xl">
                            <h3 className="text-3xl font-bold mb-4 text-emerald-400">
                                Example
                            </h3>
                            <pre className="text-gray-200 overflow-x-auto bg-gray-800 p-4 rounded-lg font-mono text-xl">
                                {loopElements[activeElement].codeExample}
                            </pre>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default LoopElements;