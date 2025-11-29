
import React, { useState } from 'react';
import { CtaData } from '../../types';

interface Props {
  data: CtaData;
}

export const CtaBlock: React.FC<Props> = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);

  const paddingT = { sm: 'pt-12', md: 'pt-20', lg: 'pt-32', xl: 'pt-40', none: 'pt-0' }[data.paddingTop];
  const paddingB = { sm: 'pb-12', md: 'pb-20', lg: 'pb-32', xl: 'pb-40', none: 'pb-0' }[data.paddingBottom];

  const radiusClass = {
    none: 'rounded-none',
    sm: 'rounded',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    full: 'rounded-full',
  }[data.buttonRadius];

  const bgStyle = data.backgroundType === 'image' 
  ? { backgroundImage: `url(${data.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
  : data.backgroundType === 'gradient'
  ? { background: data.gradient }
  : { backgroundColor: data.backgroundColor };

  return (
    <div 
      id={data.anchorId}
      className={`relative px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center ${paddingT} ${paddingB}`}
      style={bgStyle}
    >
      {data.backgroundType === 'image' && (
          <div 
            className="absolute inset-0 bg-black pointer-events-none" 
            style={{ opacity: data.overlayOpacity / 100 }}
          />
      )}
      
      <div className="relative z-10">
        <h2 
            className="text-3xl md:text-4xl font-extrabold tracking-tight sm:text-5xl mb-6"
            style={{ color: data.headingColor }}
        >
            {data.heading}
        </h2>
        <p 
            className="text-lg md:text-xl max-w-2xl mb-10 opacity-90 mx-auto"
            style={{ color: data.subtextColor }}
        >
            {data.subtext}
        </p>
        {data.showButton && (
            <a 
                href={data.destinationUrl}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold shadow-lg transition-all duration-200 hover:-translate-y-1 ${radiusClass}`}
                style={{ 
                    backgroundColor: data.buttonBg, 
                    color: data.buttonTextColor,
                    filter: isHovered ? 'brightness(110%)' : 'none'
                }}
            >
                {data.buttonText}
            </a>
        )}
      </div>
    </div>
  );
};
