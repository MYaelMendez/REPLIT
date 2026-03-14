/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { mech } from '../services/MechCore';

export const RobotOSNavigator: React.FC<{ diveMode?: boolean }> = ({ diveMode }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [chainHead, setChainHead] = useState('genesis');

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        const size = Math.min(window.innerWidth - 40, 300);
        renderer.setSize(size, size);
        container.appendChild(renderer.domElement);

        // Holographic Sphere
        const geometry = new THREE.IcosahedronGeometry(1, 15);
        const material = new THREE.MeshPhongMaterial({
            color: diveMode ? 0xffd700 : 0xcd853f,
            wireframe: true,
            transparent: true,
            opacity: 0.3,
            emissive: diveMode ? 0xffd700 : 0xcd853f,
            emissiveIntensity: 0.5
        });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        // Inner Glow
        const innerGeo = new THREE.IcosahedronGeometry(0.95, 15);
        const innerMat = new THREE.MeshBasicMaterial({
            color: 0xffd700,
            transparent: true,
            opacity: 0.1
        });
        const innerSphere = new THREE.Mesh(innerGeo, innerMat);
        scene.add(innerSphere);

        const light = new THREE.PointLight(0xffd700, 1, 100);
        light.position.set(5, 5, 5);
        scene.add(light);
        scene.add(new THREE.AmbientLight(0x404040));

        camera.position.z = 2.5;

        let frame = 0;
        const animate = () => {
            frame = requestAnimationFrame(animate);
            sphere.rotation.y += 0.005;
            sphere.rotation.x += 0.002;
            innerSphere.rotation.y -= 0.003;
            
            // Pulse based on time
            const pulse = Math.sin(Date.now() * 0.002) * 0.05 + 1;
            sphere.scale.set(pulse, pulse, pulse);
            
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(frame);
            container.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    useEffect(() => {
        const unsubscribe = mech.subscribe((name) => {
            if (name === 'system/chain') {
                const table = mech.getTable('system/chain');
                if (table.length > 0) setChainHead(String(table[0].head).slice(0, 16));
            }
        });
        return unsubscribe;
    }, []);

    const handleInteraction = () => {
        // Advance chain on interaction
        mech.commit([{
            table: 'system/chain',
            op: 'append',
            data: [{ op: 'NAVIGATOR_INTERACT', timestamp: Date.now() }]
        }]);
    };

    return (
        <div className="flex flex-col items-center gap-6 cursor-grab active:cursor-grabbing" onClick={handleInteraction}>
            <div className="text-[10px] font-bold tracking-[4px] text-[#cd853f] uppercase border-b border-[#cd853f33] pb-2 w-full text-center">HOLOGRAPHIC NAVIGATOR</div>
            
            <div ref={containerRef} className="relative w-[280px] h-[280px] md:w-[300px] md:h-[300px] flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle,#cd853f11,transparent_70%)] animate-pulse" />
            </div>

            <div className="flex flex-col items-center gap-2">
                <div className="text-[8px] tracking-[4px] text-[#cd853f66] uppercase">SPD: 40</div>
                <div className="text-[10px] text-[#ffd700] tracking-[2px] font-bold uppercase">CHAIN: {chainHead}</div>
            </div>
        </div>
    );
};
