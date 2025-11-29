
import React from 'react';
import { FeatureData } from '../../types';

interface Props {
  data: FeatureData;
}

export const FeatureBlock: React.FC<Props> = ({ data }) => {
  const paddingT = { sm: 'pt-8', md: 'pt-16', lg: 'pt-24', xl: 'pt-32', none: 'pt-0' }[data.paddingTop || 'md'];
  const paddingB = { sm: 'pb-8', md: 'pb-16', lg: 'pb-24', xl: 'pb-32', none: 'pb-0' }[data.paddingBottom || 'md'];

  const gridClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }[data.gridCols || 2];

  const gapClass = {
      sm: 'gap-4',
      md: 'gap-8',
      lg: 'gap-12'
  }[data.gap || 'lg'];

  const radiusClass = {
    none: 'rounded-none',
    sm: 'rounded',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    full: 'rounded-full',
  }[data.cardRadius || 'lg'];

  const bgStyle = data.backgroundType === 'image' 
  ? { backgroundImage: `url(${data.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
  : data.backgroundType === 'gradient'
  ? { background: data.gradient }
  : { backgroundColor: data.backgroundColor };

  return (
    <div 
      id={data.anchorId}
      className={`rounded-lg px-4 sm:px-6 lg:px-8 ${paddingT} ${paddingB}`}
      style={bgStyle}
    >
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 
          className="text-3xl font-extrabold sm:text-4xl"
          style={{ color: data.titleColor }}
        >
          {data.title}
        </h2>
        <p 
          className="mt-4 text-lg"
          style={{ color: data.descriptionColor }}
        >
          {data.description}
        </p>
      </div>
      <div className={`grid ${gapClass} ${gridClass}`}>
        {data.features.map((feature) => (
          <div 
            key={feature.id} 
            className={`flex flex-col gap-4 p-6 transition-transform hover:-translate-y-1 duration-300 ${radiusClass}`}
            style={{ backgroundColor: data.cardBgColor }}
          >
            <div className="flex-shrink-0">
              <div 
                className="flex items-center justify-center h-12 w-12 rounded-lg"
                style={{ backgroundColor: data.iconBgColor, color: data.iconColor }}
              >
                <span className="material-symbols-outlined">{feature.icon}</span>
              </div>
            </div>
            <div>
              <h3 
                className="text-lg leading-6 font-bold"
                style={{ color: data.featureTitleColor }}
              >
                {feature.title}
              </h3>
              <p 
                className="mt-2 text-base"
                style={{ color: data.featureDescColor }}
              >
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
