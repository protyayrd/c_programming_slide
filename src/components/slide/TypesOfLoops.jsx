import React, { useState } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Code,
    Repeat,
    Server,
    Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TypesOfLoops = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(0);

    const slides = [
        {
            title: "Types of Loops in C",
            content: (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <div className="grid grid-cols-3 gap-12">
                        {[
                            {
                                icon: <Repeat className="w-24 h-24 text-cyan-300 mx-auto mb-8" />,
                                title: "For Loop",
                                number: "01"
                            },
                            {
                                icon: <Server className="w-24 h-24 text-cyan-300 mx-auto mb-8" />,
                                title: "While Loop",
                                number: "02"
                            },
                            {
                                icon: <Database className="w-24 h-24 text-cyan-300 mx-auto mb-8" />,
                                title: "Do-While Loop",
                                number: "03"
                            }
                        ].map((loop) => (
                            <motion.div
                                key={loop.title}
                                whileHover={{ scale: 1.05 }}
                                className="bg-gradient-to-br from-gray-800 to-gray-900 p-10 rounded-3xl text-center relative overflow-hidden group shadow-2xl border border-cyan-800/30"
                            >
                                <motion.div
                                    className="absolute top-4 left-4 text-8xl font-bold text-cyan-900/20 opacity-50 group-hover:opacity-75 transition-opacity duration-300"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 0.5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {loop.number}
                                </motion.div>
                                {loop.icon}
                                <h3 className="text-3xl font-bold text-cyan-200 mb-4 mt-6">
                                    {loop.title}
                                </h3>
                                <motion.div
                                    className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"
                                ></motion.div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )
        },
        {
            title: "For Loop in C",
            descriptions: [
                "আগে থেকে নির্ধারিত পুনরাবৃত্তির সংখ্যা জানা থাকলে ব্যবহৃত হয়।",
                "Initialization, Condition, এবং Update এর সমন্বয়ে গঠিত।",
                "সাধারণত একটি নির্দিষ্ট সংখ্যক পুনরাবৃত্তির জন্য ব্যবহৃত হয়।"
            ],
            code: `for (initialization; condition; update) {
     loop's body
}`
        },
        {
            title: "While Loop in C",
            descriptions: [
                "একটি শর্ত সত্য থাকা পর্যন্ত কোড ব্লক সম্পাদন করে।",
                "শুধুমাত্র Condition নিয়ে গঠিত।",
                "প্রতিবার পুনরাবৃত্তির আগে শর্ত পরীক্ষা করে।"
            ],
            code: `while (condition) {
     loop's body
}`
        },
        {
            title: "Do-While Loop in C",
            descriptions: [
                "নিশ্চিত করে যে কোড ব্লক কমপক্ষে একবার সম্পাদিত হয়।",
                "শুধুমাত্র Condition নিয়ে গঠিত।",
                "প্রতিবার পুনরাবৃত্তির পরে শর্ত পরীক্ষা করে। তাই বের হওয়ার আগে ব্লকটি অবশ্যই চলবে।"
            ],
            code: `do {
     loop's body
} while (condition);`
        }
    ];

    const nextSlide = () => {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl border border-cyan-800/30 overflow-hidden"
            >
                <div className="p-12">
                    <motion.h1
                        key={currentSlide}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-4xl font-bold mb-10 text-center text-cyan-200 tracking-wide"
                    >
                        {slides[currentSlide].title}
                    </motion.h1>

                    <AnimatePresence mode="wait">
                        {currentSlide === 0 ? (
                            <motion.div
                                key="slide-0"
                                initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                                transition={{ duration: 0.5 }}
                            >
                                {slides[currentSlide].content}
                            </motion.div>
                        ) : (
                            <motion.div
                                key={`slide-${currentSlide}`}
                                initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                                transition={{ duration: 0.5 }}
                            >
                                <ul className="space-y-6 mb-8">
                                    {slides[currentSlide].descriptions.map((point, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.2 }}
                                            className="flex items-start text-xl"
                                        >
                                            <Code className="mr-3 mt-1 text-cyan-500 flex-shrink-0" size={24} />
                                            <span className="text-gray-300">{point}</span>
                                        </motion.li>
                                    ))}
                                </ul>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                    className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-xl"
                                >
                                    <pre className="text-xl text-green-300 overflow-x-auto">
                                        <code>{slides[currentSlide].code}</code>
                                    </pre>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex justify-between bg-gray-900 p-6 border-t border-cyan-800/30">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={prevSlide}
                        className="flex items-center text-cyan-300 hover:text-cyan-100 transition-colors bg-gray-800 px-6 py-3 rounded-xl"
                    >
                        <ChevronLeft className="mr-2" />
                        Previous
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={nextSlide}
                        className="flex items-center text-cyan-300 hover:text-cyan-100 transition-colors bg-gray-800 px-6 py-3 rounded-xl"
                    >
                        Next
                        <ChevronRight className="ml-2" />
                    </motion.button>
                </div>
            </motion.div>
    );
};

export default TypesOfLoops;