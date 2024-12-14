import React from 'react';
import { motion } from 'framer-motion';
import { Repeat, RefreshCw, ArrowRight } from 'lucide-react';
import burgerGif from '../../assets/burger-making-animation.gif';

const LoopsIntroPage = () => {
    const containerVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        initial: {
            y: 50,
            opacity: 0,
            scale: 0.9
        },
        animate: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    return (
        <div className=" flex flex-col items-center justify-center p-6 overflow-hidden text-white">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="text-center mb-12"
            >
                <h1 className="text-6xl font-bold bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
                    সি প্রোগ্রামিংয়ে লুপ
                </h1>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl w-full"
            >
                {/* Left Column - Animation */}
                <motion.div
                    variants={itemVariants}
                    className="flex justify-center items-center"
                >
                    <motion.div
                        className="relative group"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <motion.img
                            src={burgerGif}
                            alt="Burger making animation"
                            className="w-full h-auto max-h-[500px] object-contain rounded-2xl shadow-2xl"
                            initial={{ rotate: -5, opacity: 0.8 }}
                            animate={{
                                rotate: [0, 2, -2, 0],
                                transition: {
                                    repeat: Infinity,
                                    duration: 5
                                }
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.div>
                </motion.div>

                {/* Right Column - Content */}
                <motion.div
                    variants={itemVariants}
                    className="space-y-8 bg-white/10 backdrop-blur-lg p-10 rounded-3xl border border-white/20 shadow-2xl"
                >
                    <div className="space-y-6">
                        {[
                            {
                                icon: <Repeat className="text-blue-400" size={36} />,
                                text: "প্রোগ্রামিং এর ভাষায়, একটি লুপ হল একটি স্টেটমেন্ট যা একটি নির্দিষ্ট শর্তে না পৌঁছানো পর্যন্ত নির্দিষ্ট কোড ব্লককে স্বয়ংক্রিয়ভাবে বারবার সম্পাদন করতে দেয়।"
                            },
                            {
                                icon: <RefreshCw className="text-green-400" size={36} />,
                                text: "এটি জটিল এবং পুনরাবৃত্তিমূলক কাজগুলি অত্যন্ত সহজ এবং দ্রুত সম্পাদন করতে সাহায্য করে।"
                            },
                            {
                                icon: <ArrowRight className="text-purple-400" size={36} />,
                                text: "নির্দিষ্ট শর্ত পূরণ না হওয়া পর্যন্ত কোড ব্লকটি অবিরাম সম্পাদিত হয়।"
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="flex items-center space-x-5 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300"
                            >
                                {item.icon}
                                <p className="text-xl text-gray-200 flex-1">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default LoopsIntroPage;