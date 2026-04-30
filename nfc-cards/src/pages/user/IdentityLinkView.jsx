import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import TemplateRenderer from '../../templates/TemplateRenderer';
import AppSkeleton from '../../components/layout/AppSkeleton';
import { TEMPLATES } from '../../templates/templateRegistry';

/**
 * PUBLIC IDENTITY VIEW
 * Renders a personalized identity node for public consumption (e.g., NFC scan).
 * Logic:
 * 1. Resolve template blueprint from ID.
 * 2. Resolve user data from 'u' query parameter (fetching from Firestore).
 */
const IdentityLinkView = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const userId = searchParams.get('u');

    const [loading, setLoading] = useState(true);
    const [targetUserData, setTargetUserData] = useState(null);
    const [blueprintId, setBlueprintId] = useState(id);

    useEffect(() => {
        const resolveData = async () => {
            setLoading(true);
            try {
                // 1. Resolve User Data
                if (userId) {
                    const { doc, getDoc } = await import('firebase/firestore');
                    const { db } = await import('@/firebase.config');
                    const userRef = doc(db, "users", userId);
                    const userSnap = await getDoc(userRef);
                    if (userSnap.exists()) {
                        setTargetUserData(userSnap.data());
                    }
                }

                // 2. Resolve Template blueprint
                const localCache = JSON.parse(localStorage.getItem('identity_nodes') || '[]');
                const localNode = localCache.find(n => n.id === id);

                if (localNode?.templateId) {
                    setBlueprintId(localNode.templateId);
                } else {
                    const registryNode = TEMPLATES.find(t => t.id === id);
                    if (registryNode) setBlueprintId(registryNode.id);
                }
            } catch (error) {
                console.error("Public Identity Resolution Failed:", error);
            } finally {
                setLoading(false);
            }
        };

        resolveData();
    }, [id, userId]);

    if (loading) return <AppSkeleton />;

    return (
        <div className="fixed inset-0 bg-black overflow-y-auto">
            <TemplateRenderer
                templateId={blueprintId}
                userData={targetUserData || { displayName: 'Undefined Identity', role: 'Anonymous Node' }}
            />
        </div>
    );
};

export default IdentityLinkView;

