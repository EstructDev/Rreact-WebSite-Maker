
import React from 'react';
import { MapData } from '../../types';

export const MapBlock: React.FC<{ data: MapData }> = ({ data }) => {
  const paddingClass = {
    sm: 'p-4',
    md: 'p-8',
    lg: 'p-12',
    xl: 'p-16',
  }[data.padding];

  const bgStyle = data.backgroundType === 'image' 
    ? { backgroundImage: `url(${data.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : data.backgroundType === 'gradient'
    ? { background: data.gradient }
    : { backgroundColor: data.backgroundColor };
    
  // Simple encode for map embed
  const encodedAddress = encodeURIComponent(data.address);

  return (
    <div id={data.anchorId} className={paddingClass} style={bgStyle}>
        <div className="max-w-7xl mx-auto w-full h-full rounded-xl overflow-hidden shadow-md bg-white">
            <iframe 
                width="100%" 
                height={data.height} 
                frameBorder="0" 
                scrolling="no" 
                marginHeight={0} 
                marginWidth={0} 
                src={`https://maps.google.com/maps?q=${encodedAddress}&z=${data.zoom}&output=embed`}
                title="Map"
            >
            </iframe>
        </div>
    </div>
  );
};
