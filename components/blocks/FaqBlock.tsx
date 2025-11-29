
import React from 'react';
import { FaqData } from '../../types';

export const FaqBlock: React.FC<{ data: FaqData }> = ({ data }) => {
    const paddingY = { none: 'py-0', xs: 'py-8', sm: 'py-12', md: 'py-20', lg: 'py-32', xl: 'py-40', '2xl': 'py-48' }[data.paddingTop || 'md'];
    
    const bgStyle = data.backgroundType === 'image' 
    ? { backgroundImage: `url(${data.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : data.backgroundType === 'gradient'
    ? { background: data.gradient }
    : { backgroundColor: data.backgroundColor };

    return (
        <div id={data.anchorId} className={`${paddingY} animate__animated animate__${data.animation}`} style={bgStyle}>
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
                <h2 className="text-3xl font-bold text-center mb-12" style={{ color: data.questionColor }}>{data.heading}</h2>
                <div className="space-y-4">
                    {data.items.map(item => (
                        <details key={item.id} className="group rounded-xl transition-all duration-200" style={{ backgroundColor: data.cardBg }}>
                            <summary className="flex cursor-pointer list-none items-center justify-between p-6 font-medium text-lg">
                                <span style={{ color: data.questionColor }}>{item.question}</span>
                                <span className="transition group-open:rotate-180 material-symbols-outlined text-gray-400">expand_more</span>
                            </summary>
                            <div className="px-6 pb-6 pt-0 text-base leading-relaxed opacity-90" style={{ color: data.answerColor }}>
                                {item.answer}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </div>
    )
}
