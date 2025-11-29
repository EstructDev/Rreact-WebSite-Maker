
import React from 'react';
import { SplitData } from '../../types';

export const SplitBlock: React.FC<{ data: SplitData }> = ({ data }) => {
  const paddingClass = {
    none: 'py-0', xs: 'py-4', sm: 'py-8', md: 'py-16', lg: 'py-24', xl: 'py-32', '2xl': 'py-40'
  }[data.paddingTop || 'md'];

  const bgStyle = data.backgroundType === 'image' 
    ? { backgroundImage: `url(${data.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : data.backgroundType === 'gradient'
    ? { background: data.gradient }
    : { backgroundColor: data.backgroundColor };

  const ratioClasses = {
      '50-50': ['flex-1', 'flex-1'],
      '40-60': ['w-full md:w-[40%]', 'w-full md:w-[60%]'],
      '60-40': ['w-full md:w-[60%]', 'w-full md:w-[40%]']
  }[data.splitRatio || '50-50'];

  return (
    <div id={data.anchorId} className={`${paddingClass} animate__animated animate__${data.animation}`} style={bgStyle}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`flex flex-col md:flex-row items-center gap-12 ${data.imageSide === 'right' ? '' : 'md:flex-row-reverse'}`}>
                <div className={ratioClasses[0]}>
                    <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-4 leading-tight" style={{ color: data.textColor }}>
                        {data.title}
                    </h2>
                    <div 
                        className="text-lg opacity-90 prose max-w-none" 
                        style={{ color: data.textColor }}
                        dangerouslySetInnerHTML={{ __html: data.content }}
                    />
                </div>
                <div className={ratioClasses[1]}>
                    <img 
                        src={data.imageUrl} 
                        alt={data.title} 
                        className="w-full h-auto rounded-xl shadow-2xl object-cover transform transition-transform hover:scale-[1.02]"
                        style={{ aspectRatio: '4/3' }}
                    />
                </div>
            </div>
        </div>
    </div>
  );
};
