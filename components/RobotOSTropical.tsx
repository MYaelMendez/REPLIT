/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect, useRef } from 'react';
import { mech } from '../services/MechCore';

const surfaces = [
    { op: '#️⃣', name: 'æl.net', href: 'https://xn--l-1ga.net' },
    { op: 'ℹ️', name: 'æææ.com', href: 'https://xn--6caaa.com' },
    { op: '🛬', name: 'arrival', href: 'https://xn--6caaa.com/arrival' },
    { op: '🚶', name: 'yæl.com', href: 'https://xn--yl-1ia.com' },
    { op: '🔐', name: 'privateclient.ai', href: 'https://privateclient.ai' },
    { op: '🎓', name: 'neuromitosis.com', href: 'https://neuromitosis.com' },
    { op: '🏛️', name: 'molt.school', href: 'https://molt.school' },
    { op: '🌍', name: 'molt.earth', href: 'https://molt.earth' },
    { op: '🧰', name: 'llm.store', href: 'https://llm.store' },
    { op: '>_', name: 'commandprompt.ai', href: 'https://commandprompt.ai' },
    { op: '🎞️', name: 'aipodcast.me', href: 'https://aipodcast.me' },
    { op: '🍊', name: 'daollc.ai', href: 'https://daollc.ai' },
    { op: '✝️', name: 'teologia.ai', href: 'https://teologia.ai' },
    { op: '📺', name: 'teologia.org', href: 'https://teologia.org' },
    { op: '📖', name: 'soværeign.com', href: 'https://xn--sovreign-n2a.com' },
    { op: '🧬', name: 'moltcontextprotocol.com', href: 'https://moltcontextprotocol.com' },
    { op: '🧬', name: 'moltcontextprotocol.net', href: 'https://moltcontextprotocol.net' },
    { op: '🧬', name: 'moltcontextprotocol.org', href: 'https://moltcontextprotocol.org' }
];

export const RobotOSTropical: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [cur, setCur] = useState(0);
    const [chainHead, setChainHead] = useState('genesis');
    const [sigilHash, setSigilHash] = useState(0);

    const len = surfaces.length;
    const CX = 150, CY = 150, R = 110;

    useEffect(() => {
        const unsubscribe = mech.subscribe((name) => {
            if (name === 'sigil/entropy') {
                const table = mech.getTable('sigil/entropy');
                if (table.length > 0) setSigilHash(Number(table[0].value));
            }
            if (name === 'system/chain') {
                const table = mech.getTable('system/chain');
                if (table.length > 0) setChainHead(String(table[0].head).slice(0, 16));
            }
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const draw = () => {
            ctx.clearRect(0, 0, 300, 300);
            
            // Entropy Ring
            ctx.beginPath();
            ctx.arc(CX, CY, R + 10, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(205,133,63,0.05)';
            ctx.lineWidth = 1;
            ctx.stroke();

            if (sigilHash) {
                const arc = (sigilHash % 1000) / 1000 * Math.PI * 2;
                ctx.beginPath();
                ctx.arc(CX, CY, R + 10, -Math.PI / 2, -Math.PI / 2 + arc);
                ctx.strokeStyle = '#cd853f44';
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            // Main Ring
            ctx.beginPath();
            ctx.strokeStyle = '#cd853f22';
            ctx.lineWidth = 1;
            ctx.arc(CX, CY, R, 0, Math.PI * 2);
            ctx.stroke();

            // Icons
            for (let i = 0; i < len; i++) {
                const a = -Math.PI / 2 + (i / len) * Math.PI * 2;
                const sel = i === cur;
                const mx = CX + Math.cos(a) * (R - 20);
                const my = CY + Math.sin(a) * (R - 20);
                
                ctx.fillStyle = sel ? '#ffd700' : '#cd853f44';
                ctx.font = sel ? 'bold 12px font-mono' : '10px font-mono';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(surfaces[i].op, mx, my);

                if (sel) {
                    ctx.beginPath();
                    ctx.arc(mx, my, 12, 0, Math.PI * 2);
                    ctx.strokeStyle = '#ffd70044';
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        };

        draw();
    }, [cur, sigilHash]);

    const handleTap = () => {
        const next = (cur + 1) % len;
        setCur(next);
        mech.setTable('tropical/selection', [{ index: next, name: surfaces[next].name }]);
        // Advance chain on tap
        mech.commit([{
            table: 'system/chain',
            op: 'append',
            data: [{ op: 'TROPICAL_CLICK', index: next, name: surfaces[next].name, timestamp: Date.now() }]
        }]);
    };

    return (
        <div className="w-full max-w-md flex flex-col items-center gap-6 cursor-pointer" onClick={handleTap}>
            <div className="text-[10px] font-bold tracking-[4px] text-[#cd853f] uppercase border-b border-[#cd853f33] pb-2 w-full text-center">TROPICAL RING</div>
            
            <div className="relative flex items-center justify-center">
                <canvas ref={canvasRef} width="300" height="300" className="max-w-full" />
                <div className="absolute flex flex-col items-center gap-1">
                    <div className="text-2xl">{surfaces[cur].op}</div>
                    <div className="text-[10px] font-bold text-[#ffd700] tracking-[2px] uppercase">{surfaces[cur].name}</div>
                </div>
            </div>

            <div className="w-full flex flex-col gap-2 px-6">
                <div className="flex justify-between items-center text-[8px] tracking-[2px] text-[#cd853f66] uppercase">
                    <span>🌐 æl.net</span>
                    <span>⛓ {chainHead}</span>
                </div>
                <div className="h-[1px] bg-gradient-to-r from-transparent via-[#cd853f33] to-transparent" />
            </div>
        </div>
    );
};
