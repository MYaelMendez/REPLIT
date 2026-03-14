/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Activity, Database, Settings, Box, Zap } from 'lucide-react';

export const RobotOSLeRobot: React.FC = () => {
    const [trainingProgress, setTrainingProgress] = useState(0);
    const [activeJoints, setActiveJoints] = useState([0, 0, 0, 0, 0, 0]);
    const [isLearning, setIsLearning] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            if (isLearning) {
                setTrainingProgress(prev => (prev + 0.5) % 100);
                setActiveJoints(prev => prev.map(() => Math.random() * 100));
            }
        }, 100);
        return () => clearInterval(interval);
    }, [isLearning]);

    return (
        <div className="w-full max-w-5xl h-full md:h-[600px] bg-[#050505] border border-white/10 md:rounded-xl overflow-hidden flex flex-col shadow-2xl shadow-orange-500/5">
            {/* Header: LeRobot Style */}
            <div className="h-12 border-b border-white/10 bg-white/5 flex items-center px-4 justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316]" />
                    <span className="text-[9px] md:text-[11px] font-bold tracking-[1px] md:tracking-[2px] text-white/80 uppercase truncate">Robotics · LeRobot</span>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                    <div className="hidden sm:flex items-center gap-2 px-2 py-1 rounded bg-white/5 border border-white/10">
                        <Activity size={12} className="text-orange-400" />
                        <span className="text-[9px] text-white/60 font-mono uppercase">Training</span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1 rounded bg-white/5 border border-white/10">
                        <Database size={12} className="text-blue-400" />
                        <span className="text-[9px] text-white/60 font-mono uppercase">HuggingRobot</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                {/* Left: Robot Visualization (Abstract) */}
                <div className="flex-1 bg-[#080808] p-4 md:p-8 flex flex-col items-center justify-center relative min-h-[300px]">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #f97316 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    </div>

                    <div className="relative w-48 h-48 md:w-64 md:h-64">
                        {/* Abstract Robot Arm Segments */}
                        {activeJoints.map((val, i) => (
                            <motion.div
                                key={i}
                                animate={{ 
                                    rotate: val - 50,
                                    scale: 1 + (val / 500)
                                }}
                                className="absolute inset-0 border border-orange-500/20 rounded-full"
                                style={{ 
                                    margin: `${i * (window.innerWidth < 768 ? 10 : 15)}px`,
                                    borderWidth: '2px',
                                    borderStyle: i % 2 === 0 ? 'solid' : 'dashed'
                                }}
                            />
                        ))}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Box size={32} md:size={48} className="text-orange-500 animate-pulse" />
                        </div>
                    </div>

                    <div className="mt-8 md:mt-12 grid grid-cols-6 gap-1 md:gap-2 w-full max-w-md">
                        {activeJoints.map((val, i) => (
                            <div key={i} className="space-y-1 md:space-y-2">
                                <div className="h-16 md:h-24 bg-white/5 rounded-full overflow-hidden relative border border-white/10">
                                    <motion.div 
                                        animate={{ height: `${val}%` }}
                                        className="absolute bottom-0 w-full bg-orange-500/50"
                                    />
                                </div>
                                <div className="text-[7px] md:text-[8px] font-mono text-white/30 text-center uppercase">J{i+1}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: End-to-End Learning Controls */}
                <div className="w-full md:w-80 bg-black border-t md:border-t-0 md:border-l border-white/10 p-4 md:p-6 flex flex-col space-y-6 md:space-y-8">
                    <div className="space-y-3 md:space-y-4">
                        <div className="flex items-center gap-2 text-white/40 uppercase tracking-[3px] text-[9px] font-bold">
                            <Cpu size={14} />
                            <span>End-to-End Learning</span>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-[9px] md:text-[10px] font-mono text-white/60">
                                <span>Policy Training</span>
                                <span>{trainingProgress.toFixed(1)}%</span>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                                <motion.div 
                                    animate={{ width: `${trainingProgress}%` }}
                                    className="h-full bg-orange-500 shadow-[0_0_10px_#f97316]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="hidden sm:block space-y-4">
                        <div className="text-[9px] text-white/40 uppercase tracking-[3px] font-bold">Model Parameters</div>
                        <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                            {[
                                { label: "Learning Rate", value: "1e-4" },
                                { label: "Batch Size", value: "64" },
                                { label: "Optimizer", value: "AdamW" },
                                { label: "Backbone", value: "ResNet-18" }
                            ].map((param, i) => (
                                <div key={i} className="flex items-center justify-between p-2 bg-white/5 rounded border border-white/5">
                                    <span className="text-[8px] md:text-[10px] text-white/40 uppercase">{param.label}</span>
                                    <span className="text-[8px] md:text-[10px] font-mono text-white/80">{param.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                        <div className="text-[9px] text-white/40 uppercase tracking-[3px] font-bold">Inference Evaluation</div>
                        <div className="p-3 md:p-4 bg-orange-500/5 border border-orange-500/20 rounded-xl space-y-2 md:space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-[9px] md:text-[10px] text-white/60">Success Rate</span>
                                <span className="text-[9px] md:text-[10px] font-mono text-emerald-400">94.2%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[9px] md:text-[10px] text-white/60">Latency</span>
                                <span className="text-[9px] md:text-[10px] font-mono text-orange-400">12ms</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-end">
                        <button 
                            onClick={() => setIsLearning(!isLearning)}
                            className={`w-full py-2.5 md:py-3 rounded-lg border font-bold text-[9px] md:text-[10px] tracking-[2px] uppercase transition-all flex items-center justify-center gap-2 ${
                                isLearning 
                                ? 'bg-orange-500 text-black border-orange-500 hover:bg-orange-600' 
                                : 'bg-transparent text-orange-500 border-orange-500/50 hover:bg-orange-500/10'
                            }`}
                        >
                            <Zap size={14} fill={isLearning ? "currentColor" : "none"} />
                            {isLearning ? 'Stop Training' : 'Start Training'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
