
import React from 'react';
import { ImageData } from '../../types';

export const ImageBlock: React.FC<{ data: ImageData }> = ({ data }) => {
  const paddingClass = {
    sm: 'py-8',
    md: 'py-16',
    lg: 'py-24',
    xl: 'py-32',
  }[data.padding];

  const radiusClass = {
    none: 'rounded-none',
    sm: 'rounded',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    full: 'rounded-full',
  }[data.borderRadius];

  const bgStyle = data.backgroundType === 'image' 
    ? { backgroundImage: `url(${data.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : data.backgroundType === 'gradient'
    ? { background: data.gradient }
    : { backgroundColor: data.backgroundColor };

  return (
    <div id={data.anchorId} className={paddingClass} style={bgStyle}>
        <div className={`mx-auto ${data.fullWidth ? 'w-full px-0' : 'max-w-5xl px-4'}`}>
            <figure>
                <img 
                    src={data.url} 
                    alt={data.alt} 
                    className={`w-full h-auto shadow-lg object-cover ${radiusClass}`}
                    style={{ maxHeight: '80vh' }}
                />
                {data.caption && (
                    <figcaption className="mt-2 text-center text-sm text-gray-500 bg-white/80 inline-block px-2 rounded backdrop-blur-sm">
                        {data.caption}
                    </figcaption>
                )}
            </figure>
        </div>
    </div>
  );
};
