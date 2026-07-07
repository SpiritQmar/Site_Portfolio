import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface WebGLCheckProps {
    children: (props: { webglDisabled: boolean }) => ReactNode;
}

function WebGLCheck({ children }: WebGLCheckProps) {
    const [webglSupported, setWebglSupported] = useState<boolean | null>(null);
    const [showWarning, setShowWarning] = useState<boolean>(false);
    const [userChoice, setUserChoice] = useState<string | null>(null);

    useEffect(() => {
        const checkWebGL = () => {
            try {
                const canvas = document.createElement('canvas');
                const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

                if (gl && typeof gl === 'object') {
                    // Проверяем, что это WebGL контекст
                    const isWebGL = 'getExtension' in gl && 'getParameter' in gl;

                    if (!isWebGL) {
                        setWebglSupported(false);
                        setShowWarning(true);
                        return;
                    }

                    const webgl = gl as WebGLRenderingContext;
                    const debugInfo = webgl.getExtension('WEBGL_debug_renderer_info');
                    let isSoftware = false;

                    if (debugInfo) {
                        const renderer = webgl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                        isSoftware = renderer && (
                            renderer.toLowerCase().includes('software') ||
                            renderer.toLowerCase().includes('swiftshader') ||
                            renderer.toLowerCase().includes('llvmpipe') ||
                            renderer.toLowerCase().includes('mesa') ||
                            renderer.toLowerCase().includes('cpu') ||
                            renderer.toLowerCase().includes('google swiftshader') ||
                            renderer.toLowerCase().includes('microsoft basic render driver')
                        );
                    }

                    if (isSoftware) {
                        setWebglSupported(false);
                        setShowWarning(true);
                    } else {
                        setWebglSupported(true);
                        setShowWarning(false);
                    }
                } else {
                    setWebglSupported(false);
                    setShowWarning(true);
                }
            } catch (e) {
                setWebglSupported(false);
                setShowWarning(true);
            }
        };

        checkWebGL();
    }, []);

    if (userChoice === 'proceed') {
        return <>{children({ webglDisabled: true })}</>;
    }

    if (showWarning && webglSupported === false) {
        return (
            <div style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.95)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                padding: '20px',
                fontFamily: 'Arial, sans-serif'
            }}>
                <div style={{
                    backgroundColor: '#1a1a2e',
                    borderRadius: '16px',
                    padding: '40px',
                    maxWidth: '600px',
                    width: '100%',
                    color: '#ffffff',
                    border: '2px solid #e94560'
                }}>
                    <h2 style={{
                        color: '#e94560',
                        fontSize: '28px',
                        marginBottom: '20px',
                        textAlign: 'center'
                    }}>
                        ⚠️ Техническое предупреждение
                    </h2>

                    <div style={{
                        backgroundColor: 'rgba(233, 69, 96, 0.1)',
                        borderRadius: '8px',
                        padding: '20px',
                        marginBottom: '20px'
                    }}>
                        <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
                            Ваш браузер использует <strong>программный рендеринг</strong> вместо аппаратного ускорения.
                            Это приводит к низкой производительности и лагам анимации.
                        </p>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ color: '#4ade80', fontSize: '18px', marginBottom: '10px' }}>
                            🔧 Как исправить:
                        </h3>
                        <ol style={{
                            paddingLeft: '20px',
                            lineHeight: '1.8',
                            fontSize: '15px'
                        }}>
                            <li>
                                <strong>Включите аппаратное ускорение в настройках браузера:</strong>
                                <ul style={{ paddingLeft: '20px', marginTop: '5px', fontSize: '14px', color: '#aaa' }}>
                                    <li>Brave: Настройки → Система → Включить аппаратное ускорение</li>
                                    <li>Chrome: Настройки → Система → Включить аппаратное ускорение</li>
                                    <li>Edge: Настройки → Система и производительность → Включить аппаратное ускорение</li>
                                </ul>
                            </li>
                            <li style={{ marginTop: '10px' }}>
                                <strong>Проверьте флаги в браузере:</strong>
                                <ul style={{ paddingLeft: '20px', marginTop: '5px', fontSize: '14px', color: '#aaa' }}>
                                    <li>brave://flags/ или chrome://flags/</li>
                                    <li>Включите "GPU rasterization"</li>
                                    <li>Включите "Override software rendering list"</li>
                                </ul>
                            </li>
                            <li style={{ marginTop: '10px' }}>
                                <strong>Обновите драйверы видеокарты</strong>
                            </li>
                        </ol>
                    </div>

                    <div style={{
                        backgroundColor: '#16213e',
                        borderRadius: '8px',
                        padding: '15px',
                        marginBottom: '20px'
                    }}>
                        <p style={{ fontSize: '14px', color: '#ffd93d', margin: 0 }}>
                            💡 <strong>Совет:</strong> После включения аппаратного ускорения
                            перезапустите браузер и обновите страницу.
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                        <button
                            onClick={() => {
                                setUserChoice('proceed');
                                setShowWarning(false);
                            }}
                            style={{
                                backgroundColor: '#e94560',
                                color: 'white',
                                border: 'none',
                                padding: '12px 30px',
                                borderRadius: '8px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}
                            onMouseEnter={(e) => {
                                const btn = e.currentTarget;
                                btn.style.backgroundColor = '#c73652';
                            }}
                            onMouseLeave={(e) => {
                                const btn = e.currentTarget;
                                btn.style.backgroundColor = '#e94560';
                            }}
                        >
                            Продолжить без анимации
                        </button>
                        <button
                            onClick={() => window.location.reload()}
                            style={{
                                backgroundColor: '#4ade80',
                                color: '#1a1a2e',
                                border: 'none',
                                padding: '12px 30px',
                                borderRadius: '8px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}
                            onMouseEnter={(e) => {
                                const btn = e.currentTarget;
                                btn.style.backgroundColor = '#22c55e';
                            }}
                            onMouseLeave={(e) => {
                                const btn = e.currentTarget;
                                btn.style.backgroundColor = '#4ade80';
                            }}
                        >
                            Обновить страницу
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (webglSupported === true) {
        return <>{children({ webglDisabled: false })}</>;
    }

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#0a0a0a'
        }}>
            <div style={{
                color: '#ffffff',
                fontSize: '18px'
            }}>
                Проверка совместимости...
            </div>
        </div>
    );
}

export default WebGLCheck;