import React, { useState, useEffect } from 'react';
import { CodeIcon, BookOpen, University, TrendingUp } from 'lucide-react';

const CoverPage = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="w-full h-screen flex items-center bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white relative overflow-hidden">
            <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                    background: `radial-gradient(
                        circle at ${mousePosition.x}px ${mousePosition.y}px, 
                        rgba(59, 130, 246, 0.3), 
                        transparent 50%
                    )`
                }}
            />

            {/* Left Side Visualization */}
            <div className="w-1/2 h-full flex items-center justify-center relative z-10 p-12">
                <div className="w-full h-[80%] rounded-3xl overflow-hidden shadow-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" className="w-full h-full">
                        <defs>
                            <linearGradient id="codeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="transparent"/>
                                <stop offset="100%" stopColor="transparent"/>
                            </linearGradient>
                        </defs>

                        {[
                            { y: 150, text: `#include<stdio.h>`, color: '#CCD6F6' },
                            { y: 200, text: `int main {`, color: '#CCD6F6' },
                            { y: 250, text: `    int sum = 0;`, color: '#A8B2D1' },
                            { y: 300, text: `    for(int i=0; i<10; i++) {`, color: '#64FFDA' },
                            { y: 350, text: `        sum = sum + i;`, color: '#CCD6F6' },
                            { y: 400, text: `    }`, color: '#A8B2D1' },
                            { y: 450, text: `    printf("%d", sum);`, color: '#A8B2D1' },
                            { y: 500, text: `    return 0;`, color: '#64FFDA' },
                            { y: 550, text: `}`, color: '#CCD6F6' }
                        ].map((item, index) => (
                            <g key={index} className="animate-pulse" transform={`translate(50, ${item.y})`}>
                                <text
                                    x="20" y="25"
                                    fill={item.color}
                                    fontFamily="monospace"
                                    fontSize="32"
                                >
                                    {item.text}
                                </text>
                            </g>
                        ))}

                        {/* Animated Connecting Lines with More Dynamic Animation */}
                        {/*<path*/}
                        {/*    d="M300,200 Q450,350 300,500"*/}
                        {/*    fill="none"*/}
                        {/*    stroke="#64FFDA"*/}
                        {/*    strokeWidth="3"*/}
                        {/*    strokeDasharray="20,20"*/}
                        {/*    className="animate-pulse opacity-50"*/}
                        {/*/>*/}
                    </svg>
                </div>
            </div>

            {/* Right Side Content */}
            <div className="w-1/2 pr-12">
                <div className="text-center space-y-8">
                    {/* Floating Icons with More Dynamic Hover Effect */}
                    <div className="flex items-center justify-center space-x-8">
                        {[
                            { Icon: University, color: 'text-cyan-400' },
                            { Icon: CodeIcon, color: 'text-green-400' },
                            { Icon: BookOpen, color: 'text-purple-400' },
                            { Icon: TrendingUp, color: 'text-rose-400' }
                        ].map(({ Icon, color }, index) => (
                            <div
                                key={index}
                                className={`
                                    ${color} 
                                    w-20 h-20 flex items-center justify-center 
                                    rounded-full border-2 border-transparent 
                                    hover:border-white/30 hover:bg-white/10 
                                    transition-all duration-500 
                                    transform hover:scale-125 hover:rotate-12
                                    shadow-lg hover:shadow-2xl
                                `}
                            >
                                <Icon className="w-10 h-10 transition-transform duration-300 group-hover:rotate-45" />
                            </div>
                        ))}
                    </div>

                    {/* Refined Typography and Layout */}
                    <div className="space-y-6">
                        <div className="text-xl font-medium tracking-widest text-blue-200 uppercase animate-pulse">
                            Information And Communication Technology
                        </div>

                        <div className="text-xl font-medium tracking-widest text-blue-200 uppercase animate-pulse">
                            Chapter 5: Programming Language
                        </div>
                        <div className="h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

                        {/* More Dynamic Title */}
                        <h1 className="
                            text-9xl font-black uppercase tracking-tighter
                            bg-clip-text text-transparent
                            bg-gradient-to-r from-cyan-300 via-blue-500 to-indigo-600
                            drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)]
                            hover:scale-105
                            transition-all duration-500
                        ">
                            Loops
                        </h1>
                        <div className="h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

                        {/* Enhanced Instructor Details */}
                        <div className="space-y-4">
                            <div className="text-3xl font-semibold text-white/70 tracking-widest uppercase">
                                Instructor
                            </div>
                            <div className="text-6xl font-bold text-cyan-300 tracking-wide animate-pulse">
                                Prottay Roy
                            </div>
                            <div className="text-2xl font-bold text-white/80 tracking-wide uppercase">
                                Computer Science And Engineering
                            </div>
                            <div className="text-xl opacity-60 tracking-wide uppercase">
                                North South University
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoverPage;