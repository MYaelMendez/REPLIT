/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect, useRef } from 'react';
import { mech } from '../services/MechCore';

export const RobotOSSigil: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [drawing, setDrawing] = useState(false);
    const [entropy, setEntropy] = useState(0);
    const [strokesCount, setStrokesCount] = useState(0);

    const INK = ['#cd853f', '#ffd700', '#8b4513', '#fcd34d', '#cd853f', '#ffd700', '#8b4513'];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            const parent = canvas.parentElement;
            if (!parent) return;
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
        };
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    const startDrawing = (e: React.PointerEvent) => {
        setDrawing(true);
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.strokeStyle = INK[Math.floor(Math.random() * INK.length)];
        ctx.lineWidth = 2;
        ctx.shadowBlur = 5;
        ctx.shadowColor = ctx.strokeStyle + '44';
    };

    const draw = (e: React.PointerEvent) => {
        if (!drawing) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.lineTo(x, y);
        ctx.stroke();

        const newEntropy = (entropy ^ (Math.floor(x) * 53) ^ (Math.floor(y) * 17)) >>> 0;
        setEntropy(newEntropy);
        mech.setTable('sigil/entropy', [{ value: newEntropy, x, y }]);
    };

    const stopDrawing = () => {
        if (!drawing) return;
        setDrawing(false);
        setStrokesCount(prev => prev + 1);
        // Advance chain on stroke
        mech.commit([{
            table: 'system/chain',
            op: 'append',
            data: [{ op: 'SIGIL_STROKE', entropy, timestamp: Date.now() }]
        }]);
    };

    const sealSigil = async () => {
        if (strokesCount === 0) return;
        mech.commit([{
            table: 'sigil/sealed',
            op: 'set',
            data: [{ entropy, timestamp: Date.now(), strokes: strokesCount }]
        }, {
            table: 'system/chain',
            op: 'append',
            data: [{ op: 'SIGIL_SEAL', entropy, timestamp: Date.now() }]
        }]);
        // Clear canvas
        const ctx = canvasRef.current?.getContext('2d');
        ctx?.clearRect(0, 0, canvasRef.current?.width || 0, canvasRef.current?.height || 0);
        setStrokesCount(0);
        setEntropy(0);
    };

    return (
        <div className="w-full max-w-md flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-[#cd853f33] pb-2">
                <div className="text-[10px] font-bold tracking-[4px] text-[#cd853f] uppercase">SIGIL RITUAL 🜁</div>
                <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#cd853f] animate-pulse" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#cd853f44]" />
                </div>
            </div>

            <div className="relative aspect-square bg-black/40 border border-[#cd853f22] backdrop-blur-xl overflow-hidden cursor-crosshair">
                <canvas 
                    ref={canvasRef}
                    onPointerDown={startDrawing}
                    onPointerMove={draw}
                    onPointerUp={stopDrawing}
                    onPointerLeave={stopDrawing}
                    className="absolute inset-0 w-full h-full touch-none"
                />
                {strokesCount === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center text-[#cd853f11] text-[10px] tracking-[4px] uppercase pointer-events-none">
                        Invoke your sigil…
                    </div>
                )}
            </div>

            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <div className="text-[8px] tracking-[2px] text-[#cd853f66] uppercase">PROVENANCE</div>
                    <div className="text-[14px] font-bold tracking-[4px] text-[#ffd700]">
                        0x{entropy.toString(16).toUpperCase().padStart(8, '0')}
                    </div>
                </div>
                <button 
                    onClick={sealSigil}
                    className="bg-[#cd853f] text-black font-bold px-6 py-3 rounded-sm text-[10px] hover:bg-[#ffd700] transition-all uppercase tracking-[2px]"
                >
                    SEAL & INVOKE
                </button>
            </div>
        </div>
    );
};

const stateLayers = ['Prima Materia', 'Solve et Coagula', 'Nigredo', 'Albedo', 'Citrinitas', 'Rubedo', 'Multiplicatio'];
