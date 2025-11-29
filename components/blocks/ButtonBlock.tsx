
import React from 'react';
import { ButtonBlockData } from '../../types';

export const ButtonBlock: React.FC<{ data: ButtonBlockData }> = ({ data }) => {
  const paddingT = { sm: 'pt-4', md: 'pt-8', lg: 'pt-16', xl: 'pt-24', none: 'pt-0' }[data.paddingTop];
  const paddingB = { sm: 'pb-4', md: 'pb-8', lg: 'pb-16', xl: 'pb-24', none: 'pb-0' }[data.paddingBottom];

  const alignClass = { left: 'justify-start', center: 'justify-center', right: 'justify-end' }[data.align];
  const radiusClass = { none: 'rounded-none', sm: 'rounded', md: 'rounded-md', lg: 'rounded-lg', full: 'rounded-full' }[data.radius];

  const bgStyle = data.backgroundType === 'image' 
    ? { backgroundImage: `url(${data.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : data.backgroundType === 'gradient'
    ? { background: data.gradient }
    : { backgroundColor: data.backgroundColor };

  // Button Variant Styles
  const btnStyle = data.variant === 'outline' 
    ? { border: `2px solid ${data.buttonBg}`, color: data.buttonBg, background: 'transparent' }
    : data.variant === 'ghost'
    ? { color: data.buttonBg, background: 'transparent' }
    : { backgroundColor: data.buttonBg, color: data.buttonColor };

  return (
    <div id={data.anchorId} className={`${paddingT} ${paddingB} px-4 flex ${alignClass}`} style={bgStyle}>
        <a 
            href={data.url}
            className={`inline-flex items-center justify-center px-6 py-3 text-sm font-bold transition-all hover:opacity-80 ${radiusClass}`}
            style={btnStyle}
        >
            {data.text}
        </a>
    </div>
  );
};
