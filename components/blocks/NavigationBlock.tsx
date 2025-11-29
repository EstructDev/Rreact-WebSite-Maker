
import React, { useState } from 'react';
import { NavigationData } from '../../types';

interface Props {
  data: NavigationData;
}

export const NavigationBlock: React.FC<Props> = ({ data }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const isSidebar = data.layoutStyle === 'sidebar';

  const layoutClass = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }[data.layout];

  const radiusClass = {
    none: 'rounded-none', sm: 'rounded', md: 'rounded-lg', lg: 'rounded-xl', xl: 'rounded-2xl', full: 'rounded-full'
  }[data.buttonRadius];

  const paddingY = {
      none: 'py-0', xs: 'py-2', sm: 'py-3', md: 'py-4', lg: 'py-6', xl: 'py-8', '2xl': 'py-10'
  }[data.paddingTop || 'sm'];

  const bgStyle = data.backgroundType === 'gradient'
    ? { background: data.gradient }
    : { backgroundColor: data.backgroundColor };

  if (isSidebar) {
      return (
        <nav 
            id={data.anchorId}
            className={`flex flex-col h-full w-full p-6 animate__animated animate__${data.animation} shadow-lg relative z-50`}
            style={bgStyle}
        >
            {/* Sidebar Logo */}
            <div className="mb-10 text-center md:text-left">
                {data.logoType === 'image' && data.logoImage ? (
                    <img src={data.logoImage} alt="Logo" className="object-contain" style={{ width: `${data.logoWidth}px`, maxHeight: '60px' }} />
                ) : (
                    <span className="font-black text-2xl tracking-tight" style={{ color: data.textColor }}>
                        {data.logoText}
                    </span>
                )}
            </div>

            {/* Sidebar Links */}
            <div className="flex-1 flex flex-col gap-4">
                {data.links.map((link) => (
                <a 
                    key={link.id} 
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(link.id)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="text-base font-semibold transition-colors block py-2 px-2 rounded"
                    style={{ 
                        color: hoveredLink === link.id ? data.hoverColor : data.linkColor,
                        backgroundColor: hoveredLink === link.id ? 'rgba(0,0,0,0.03)' : 'transparent' 
                    }}
                >
                    {link.label}
                </a>
                ))}
            </div>

            {/* Sidebar Button */}
            <div className="mt-8">
                {data.showButton && (
                    <a 
                        href={data.buttonUrl}
                        className={`block w-full text-center px-5 py-3 text-sm font-bold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 ${radiusClass}`}
                        style={{ backgroundColor: data.buttonBg, color: data.buttonTextColor }}
                    >
                        {data.buttonText}
                    </a>
                )}
            </div>
        </nav>
      );
  }

  return (
    <nav 
        id={data.anchorId}
        className={`relative shadow-sm transition-colors sticky top-0 z-50 ${paddingY} animate__animated animate__${data.animation}`}
        style={bgStyle}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
                {data.logoType === 'image' && data.logoImage ? (
                    <img src={data.logoImage} alt="Logo" className="object-contain" style={{ width: `${data.logoWidth}px`, maxHeight: '60px' }} />
                ) : (
                    <span 
                        className="font-black text-2xl tracking-tight"
                        style={{ color: data.textColor }}
                    >
                        {data.logoText}
                    </span>
                )}
            </div>

            {/* Desktop Menu */}
            <div className={`hidden md:flex flex-1 gap-8 ${layoutClass} px-8 items-center`}>
                {data.links.map((link) => (
                <a 
                    key={link.id} 
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(link.id)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="text-sm font-semibold transition-colors"
                    style={{ color: hoveredLink === link.id ? data.hoverColor : data.linkColor }}
                >
                    {link.label}
                </a>
                ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
                {data.showButton && (
                    <a 
                        href={data.buttonUrl}
                        className={`px-5 py-2.5 text-sm font-bold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 ${radiusClass}`}
                        style={{ backgroundColor: data.buttonBg, color: data.buttonTextColor }}
                    >
                        {data.buttonText}
                    </a>
                )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
                <button 
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    type="button" 
                    className="inline-flex items-center justify-center p-2 rounded-md hover:bg-black/5 focus:outline-none transition-colors"
                    style={{ color: data.textColor }}
                >
                    <span className="material-symbols-outlined text-2xl">{mobileMenuOpen ? 'close' : 'menu'}</span>
                </button>
            </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full shadow-lg border-t border-gray-100/10" style={{ backgroundColor: data.menuBgColor || '#ffffff' }}>
              <div className="px-4 pt-4 pb-6 space-y-2">
                  {data.links.map((link) => (
                      <a 
                        key={link.id}
                        href={link.href}
                        className="block px-3 py-3 rounded-lg text-base font-bold hover:bg-black/5 transition-colors"
                        style={{ color: data.linkColor }}
                      >
                          {link.label}
                      </a>
                  ))}
                  {data.showButton && (
                      <a 
                        href={data.buttonUrl}
                        className={`w-full mt-6 block px-5 py-3 text-base font-bold text-center shadow-sm ${radiusClass}`}
                        style={{ backgroundColor: data.buttonBg, color: data.buttonTextColor }}
                      >
                          {data.buttonText}
                      </a>
                  )}
              </div>
          </div>
      )}
    </nav>
  );
};
