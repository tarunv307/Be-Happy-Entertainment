import React from 'react';
import { Link } from 'react-router-dom';
import { Film, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-24 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-16 h-16 bg-[#F7F6F3] border border-[#E9E7E2] rounded-full flex items-center justify-center text-[#B69A65] mx-auto">
          <Film className="w-8 h-8" />
        </div>

        <span className="text-xs uppercase tracking-widest text-[#B69A65] font-semibold block">
          Error 404 • Missing Frame
        </span>

        <h1 className="font-editorial text-4xl sm:text-5xl font-semibold text-[#171717]">
          Scene Not Found
        </h1>

        <p className="text-sm text-[#777777] font-light leading-relaxed">
          The sequence or page you are searching for does not exist in the studio catalog or has been moved.
        </p>

        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#171717] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#B69A65] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return To Main Stage</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
