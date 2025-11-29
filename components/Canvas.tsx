
import React, { useRef, useEffect } from 'react';
import { BlockData, GlobalSettings, AppPreferences, HeroData, FeatureData, CtaData, FooterData, NavigationData, SplitData, MapData, FormData, ImageData, TextBlockData, ButtonBlockData, DividerBlockData, PricingData, TestimonialData, TeamData, FaqData } from '../types';
import { HeroBlock } from './blocks/HeroBlock';
import { FeatureBlock } from './blocks/FeatureBlock';
import { CtaBlock } from './blocks/CtaBlock';
import { FooterBlock } from './blocks/FooterBlock';
import { NavigationBlock } from './blocks/NavigationBlock';
import { SplitBlock } from './blocks/SplitBlock';
import { MapBlock } from './blocks/MapBlock';
import { FormBlock } from './blocks/FormBlock';
import { ImageBlock } from './blocks/ImageBlock';
import { TextBlock } from './blocks/TextBlock';
import { ButtonBlock } from './blocks/ButtonBlock';
import { DividerBlock } from './blocks/DividerBlock';
import { PricingBlock } from './blocks/PricingBlock';
import { TestimonialBlock } from './blocks/TestimonialBlock';
import { TeamBlock } from './blocks/TeamBlock';
import { FaqBlock } from './blocks/FaqBlock';

interface CanvasProps {
  blocks: BlockData[];
  selectedId: string | null;
  globalSettings: GlobalSettings;
  appPreferences: AppPreferences;
  viewMode: 'desktop' | 'tablet' | 'mobile';
  onSelect: (id: string) => void;
  onMove: (id: string, direction: 'up' | 'down') => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

export const Canvas: React.FC<CanvasProps> = ({ 
  blocks, 
  selectedId, 
  globalSettings,
  appPreferences,
  viewMode,
  onSelect, 
  onMove, 
  onDelete, 
  onDuplicate 
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // scroll if needed
  }, [blocks.length]);

  const renderBlock = (block: BlockData) => {
    switch (block.type) {
      case 'hero': return <HeroBlock data={block as HeroData} />;
      case 'feature': return <FeatureBlock data={block as FeatureData} />;
      case 'cta': return <CtaBlock data={block as CtaData} />;
      case 'footer': return <FooterBlock data={block as FooterData} />;
      case 'navigation': return <NavigationBlock data={block as NavigationData} />;
      case 'split': return <SplitBlock data={block as SplitData} />;
      case 'map': return <MapBlock data={block as MapData} />;
      case 'form': return <FormBlock data={block as FormData} />;
      case 'image': return <ImageBlock data={block as ImageData} />;
      case 'text': return <TextBlock data={block as TextBlockData} />;
      case 'button': return <ButtonBlock data={block as ButtonBlockData} />;
      case 'divider': return <DividerBlock data={block as DividerBlockData} />;
      case 'pricing': return <PricingBlock data={block as PricingData} />;
      case 'testimonial': return <TestimonialBlock data={block as TestimonialData} />;
      case 'team': return <TeamBlock data={block as TeamData} />;
      case 'faq': return <FaqBlock data={block as FaqData} />;
      default: return null;
    }
  };

  const fontClass = {
    'sans': 'font-sans', 'serif': 'font-serif', 'mono': 'font-mono', 'display': 'font-display',
  }[globalSettings.fontFamily];

  const gridLineStyle = appPreferences.showGridLines ? {
      backgroundImage: 'linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)',
      backgroundSize: '20px 20px',
  } : {};

  // View Mode Sizing & Styling
  const containerWidth = viewMode === 'mobile' ? 'max-w-[375px]' : viewMode === 'tablet' ? 'max-w-[768px]' : 'max-w-full';
  const containerStyle = viewMode !== 'desktop' ? {
      border: '12px solid #1f2937', // dark bezel
      borderRadius: '2rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      height: viewMode === 'mobile' ? '812px' : '1024px',
      overflowY: 'auto' as const
  } : {};

  const sidebarNav = blocks.find(b => b.type === 'navigation' && (b as NavigationData).layoutStyle === 'sidebar');

  return (
    <main 
      className={`flex-1 overflow-y-auto h-full relative transition-colors bg-gray-100 flex ${viewMode === 'desktop' ? '' : 'items-center justify-center py-8'}`} 
      onClick={() => onSelect('')}
    >
      <div 
        className={`bg-white transition-all duration-300 ${fontClass} ${containerWidth} w-full relative`} 
        style={{ ...gridLineStyle, ...containerStyle }}
      >
        {blocks.length === 0 ? (
           <div className="flex flex-col items-center justify-center h-[80vh] text-gray-400">
              <span className="material-symbols-outlined text-6xl mb-4">web_asset_off</span>
              <p className="text-xl font-medium">No blocks yet</p>
           </div>
        ) : (
          <div className={`pb-32 flex ${sidebarNav && viewMode === 'desktop' ? 'flex-row' : 'flex-col'}`}>
            {/* If we have sidebar nav, it renders first in the flex row */}
            {sidebarNav && viewMode === 'desktop' && (
                <div className="w-64 flex-shrink-0 sticky top-0 h-screen overflow-y-auto">
                    {renderBlock(sidebarNav)}
                     {/* Mask the sidebar nav in the main loop so we don't render it twice */}
                </div>
            )}
            
            <div className="flex-1 min-w-0">
                {blocks.map((block, index) => {
                // Skip rendering nav here if it's sidebar mode and we are in desktop
                if (block.type === 'navigation' && (block as NavigationData).layoutStyle === 'sidebar' && viewMode === 'desktop') return null;

                const isSelected = block.instanceId === selectedId;
                
                return (
                    <div 
                    key={block.instanceId} 
                    onClick={(e) => { e.stopPropagation(); onSelect(block.instanceId); }}
                    className={`relative group border-2 transition-all duration-200 
                        ${isSelected ? 'border-indigo-500 ring-4 ring-indigo-500/10 z-10' : 'border-transparent hover:border-indigo-300'}
                    `}
                    >
                    {isSelected && (
                        <div className="absolute top-2 right-2 flex items-center gap-1 rounded-lg bg-gray-900 text-white p-1 shadow-lg z-50">
                            <button onClick={(e) => {e.stopPropagation(); onMove(block.instanceId, 'up')}} className="p-1 hover:bg-gray-700 rounded"><span className="material-symbols-outlined text-sm">arrow_upward</span></button>
                            <button onClick={(e) => {e.stopPropagation(); onMove(block.instanceId, 'down')}} className="p-1 hover:bg-gray-700 rounded"><span className="material-symbols-outlined text-sm">arrow_downward</span></button>
                            <button onClick={(e) => {e.stopPropagation(); onDuplicate(block.instanceId)}} className="p-1 hover:bg-gray-700 rounded"><span className="material-symbols-outlined text-sm">content_copy</span></button>
                            <button onClick={(e) => {e.stopPropagation(); onDelete(block.instanceId)}} className="p-1 hover:bg-red-600 rounded"><span className="material-symbols-outlined text-sm">delete</span></button>
                        </div>
                    )}
                    <div className={isSelected ? 'pointer-events-none' : ''}>
                        {renderBlock(block)}
                    </div>
                    </div>
                );
                })}
            </div>
            <div ref={bottomRef} />
          </div>
        )}
      </div>
    </main>
  );
};
