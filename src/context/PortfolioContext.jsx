import React, { createContext, useContext, useState, useEffect } from 'react';

const PortfolioContext = createContext(null);

export const usePortfolio = () => {
    const context = useContext(PortfolioContext);
    if (!context) {
        throw new Error('usePortfolio must be used within a PortfolioProvider');
    }
    return context;
};

export const PortfolioProvider = ({ children }) => {
    const [portfolioData, setPortfolioData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Minimum loading time for the futuristic effect
                const initTime = new Promise(resolve => setTimeout(resolve, 1500));
                
                // Try fetching from backend (relative path for easier deployment)
                const apiCall = fetch('/api/portfolio-data').then(res => {
                    if (!res.ok) throw new Error('Backend not found');
                    return res.json();
                });
                
                const [_, data] = await Promise.all([initTime, apiCall]);
                setPortfolioData(data);
            } catch (err) {
                // Fallback to static mock immediately if backend fails/absent
                try {
                    const { portfolioData: staticData } = await import('../data/mock');
                    setPortfolioData(staticData);
                } catch (fallbackErr) {
                    console.error('Data loading failure', fallbackErr);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <PortfolioContext.Provider value={{ portfolioData, loading, error }}>
            {children}
        </PortfolioContext.Provider>
    );
};
