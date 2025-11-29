
import React from 'react';
import { TestimonialData } from '../../types';

export const TestimonialBlock: React.FC<{ data: TestimonialData }> = ({ data }) => {
    const paddingY = { none: 'py-0', xs: 'py-8', sm: 'py-12', md: 'py-20', lg: 'py-32', xl: 'py-40', '2xl': 'py-48' }[data.paddingTop || 'md'];
    const radiusClass = { none: 'rounded-none', sm: 'rounded', md: 'rounded-lg', lg: 'rounded-xl', xl: 'rounded-2xl', full: 'rounded-full' }[data.radius];
    
    const bgStyle = data.backgroundType === 'image' 
    ? { backgroundImage: `url(${data.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : data.backgroundType === 'gradient'
    ? { background: data.gradient }
    : { backgroundColor: data.backgroundColor };

    return (
        <div id={data.anchorId} className={`${paddingY} animate__animated animate__${data.animation}`} style={bgStyle}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.items.map(item => (
                        <div key={item.id} className={`p-8 shadow-sm border border-gray-100 ${radiusClass}`} style={{ backgroundColor: data.cardBg }}>
                            <div className="flex gap-1 mb-4" style={{ color: data.starColor || '#FBBF24' }}>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <span key={i} className={`material-symbols-outlined text-sm ${i < (item.rating || 5) ? 'fill-current' : 'opacity-30'}`}>star</span>
                                ))}
                            </div>
                            <p className="text-lg italic mb-6 leading-relaxed opacity-80" style={{ color: data.textColor }}>"{item.quote}"</p>
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                                    {item.avatar ? <img src={item.avatar} className="w-full h-full object-cover" /> : <span className="material-symbols-outlined text-gray-400 text-3xl p-1">person</span>}
                                </div>
                                <div>
                                    <p className="font-bold" style={{ color: data.textColor }}>{item.name}</p>
                                    <p className="text-sm opacity-60" style={{ color: data.textColor }}>{item.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
