
import React from 'react';
import { TeamData } from '../../types';

export const TeamBlock: React.FC<{ data: TeamData }> = ({ data }) => {
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
                <h2 className="text-4xl font-extrabold text-center mb-16" style={{ color: data.textColor }}>{data.heading}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                    {data.members.map(member => (
                        <div key={member.id} className="flex flex-col items-center text-center">
                            <div className={`w-40 h-40 mb-6 overflow-hidden bg-gray-200 shadow-lg ${radiusClass}`}>
                                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-xl font-bold mb-1" style={{ color: data.textColor }}>{member.name}</h3>
                            <p className="text-sm font-medium uppercase tracking-wide opacity-70 mb-4" style={{ color: data.accentColor || data.textColor }}>{member.role}</p>
                            <p className="text-base opacity-80 max-w-xs" style={{ color: data.textColor }}>{member.bio}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
