import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import Link from 'next/link';

const ORBIT_LOTTIE_SRC = "https://lottie.host/b0afb2fe-f10f-403b-b61b-41086badbf45/U9tI3GGAyB.lottie";

const OrbitLogo: React.FC = () => {
    return (
        <Link href="/" className="flex items-center space-x-0 cursor-pointer">
            {/* Lottie Player for the 'O' */}
            <div className="h-10 w-10 relative -mr-1"> 
                <Player
                    autoplay
                    loop
                    src={ORBIT_LOTTIE_SRC}
                    style={{ height: '100%', width: '100%' }}
                />
            </div>
            {/* Static Text for 'RBIT' */}
            <span className="font-bold text-xl text-text-default">RBIT</span>
        </Link>
    );
};

export default OrbitLogo;