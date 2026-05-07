import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import TemplateRenderer from '../../templates/TemplateRenderer';
import AppSkeleton from '../../components/layout/AppSkeleton';
import { TEMPLATES } from '../../templates/templateRegistry';
import { API_BASE_URL } from '../../config/api';

/**
 * PUBLIC IDENTITY VIEW
 * Renders a personalized identity node for public consumption (e.g., NFC scan).
 * Logic:
 * 1. Resolve user data from Firestore using the 'u' query parameter.
 * 2. Resolve template blueprint: API first → registry fallback → url id fallback.
 * No data is read from or written to localStorage.
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
                // 1. Resolve User Data from Firestore
                if (userId) {
                    const { doc, getDoc } = await import('firebase/firestore');
                    const { db } = await import('@/firebase.config');
                    const userRef = doc(db, "users", userId);
                    const userSnap = await getDoc(userRef);
                    if (userSnap.exists()) {
                        setTargetUserData(userSnap.data());
                    }
                }

                // 2. Resolve Template blueprint: API → registry → url id fallback
                let resolved = false;
                try {
                    const response = await fetch(`${API_BASE_URL}/api/templates`);
                    if (response.ok) {
                        const templates = await response.json();
                        const apiNode = templates.find(t => t.id === id);
                        if (apiNode?.templateId) {
                            setBlueprintId(apiNode.templateId);
                            resolved = true;
                        }
                    }
                } catch {
                    // API unreachable — fall through to registry
                }

                if (!resolved) {
                    const registryNode = TEMPLATES.find(t => t.id === id);
                    if (registryNode) setBlueprintId(registryNode.id);
                    // If still not found, blueprintId stays as url id (set in useState default)
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
