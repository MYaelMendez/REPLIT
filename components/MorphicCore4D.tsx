import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface MorphicCore4DProps {
    mode: 'a' | 'e' | 'p' | 'f';
    isUnlocked: boolean;
}

export const MorphicCore4D: React.FC<MorphicCore4DProps> = ({ mode, isUnlocked }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const materialRef = useRef<THREE.ShaderMaterial | null>(null);
    const requestRef = useRef<number | null>(null);

    const colors = useMemo(() => ({
        a: new THREE.Color('#FF7518'), // Agentic Orange
        e: new THREE.Color('#00f2ff'), // Elektronik Cyan
        p: new THREE.Color('#ba0c2f'), // Private Red
        f: new THREE.Color('#ffffff'), // Faith White
    }), []);

    useEffect(() => {
        if (!containerRef.current) return;

        // Scene Setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.z = 2;

        const renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true 
        });
        renderer.setSize(800, 800);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Shader Material for 4D Morphing
        const vertexShader = `
            varying vec3 vNormal;
            varying vec3 vPosition;
            varying vec2 vUv;
            uniform float uTime;
            uniform float uMorph;

            // Simplex 3D Noise
            vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
            vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

            float snoise(vec3 v) {
                const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
                const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
                vec3 i  = floor(v + dot(v, C.yyy) );
                vec3 x0 =   v - i + dot(i, C.xxx) ;
                vec3 g = step(x0.yzx, x0.xyz);
                vec3 l = 1.0 - g;
                vec3 i1 = min( g.xyz, l.zxy );
                vec3 i2 = max( g.xyz, l.zxy );
                vec3 x1 = x0 - i1 + C.xxx;
                vec3 x2 = x0 - i2 + C.yyy;
                vec3 x3 = x0 - D.yyy;
                i = mod289(i);
                vec4 p = permute( permute( permute(
                            i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                        + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                        + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
                float n_ = 0.142857142857;
                vec3  ns = n_ * D.wyz - D.xzx;
                vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
                vec4 x_ = floor(j * ns.z);
                vec4 y_ = floor(j - 7.0 * x_ );
                vec4 x = x_ *ns.x + ns.yyyy;
                vec4 y = y_ *ns.x + ns.yyyy;
                vec4 h = 1.0 - abs(x) - abs(y);
                vec4 b0 = vec4( x.xy, y.xy );
                vec4 b1 = vec4( x.zw, y.zw );
                vec4 s0 = floor(b0)*2.0 + 1.0;
                vec4 s1 = floor(b1)*2.0 + 1.0;
                vec4 sh = -step(h, vec4(0.0));
                vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
                vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
                vec3 p0 = vec3(a0.xy,h.x);
                vec3 p1 = vec3(a0.zw,h.y);
                vec3 p2 = vec3(a1.xy,h.z);
                vec3 p3 = vec3(a1.zw,h.w);
                vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
                p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
                vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
                m = m * m;
                return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
            }

            void main() {
                vNormal = normal;
                vUv = uv;
                
                // 4D Morphing Logic
                float noise = snoise(position * 2.0 + uTime * 0.5);
                vec3 newPosition = position + normal * noise * uMorph;
                vPosition = newPosition;
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
            }
        `;

        const fragmentShader = `
            varying vec3 vNormal;
            varying vec3 vPosition;
            varying vec2 vUv;
            uniform float uTime;
            uniform vec3 uColor;
            uniform float uOpacity;

            void main() {
                // Fresnel Effect
                vec3 viewDirection = normalize(cameraPosition - vPosition);
                float fresnel = pow(1.0 - dot(vNormal, viewDirection), 3.0);
                
                // Pulsing Core
                float pulse = 0.5 + 0.5 * sin(uTime * 2.0);
                vec3 color = mix(uColor, vec3(1.0), fresnel * 0.5);
                
                gl_FragColor = vec4(color, uOpacity * (0.3 + fresnel * 0.7));
            }
        `;

        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uMorph: { value: 0.1 },
                uColor: { value: colors[mode] },
                uOpacity: { value: isUnlocked ? 0.8 : 0.2 }
            },
            transparent: true,
            side: THREE.DoubleSide
        });
        materialRef.current = material;

        const geometry = new THREE.IcosahedronGeometry(1, 64);
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Inner Core
        const innerGeometry = new THREE.IcosahedronGeometry(0.8, 32);
        const innerMaterial = new THREE.MeshBasicMaterial({
            color: colors[mode],
            transparent: true,
            opacity: 0.1,
            wireframe: true
        });
        const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
        scene.add(innerMesh);

        const animate = (time: number) => {
            const t = time * 0.001;
            if (materialRef.current) {
                materialRef.current.uniforms.uTime.value = t;
            }
            mesh.rotation.y = t * 0.2;
            mesh.rotation.z = t * 0.1;
            innerMesh.rotation.y = -t * 0.4;
            
            renderer.render(scene, camera);
            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            renderer.dispose();
            geometry.dispose();
            innerGeometry.dispose();
            material.dispose();
            innerMaterial.dispose();
        };
    }, []);

    // Update Uniforms on Props Change
    useEffect(() => {
        if (materialRef.current) {
            gsap.to(materialRef.current.uniforms.uColor.value, {
                r: colors[mode].r,
                g: colors[mode].g,
                b: colors[mode].b,
                duration: 1,
                ease: 'power2.inOut'
            });
            gsap.to(materialRef.current.uniforms.uOpacity, {
                value: isUnlocked ? 0.8 : 0.2,
                duration: 1
            });
            gsap.to(materialRef.current.uniforms.uMorph, {
                value: isUnlocked ? 0.3 : 0.1,
                duration: 1.5,
                ease: 'elastic.out(1, 0.3)'
            });
        }
    }, [mode, isUnlocked, colors]);

    return (
        <div 
            ref={containerRef} 
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
            style={{ filter: 'blur(20px) contrast(1.5)' }}
        />
    );
};
