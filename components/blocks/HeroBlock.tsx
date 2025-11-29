
import React from 'react';
import { HeroData } from '../../types';

interface Props {
  data: HeroData;
}

export const HeroBlock: React.FC<Props> = ({ data }) => {
  const alignClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }[data.alignment];

  const paddingT = { none: 'pt-0', xs: 'pt-8', sm: 'pt-16', md: 'pt-24', lg: 'pt-32', xl: 'pt-48', '2xl': 'pt-64' }[data.paddingTop];
  const paddingB = { none: 'pb-0', xs: 'pb-8', sm: 'pb-16', md: 'pb-24', lg: 'pb-32', xl: 'pb-48', '2xl': 'pb-64' }[data.paddingBottom];

  const radiusClass = {
    none: 'rounded-none', sm: 'rounded', md: 'rounded-lg', lg: 'rounded-xl', xl: 'rounded-2xl', full: 'rounded-full'
  }[data.buttonRadius];

  const bgStyle = data.backgroundType === 'image' 
    ? { backgroundImage: `url(${data.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : data.backgroundType === 'gradient'
    ? { background: data.gradient }
    : { backgroundColor: data.backgroundColor };

  return (
    <div 
      id={data.anchorId}
      className={`flex flex-col justify-center gap-10 px-6 md:px-12 relative overflow-hidden ${paddingT} ${paddingB} ${alignClass} animate__animated animate__${data.animation}`}
      style={bgStyle}
    >
      <div className={`flex max-w-5xl flex-col gap-6 ${alignClass} relative z-10`}>
        <h1 
          className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] drop-shadow-sm"
          style={{ color: data.headingColor }}
        >
          {data.heading}
        </h1>
        <p 
          className="text-lg md:text-2xl leading-relaxed max-w-3xl opacity-90 font-medium"
          style={{ color: data.subheadingColor }}
        >
          {data.subheading}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center relative z-10">
        {data.showButton1 && (
            <a 
                href={data.button1Url}
                className={`${radiusClass} px-8 py-4 text-base md:text-lg font-bold shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 active:translate-y-0`}
                style={{ 
                    backgroundColor: data.button1Bg, 
                    color: data.button1Color
                }}
            >
                {data.button1Text}
            </a>
        )}
        {data.showButton2 && (
            <a 
                href={data.button2Url}
                className={`${radiusClass} px-8 py-4 text-base md:text-lg font-bold transition-all hover:-translate-y-1 active:translate-y-0 border-2`}
                style={{ 
                    backgroundColor: data.button2Bg, 
                    color: data.button2Color,
                    borderColor: data.button2Color
                }}
            >
                {data.button2Text}
            </a>
        )}
      </div>
    </div>
  );
};
