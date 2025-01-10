import React, { useState, useRef, useEffect } from 'react';
import { Target, Info, RefreshCw, Code, Repeat } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LoopElements = () => {
    const [activeElement, setActiveElement] = useState('initialization');
    const descriptionRef = useRef(null);

    const loopElements = {
        initialization: {
            icon: <Target className="text-cyan-500 w-12 h-12" />,
            title: 'Initialization',
            description: 'লুপ পরিচালনা করার জন্য এক বা একাধিক ভেরিয়েবল তৈরি বা সেট করা হয় যেখান থেকে লুপ শুরু হবে।',
            details: [
                'সাধারণত আমরা একটি ভ্যারিয়েবল নিয়ে শুরু করি, যেমন: int i = 0 যেটি গণনা শূন্য থেকে শুরু করবে।',
                'এই শুরুর মান শুধুমাত্র একবারই সেট করা হয়।',
                'সাধারণত কাউন্টার বা সিরিজের প্রথম মান দেওয়া হয়।',
                'যেকোনো সংখ্যা দিয়ে শুরু করা যায়, যেমন: 1, 5, 10 - যেখান থেকে আমরা গণনা শুরু করবো।',
            ],
            codeExample: '// শূন্য থেকে শুরু\nint i = 0;\n// একক সংখ্যা থেকে শুরু\nint i = 1;\n// দশ থেকে শুরু\nint i = 10;',
            gradient: 'from-cyan-500 to-blue-500'
        },
        condition: {
            icon: <Info className="text-emerald-500 w-12 h-12" />,
            title: 'Condition',
            description: 'Condition হল একটি চেক পয়েন্ট - যেটা বলে দেয় লুপ আরও চলবে কি চলবে না।',
            details: [
                'প্রতিটি Iteration এ একটি প্রশ্ন করা হয়: "আমি কি আরও চলতে পারব?" - উত্তর হ্যাঁ হলে লুপ চলবে, না হলে থেমে যাবে।',
                'যেমন: i < 5 মানে হল - "5 এর কম পর্যন্ত চলতে থাকব"।',
                'সহজ তুলনা ব্যবহার করা হয়: ছোট (<), বড় (>), সমান (==), ছোট বা সমান (<=), বড় বা সমান (>=)।',
                'লুপ কখন শেষ হবে তার শর্ত বা সিরিজের শেষ মান দেওয়া হয়।',
            ],
            codeExample: '// পাঁচের কম পর্যন্ত চলবে\ni < 5;\n// দশের সমান বা কম পর্যন্ত\ni <= 10;\n// শূন্যের বড় পর্যন্ত\ni > 0;',
            gradient: 'from-emerald-500 to-green-500'
        },
        iteration: {
            icon: <Repeat className="text-amber-500 w-12 h-12" />,
            title: 'Iteration',
            description: 'Iteration মানে হল পুনরাবৃত্তি - একই কাজ বারবার করা, কিন্তু প্রতিবার একটু পরিবর্তন সহ।',
            details: [
                'Condition Check -> Loop\'s Body -> Update -> Condition Check নিয়ে একটি Interation সম্পন্ন হয়।',
                'প্রতিবার লুপ চলার সময় নতুন কিছু ঘটে, যেমন নতুন নাম্বার প্রিন্ট হয় বা নতুন হিসাব হয়।',
                'যেমন: 1 থেকে 5 পর্যন্ত গুনতে হলে আমরা বলব - "1, তারপর 2, তারপর 3..."',
                'এটি চলতে থাকে যতক্ষণ না আমাদের condition মিথ্যা হয়।',
            ],
            codeExample: '// 1 থেকে 5 পর্যন্ত প্রিন্ট\nfor(int i = 1; i <= 5; i++) {\n    printf("%d\\n", i);\n}\n\n// নাম্বার যোগ করা\nsum = 0;\nfor(int i = 1; i <= 3; i++) {\n    sum = sum + i;\n}',
            gradient: 'from-amber-500 to-orange-500'
        },
        body: {
            icon: <Code className="text-rose-500 w-12 h-12" />,
            title: 'Body',
            description: 'Body হল লুপের মূল কাজ - যে কাজটি আমরা বারবার করতে চাই।',
            details: [
                'এখানে আমরা লিখি কী কাজ বারবার করতে চাই, যেমন কোন নাম্বার প্রিন্ট করা।',
                'এখানে এক বা একাধিক কাজ করা যায়, যেমন প্রিন্ট করা এবং যোগ করা একসাথে।',
                'Body এর কাজ শেষ হলে আবার condition চেক করে নতুন iteration শুরু হয়।',
                'কন্ডিশন সত্য(True) থাকাকালীন বারবার সম্পাদিত হয় এবং কন্ডিশন মিথ্যা(False) হলে সম্পাদন হয় না।'
            ],
            codeExample: '{\n    // নাম্বার প্রিন্ট করা\n    printf("%d\\n", i);\n    \n    // যোগ করা\n    sum = sum + i;\n    \n    // মেসেজ দেখানো\n    printf("Step %d complete\\n", i);\n}',
            gradient: 'from-rose-500 to-pink-500'
        },
        update: {
            icon: <RefreshCw className="text-violet-500 w-12 h-12" />,
            title: 'Update',
            description: 'Update মানে হল পরিবর্তন - প্রতি iteration শেষে কিছু একটা পরিবর্তন করা।',
            details: [
                'সাধারণত Variable এর মান বাড়ানো বা কমানোর মাধ্যমে লুপকে সমাপ্তির দিকে এগিয়ে নেয়।',
                'বিভিন্নভাবে পরিবর্তন করা যায়: এক এক করে (i++), দুই দুই করে (i = i + 2)।',
                'Update না করলে লুপ একই জায়গায় ঘুরতে থাকবে, তাই এটি খুবই গুরুত্বপূর্ণ।',
                'লুপের প্রতিটি উপাদানের মধ্যে পার্থক্য দেওয়া হয়।'
            ],
            codeExample: '// এক এক করে বাড়ানো\ni++;\n// এক এক করে কমানো\ni--;\n// দুই দুই করে বাড়ানো\ni = i + 2;',
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
                    লুপের মূল অংশসমূহ
                </h1>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 p-3 border-b border-gray-800 bg-gray-850">
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
                                উদাহরণ
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