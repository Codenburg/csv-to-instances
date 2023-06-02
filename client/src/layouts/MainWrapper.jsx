import { useEffect, useState } from 'react';
import { setUser } from '../utils/auth';

export const MainWrapper = ({ children }) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const handler = async () => {
            setLoading(true);
            await setUser();
            setLoading(false);
        };
        handler();
    }, []);

    return <>{loading ? null : children}</>;
};
