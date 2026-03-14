/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect, useRef } from 'react';
import { mech } from '../services/MechCore';

const FFMPEG_COMMANDS = {
    molt: 'ffmpeg -i molt_001.raw -c:v libx264 -preset slow -crf 18 molt_export.mp4',
    encode: 'ffmpeg -i dm_input.mov -c:v libx265 -tag:v hvc1 dm_encode.mp4',
    render: 'ffmpeg -f lavfi -i color=c=black:s=1920x1080 -vf "drawtext=text=\'REPORT\':fontcolor=white:fontsize=48" report_render.mp4',
    custom: 'ffmpeg -i input.mp4 -vf "hue=s=0" grayscale.mp4'
};

export const RobotOSFFmpeg: React.FC = () => {
    const [input, setInput] = useState('');
    const [logs, setLogs] = useState<{ msg: string; type: 'cmd' | 'info' | 'ok' | 'wait' }[]>([
        { msg: 'FFMPEG_METABOLISM_v6.0_INITIALIZED', type: 'info' },
        { msg: 'CODECS: H.264, HEVC, VP9, AV1, MOLT_RAW', type: 'info' },
        { msg: 'ENTROPY_CHAIN_ACTIVE', type: 'info' }
    ]);
    const [sigilHash, setSigilHash] = useState(0);
    const terminalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const unsubscribe = mech.subscribe((name) => {
            if (name === 'sigil/entropy') {
                const table = mech.getTable('sigil/entropy');
                if (table.length > 0) setSigilHash(Number(table[0].value));
            }
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [logs]);

    const runCommand = (cmd: string) => {
        setLogs(prev => [...prev, { msg: `$ ${cmd}`, type: 'cmd' }]);
        
        const entropyStr = sigilHash ? `0x${sigilHash.toString(16).slice(0, 4).toUpperCase()}` : '—';
        setLogs(prev => [...prev, { msg: `⏳ METABOLIZING... (entropy: ${entropyStr})`, type: 'wait' }]);

        // Record in Mech Chain
        mech.commit([{
            table: 'system/chain',
            op: 'append',
            data: [{ op: 'FFMPEG_METABOLISM', extra: cmd.slice(0, 40), timestamp: Date.now() }]
        }]);

        setTimeout(() => {
            const output = cmd.split(' ').pop() || 'output.mp4';
            setLogs(prev => [...prev, { msg: `✅ PROVENANCE_STAMPED: ${output}`, type: 'ok' }]);
        }, 1200 + Math.random() * 800);
    };

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim()) return;
        runCommand(input.trim());
        setInput('');
    };

    return (
        <div className="w-full max-w-3xl px-6 flex flex-col gap-6">
            <div className="flex flex-col items-center gap-1 opacity-40">
                <div className="text-[8px] tracking-[4px] uppercase text-[#cd853f]">FFMPEG METABOLISM</div>
                <div className="text-[7px] tracking-[2px] text-[#cd853f]">UNIVERSAL MEDIA ENGINE</div>
            </div>
            
            <div className="w-full bg-black/60 border border-[#cd853f33] rounded-sm backdrop-blur-xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                <div className="flex justify-between items-center border-b border-[#cd853f22] pb-3 mb-4">
                    <div className="text-xs font-bold text-[#cd853f] tracking-[2px]">🎞️ MEDIA ENGINE v6.0</div>
                    <div className="text-[8px] text-[#cd853f66] tracking-wider uppercase">HOLOGRAPHIC CONTAINMENT</div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                    {Object.entries(FFMPEG_COMMANDS).map(([key, cmd]) => (
                        <div 
                            key={key}
                            onClick={() => runCommand(cmd)}
                            className="bg-[#cd853f08] border border-[#cd853f22] rounded-sm p-3 cursor-pointer transition-all hover:bg-[#cd853f1a] hover:border-[#cd853f] group"
                        >
                            <div className="text-[10px] font-bold text-[#cd853f] uppercase mb-1 group-hover:text-[#ffd700]">{key}</div>
                            <div className="text-[8px] text-[#cd853f66] leading-tight">
                                {key === 'molt' && 'MOLT_001 EXPORT'}
                                {key === 'encode' && 'DM_ENCODE (H.265)'}
                                {key === 'render' && 'REPORT_RENDER'}
                                {key === 'custom' && 'CUSTOM_METABOLISM'}
                            </div>
                        </div>
                    ))}
                </div>

                <div 
                    ref={terminalRef}
                    className="bg-black/80 rounded-sm p-4 font-mono text-[10px] text-[#cd853f] border border-[#cd853f11] h-40 overflow-y-auto mb-4 scrollbar-none"
                >
                    {logs.map((log, i) => (
                        <div key={i} className={`mb-1.5 pl-2 border-l ${log.type === 'cmd' ? 'border-[#ffd700] text-[#ffd700]' : log.type === 'ok' ? 'border-[#00ffe7] text-[#00ffe7]' : 'border-[#cd853f33]'}`}>
                            {log.msg}
                        </div>
                    ))}
                    <div className="opacity-20 text-[8px] mt-4 uppercase tracking-[2px]">
                        ENTROPY_ACTIVE: <span className="text-[#ffd700]">0x{sigilHash.toString(16).toUpperCase() || '0000'}</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex gap-3 items-center">
                    <span className="text-[#ffd700] font-bold text-[10px]">{'>_'}</span>
                    <input 
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="ENTER FFMPEG COMMAND..."
                        className="flex-1 bg-[#cd853f08] border border-[#cd853f22] rounded-sm p-3 text-[#cd853f] font-mono text-[10px] outline-none focus:border-[#cd853f] transition-colors placeholder-[#cd853f33]"
                        spellCheck={false}
                    />
                    <button 
                        type="submit"
                        className="bg-[#cd853f] text-black font-bold px-6 py-3 rounded-sm text-[10px] hover:bg-[#ffd700] transition-all uppercase tracking-[2px]"
                    >
                        EXEC
                    </button>
                </form>
            </div>
        </div>
    );
};
