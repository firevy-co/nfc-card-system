import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/layout';
import TemplateRenderer from '../../templates/TemplateRenderer';
import { FiArrowLeft, FiCheckCircle, FiSmartphone, FiTablet, FiMonitor, FiRotateCw } from 'react-icons/fi';
import { TEMPLATES } from '../../templates/templateRegistry';
import toast from 'react-hot-toast';

/**
 * TEMPLATE PREVIEW PAGE
 * Renders a specific template based on the ID from the URL.
 * Includes a device switcher and orientation controls for visual testing.
 */
const TemplatePreview = ({ userData }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [device, setDevice] = useState('mobile');
    const [isLandscape, setIsLandscape] = useState(false);
    const [confirming, setConfirming] = useState(false);

    // Resolve the actual blueprint templateId from localStorage → registry → fallback to url id
    const resolveTemplateId = () => {
        const localCache = JSON.parse(localStorage.getItem('identity_nodes') || '[]');
        const localNode = localCache.find(n => n.id === id);
        if (localNode?.templateId) return localNode.templateId;

        const registryNode = TEMPLATES.find(t => t.id === id);
        if (registryNode) return registryNode.id; // registry templates use their own id as the blueprint

        return id; // fallback
    };

    const blueprintId = resolveTemplateId();

    const handleConfirm = async () => {
        if (!userData?.uid) return;
        setConfirming(true);
        try {
            const { doc, updateDoc } = await import('firebase/firestore');
            const { db } = await import('@/firebase.config');
            const userRef = doc(db, "users", userData.uid);
            
            await updateDoc(userRef, {
                selectedTemplateId: id,
                lastTemplateUpdate: new Date().toISOString()
            });

            toast.success('Template identity synchronized successfully!');
            navigate(userData.role === 'Admin' ? '/admin/analytics' : '/user/home');
        } catch (error) {
            console.error("Template selection failed:", error);
            toast.error('Failed to synchronize template. Please try again.');
        } finally {
            setConfirming(false);
        }
    };

    const getDeviceStyles = () => {
        if (device === 'desktop') return 'max-w-full h-auto border-0';

        const widths = {
            mobile: isLandscape ? '667px' : '375px',
            tablet: isLandscape ? '1024px' : '768px'
        };
        const heights = {
            mobile: isLandscape ? '375px' : '667px',
            tablet: isLandscape ? '768px' : '1024px'
        };

        return `max-w-[${widths[device]}] h-[${heights[device]}] mx-auto border-[12px] border-secondary`;
    };

    return (
        <Layout userData={userData} title="Template Preview" showTopNavActions={false} hideSidebar={true}>
            <div className="mb-8 flex flex-col xl:flex-row items-center justify-between gap-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-xs font-black capitalize tracking-[0.2em] text-muted-foreground hover:text-foreground transition-all group"
                >
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    Back to Library
                </button>

                <div className="flex flex-wrap justify-center items-center gap-4">
                    {/* Device Switcher */}
                    <div className="flex bg-secondary/50 p-1.5 rounded-2xl border border-white/5 shadow-inner">
                        <button
                            onClick={() => { setDevice('mobile'); setIsLandscape(false); }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black capitalize tracking-widest transition-all ${device === 'mobile' ? 'bg-primary text-background shadow-lg shadow-primary/20' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            <FiSmartphone size={14} />
                            Mobile
                        </button>
                        <button
                            onClick={() => { setDevice('tablet'); setIsLandscape(false); }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black capitalize tracking-widest transition-all ${device === 'tablet' ? 'bg-primary text-background shadow-lg shadow-primary/20' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            <FiTablet size={14} />
                            Tablet
                        </button>
                        <button
                            onClick={() => { setDevice('desktop'); setIsLandscape(false); }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black capitalize tracking-widest transition-all ${device === 'desktop' ? 'bg-primary text-background shadow-lg shadow-primary/20' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            <FiMonitor size={14} />
                            Desktop
                        </button>
                    </div>

                    {/* Orientation Toggle */}
                    {device !== 'desktop' && (
                        <button
                            onClick={() => setIsLandscape(!isLandscape)}
                            className="flex items-center gap-2 bg-secondary/50 p-3 rounded-2xl border border-white/5 text-muted-foreground hover:text-primary transition-all group"
                            title="Rotate Device"
                        >
                            <FiRotateCw size={16} className={`transition-transform duration-500 ${isLandscape ? 'rotate-90' : 'rotate-0'}`} />
                            <span className="text-[9px] font-black capitalize tracking-widest">Rotate</span>
                        </button>
                    )}
                </div>

                <button 
                    onClick={handleConfirm}
                    disabled={confirming}
                    className="flex items-center gap-3 bg-primary text-background px-8 py-3.5 rounded-2xl text-[10px] font-black capitalize tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:scale-100"
                >
                    {confirming ? (
                        <>
                            <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin"></div>
                            Synchronizing...
                        </>
                    ) : (
                        <>
                            <FiCheckCircle size={16} />
                            Confirm & Use Template
                        </>
                    )}
                </button>
            </div>

            {/* Preview Stage (Studio Mode) */}
            <div className={`bg-card border border-border rounded-[3rem] shadow-2xl relative transition-all duration-700 ease-in-out overflow-hidden ${device === 'desktop' ? '' : 'min-h-[800px] flex items-center justify-center p-12 bg-zinc-950/40'}`}>

                {/* Dotted Background for Design Feel */}
                {device !== 'desktop' && (
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                )}

                {/* Top Visual Accent */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-indigo-500 to-primary/50 z-20"></div>

                <div
                    style={{
                        width: device === 'mobile' ? (isLandscape ? '667px' : '375px') : device === 'tablet' ? (isLandscape ? '1024px' : '768px') : '100%',
                        height: device === 'mobile' ? (isLandscape ? '375px' : '667px') : device === 'tablet' ? (isLandscape ? '768px' : '1024px') : 'auto'
                    }}
                    className={`rounded-[2.5rem] overflow-hidden bg-card transition-all duration-700 relative shadow-[0_0_100px_rgba(0,0,0,0.5)] border-[12px] border-secondary`}
                >
                    {/* Device Status Bar Simulation */}
                    <div className="h-6 bg-secondary flex items-center justify-between px-6 opacity-40">
                        <span className="text-[8px] font-bold">9:41</span>
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full border border-current"></div>
                            <div className="w-2.5 h-2.5 rounded-full border border-current"></div>
                        </div>
                    </div>

                    <div className="w-full h-full overflow-y-auto hide-scrollbar bg-black">
                        <TemplateRenderer templateId={blueprintId} userData={userData} />
                    </div>
                </div>
            </div>

            {/* Device Info Badges */}
            {/* <div className="mt-8 flex justify-center gap-14 opacity-20 select-none font-bold">
                <div className="text-center">
                    <p className="text-[9px] capitalize tracking-[0.2em] mb-1">Canvas</p>
                    <p className="text-xs font-mono">{device === 'mobile' ? (isLandscape ? '667x375' : '375x667') : device === 'tablet' ? (isLandscape ? '1024x768' : '768x1024') : 'Responsive'}</p>
                </div>
                <div className="text-center">
                    <p className="text-[9px] capitalize tracking-[0.2em] mb-1">Mode</p>
                    <p className="text-xs font-mono">{isLandscape ? 'Landscape' : 'Portrait'}</p>
                </div>
            </div> */}
        </Layout>
    );
};

export default TemplatePreview;

