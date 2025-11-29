
import React from 'react';
import { PricingData } from '../../types';

export const PricingBlock: React.FC<{ data: PricingData }> = ({ data }) => {
    const paddingY = { none: 'py-0', xs: 'py-8', sm: 'py-12', md: 'py-20', lg: 'py-32', xl: 'py-40', '2xl': 'py-48' }[data.paddingTop || 'md'];
    
    const radiusClass = {
        none: 'rounded-none', sm: 'rounded', md: 'rounded-lg', lg: 'rounded-xl', xl: 'rounded-2xl', full: 'rounded-full'
    }[data.radius];

    const bgStyle = data.backgroundType === 'image' 
    ? { backgroundImage: `url(${data.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : data.backgroundType === 'gradient'
    ? { background: data.gradient }
    : { backgroundColor: data.backgroundColor };

    return (
        <div id={data.anchorId} className={`${paddingY} animate__animated animate__${data.animation}`} style={bgStyle}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {data.plans.map(plan => (
                        <div 
                            key={plan.id} 
                            className={`relative flex flex-col p-8 bg-white border ${plan.isPopular ? 'border-indigo-500 shadow-xl scale-105 z-10' : 'border-gray-200 shadow-sm'} ${radiusClass} transition-all duration-300 hover:-translate-y-2`}
                            style={{ backgroundColor: data.cardBg }}
                        >
                            {plan.isPopular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-white" style={{ backgroundColor: data.accentColor }}>
                                    {plan.badgeText || 'Most Popular'}
                                </div>
                            )}
                            <h3 className="text-xl font-bold mb-4" style={{ color: data.textColor }}>{plan.name}</h3>
                            <div className="flex items-baseline mb-8">
                                <span className="text-5xl font-black" style={{ color: data.textColor }}>{plan.price}</span>
                                <span className="ml-1 text-xl opacity-70" style={{ color: data.textColor }}>{plan.period}</span>
                            </div>
                            <ul className="flex-1 space-y-4 mb-8">
                                {plan.features.map((feat, i) => (
                                    <li key={i} className="flex items-center">
                                        <span className="material-symbols-outlined mr-2 text-xl" style={{ color: data.accentColor }}>check_circle</span>
                                        <span style={{ color: data.textColor, opacity: 0.8 }}>{feat}</span>
                                    </li>
                                ))}
                            </ul>
                            <a 
                                href="#" 
                                className={`block w-full py-3 px-4 text-center font-bold transition-opacity hover:opacity-90 ${radiusClass}`}
                                style={{ backgroundColor: plan.isPopular ? data.accentColor : '#e5e7eb', color: plan.isPopular ? '#fff' : '#374151' }}
                            >
                                {plan.buttonText}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
