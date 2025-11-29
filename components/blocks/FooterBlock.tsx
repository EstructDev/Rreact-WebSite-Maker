
import React from 'react';
import { FooterData } from '../../types';

interface Props {
  data: FooterData;
}

export const FooterBlock: React.FC<Props> = ({ data }) => {
  const paddingT = { sm: 'pt-4', md: 'pt-8', lg: 'pt-12', xl: 'pt-16', none: 'pt-0' }[data.paddingTop || 'md'];
  const paddingB = { sm: 'pb-4', md: 'pb-8', lg: 'pb-12', xl: 'pb-16', none: 'pb-0' }[data.paddingBottom || 'md'];

  const bgStyle = data.backgroundType === 'image' 
  ? { backgroundImage: `url(${data.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
  : data.backgroundType === 'gradient'
  ? { background: data.gradient }
  : { backgroundColor: data.backgroundColor };

  return (
    <footer 
      id={data.anchorId}
      className={`rounded-lg ${paddingT} ${paddingB}`}
      style={bgStyle}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span 
            className="material-symbols-outlined text-2xl"
            style={{ color: data.iconColor }}
          >
            rocket_launch
          </span>
          <p 
            className="text-sm font-medium"
            style={{ color: data.textColor }}
          >
            {data.copyrightText}
          </p>
        </div>
        <div className="flex items-center gap-6">
          {data.socialLinks.map((link) => (
             <a 
                key={link.id} 
                href={link.url} 
                className="transition-opacity hover:opacity-80 flex items-center gap-1"
                style={{ color: data.iconColor }}
            >
               <span className="capitalize font-bold text-sm">{link.platform}</span>
               <span className="material-symbols-outlined text-sm">open_in_new</span>
             </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
