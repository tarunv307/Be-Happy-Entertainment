import React from 'react';
import { Link } from 'react-router-dom';
import { Film, ArrowLeft } from 'lucide-react';
import { KavinLogo } from '../components/brand/KavinLogo';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#080808] text-white flex items-center justify-center px-4 py-24 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex justify-center mb-4">
          <KavinLogo variant="icon" size="xl" animated />
        </div>

        <span className="px-3 py-1 rounded-xs text-[10px] font-black uppercase tracking-[0.25em] bg-[#D6AD68] text-black inline-block">
          ERROR 404 • MISSING FRAME
        </span>

        <h1 className="font-cinematic text-3xl sm:text-5xl font-black text-white uppercase tracking-wider">
          SCENE NOT FOUND
        </h1>

        <p className="text-xs sm:text-sm text-[#B5B5B5] font-light leading-relaxed">
          The requested reel or title is not currently available in the Be Happy Entertainment streaming theater.
        </p>

        <div className="pt-4">
          <Link
            to="/"
            className="btn-gold inline-flex items-center gap-2 px-6 py-3 rounded-sm text-xs uppercase font-extrabold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return To Home Theater</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
