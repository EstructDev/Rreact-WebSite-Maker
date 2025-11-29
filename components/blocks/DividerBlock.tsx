
import React from 'react';
import { DividerBlockData } from '../../types';

export const DividerBlock: React.FC<{ data: DividerBlockData }> = ({ data }) => {
  // Height maps to padding for the divider container
  const heightClass = { sm: 'py-4', md: 'py-8', lg: 'py-16' }[data.height];
  
  const widthClass = data.lineWidth === 'full' ? 'w-full' : data.lineWidth === 'short' ? 'w-1/6 mx-auto' : 'w-1/3 mx-auto';

  const bgStyle = data.backgroundType === 'image' 
    ? { backgroundImage: `url(${data.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : data.backgroundType === 'gradient'
    ? { background: data.gradient }
    : { backgroundColor: data.backgroundColor };

  return (
    <div id={data.anchorId} className={`${heightClass} px-4`} style={bgStyle}>
        {data.showLine && (
            <div 
                className={`h-px ${widthClass}`} 
                style={{ backgroundColor: data.lineColor }}
            />
        )}
    </div>
  );
};
