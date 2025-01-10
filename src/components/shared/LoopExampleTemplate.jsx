import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Layers, Repeat, RefreshCw } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Choose a theme

// Animation variants for different components
const animations = {
    container: {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                type: "spring",
                stiffness: 300,
                damping: 20,
                staggerChildren: 0.1
            }
        }
    },

    // Enhanced tab animations with sliding indicator
    tab: {
        inactive: {
            backgroundColor: 'transparent',
            color: 'rgb(148, 163, 184)',
            transition: { duration: 0.3 }
        },
        active: {
            color: 'white',
            scale: 1.05,
            transition: { duration: 0.3 }
        },
        hover: {
            color: 'rgb(226, 232, 240)',
            scale: 1.05,
            transition: { duration: 0.2 }
        }
    },

    // Sliding indicator for active tab
    indicator: {
        initial: { x: 0, opacity: 0 },
        animate: (index) => ({
            x: `${index * 100}%`,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 30
            }
        })
    },

    // Card animations with hover effects
    card: {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 25
            }
        },
        hover: {
            scale: 1.02,
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            borderColor: "rgba(255,255,255,0.4)",
            transition: { duration: 0.3, ease: "easeOut" }
        }
    },

    // Icon rotation animation
    icon: {
        initial: { rotate: 0 },
        hover: { rotate: 360, scale: 1.1 },
        tap: { scale: 0.95 }
    }
};

// Common styling classes
const styles = {
    card: `
    bg-slate-800/50 backdrop-blur-sm 
    border-4 border-white/10
    rounded-2xl p-6 
    transition-all duration-300
    flex flex-col justify-between
    shadow-lg
  `,
    codeBlock: `
    bg-slate-800/50 backdrop-blur-sm
    text-emerald-400
    p-8 text-2xl
    font-mono leading-relaxed
    overflow-x-auto max-h-[600px]
    rounded-xl border-4 border-white/10
    shadow-lg
  `
};

const LoopExampleTemplate = ({ loopTypes }) => {
    const [activeTab, setActiveTab] = useState('fordetail');
    const [isHovering, setIsHovering] = useState(null);

    // Enhanced tab navigation component
    const TabNavigation = () => {
        const tabIndex = Object.keys(loopTypes).indexOf(activeTab);

        return (
            <div className="relative border-b border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
                <div className="flex">
                    {Object.keys(loopTypes).map((loop, index) => {
                        const LoopIcon = loopTypes[loop].icon;
                        return (
                            <motion.button
                                key={loop}
                                variants={animations.tab}
                                initial="inactive"
                                animate={activeTab === loop ? "active" : "inactive"}
                                whileHover="hover"
                                custom={loopTypes[loop]}
                                onClick={() => setActiveTab(loop)}
                                className={`flex-1 py-6 text-lg font-semibold flex items-center justify-center gap-3 relative z-10 
                                    ${activeTab === loop ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
                            >
                                <motion.div
                                    variants={animations.icon}
                                    initial="initial"
                                    whileHover="hover"
                                    whileTap="tap"
                                    transition={{ duration: 0.4 }}
                                >
                                    <LoopIcon className="w-6 h-6" />
                                </motion.div>
                                {loopTypes[loop].title}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Animated background indicator */}
                <motion.div
                    variants={animations.indicator}
                    initial="initial"
                    animate="animate"
                    custom={tabIndex}
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    style={{
                        width: `${100 / Object.keys(loopTypes).length}%`,
                    }}
                />
            </div>
        );
    };

    // Component card for detailed view
    const ComponentCard = ({ component, index }) => (
        <motion.div
            key={index}
            variants={animations.card}
            whileHover="hover"
            className={`${styles.card} ${index < 3 ? 'h-48' : 'h-96'}`} // Adjusted height for first row and second row
        >
            <div className="flex justify-between items-center">
                <div className="text-lg font-bold text-white/90">{component.label}</div>
                <motion.div
                    variants={animations.icon}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                >
                    <Layers className="w-6 h-6 text-slate-400" />
                </motion.div>
            </div>
            <div className="text-slate-300 mt-4 leading-relaxed">
                {component.description}
            </div>
        </motion.div>
    );

    // Main content area with conditional rendering
    const ContentArea = () => (
        <AnimatePresence mode="wait">
            {activeTab === 'fordetail' ? (
                <motion.div
                    key="fordetail"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="bg-slate-900 p-12"
                >
                    {/* Grid of component cards */}
                    <div className="grid grid-cols-3 gap-8 mb-8">
                        {loopTypes.fordetail.components.slice(0, 3).map((component, index) => (
                            <ComponentCard key={index} component={component} index={index} />
                        ))}
                    </div>

                    {/* Footer card with code example */}
                    <motion.div
                        variants={animations.card}
                        whileHover="hover"
                        className="grid grid-cols-1 gap-6"
                    >
                        <div className={`${styles.card} p-12 h-96`}> {/* Adjusted height for the second row */}
                            <div className="flex justify-between items-center pb-8 border-b border-slate-700/30">
                                <div className="text-2xl font-bold text-white/90">
                                    {loopTypes.fordetail.components[3].label}
                                </div>
                                <motion.div
                                    variants={animations.icon}
                                    initial="initial"
                                    whileHover="hover"
                                    whileTap="tap"
                                    className="p-3 bg-slate-700/30 rounded-xl"
                                >
                                    <Code className="w-8 h-8 text-slate-300" />
                                </motion.div>
                            </div>
                            <div className="text-slate-300 mt-8 leading-relaxed text-lg space-y-32">
                                {loopTypes.fordetail.components[3].description}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            ) : (
                // Code view for other tabs
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    className="bg-slate-900 p-12"
                >
                    <SyntaxHighlighter
                        language="c"
                        style={tomorrow} // Use the "tomorrow" theme
                        customStyle={{
                            background: 'transparent',
                            fontSize: '1.25rem',
                            lineHeight: '1.75',
                            padding: '2rem',
                            borderRadius: '0.75rem',
                            border: '4px solid rgba(255, 255, 255, 0.1)',
                        }}
                    >
                        {loopTypes[activeTab].code}
                    </SyntaxHighlighter>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <motion.div
            variants={animations.container}
            initial="hidden"
            animate="visible"
            className="w-full max-w-6xl bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-700/50"
        >
            <TabNavigation />
            <ContentArea />
        </motion.div>
    );
};

export default LoopExampleTemplate;