
import React from 'react';
import { TextBlockData } from '../../types';

export const TextBlock: React.FC<{ data: TextBlockData }> = ({ data }) => {
  const paddingT = { sm: 'pt-4', md: 'pt-8', lg: 'pt-16', xl: 'pt-24', none: 'pt-0' }[data.paddingTop];
  const paddingB = { sm: 'pb-4', md: 'pb-8', lg: 'pb-16', xl: 'pb-24', none: 'pb-0' }[data.paddingBottom];
  
  const sizeClass = {
      sm: 'text-sm', base: 'text-base', lg: 'text-lg', xl: 'text-xl',
      '2xl': 'text-2xl', '3xl': 'text-3xl', '4xl': 'text-4xl'
  }[data.fontSize];

  const weightClass = {
      normal: 'font-normal', medium: 'font-medium', bold: 'font-bold', black: 'font-black'
  }[data.fontWeight];

  const alignClass = {
      left: 'text-left', center: 'text-center', right: 'text-right', justify: 'text-justify'
  }[data.align];

  const bgStyle = data.backgroundType === 'image' 
    ? { backgroundImage: `url(${data.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : data.backgroundType === 'gradient'
    ? { background: data.gradient }
    : { backgroundColor: data.backgroundColor };

  return (
    <div id={data.anchorId} className={`${paddingT} ${paddingB} px-4`} style={bgStyle}>
        <div 
            className={`max-w-4xl mx-auto ${alignClass} ${sizeClass} ${weightClass}`}
            style={{ color: data.color }}
            dangerouslySetInnerHTML={{ __html: data.content }} 
        />
    </div>
  );
};
