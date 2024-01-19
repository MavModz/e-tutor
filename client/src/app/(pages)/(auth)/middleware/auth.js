import {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';

function Auth() {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const authtoken = sessionStorage.getItem('auth_token');

        if(!authtoken) {
            router.push('/login');
        }
        else {
            setIsLoading(false);
        }
    },[router]);
    return {isLoading};
}

export default Auth