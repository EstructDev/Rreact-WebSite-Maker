
import React, { useState } from 'react';
import { BlockData, GlobalSettings, AnimationType, FaqData, TeamData, TestimonialData, PricingData, FormData, NavigationData, SplitData, FeatureData, HeroData, CtaData, FooterData, TextBlockData, ButtonBlockData, DividerBlockData, ImageData, MapData } from '../types';

interface Props {
  selectedBlock?: BlockData;
  globalSettings: GlobalSettings;
  mode: 'editor' | 'settings';
  language: 'en' | 'pt' | 'es' | 'fr';
  onUpdateBlock: (id: string, data: BlockData) => void;
  onUpdateGlobal: (data: GlobalSettings) => void;
  onClose: () => void;
}

const LABELS: Record<string, Record<string, string>> = {
  en: { globalSettings: 'Global Settings', editBlock: 'Edit Block', background: 'Background' },
  pt: { globalSettings: 'Configurações Globais', editBlock: 'Editar Bloco', background: 'Fundo' },
  es: { globalSettings: 'Ajustes Globales', editBlock: 'Editar Bloque', background: 'Fondo' },
  fr: { globalSettings: 'Paramètres Globaux', editBlock: 'Modifier Bloc', background: 'Arrière-plan' }
};

const PRESET_COLORS = [
  'var(--color-primary)', 'var(--color-secondary)', 'var(--color-bg)', 'var(--color-text)', 'var(--color-accent)',
  '#ffffff', '#000000', '#111827', '#4b5563', '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'
];

const Section = ({ title, children }: { title: string, children?: React.ReactNode }) => (
  <div className="mb-6 border-b border-gray-100 pb-6 last:border-0">
    <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">{title}</h3>
    {children}
  </div>
);

const ColorInput = ({ label, value, onChange }: { label: string, value: string, onChange: (val: string) => void }) => (
  <div className="mb-3">
    <label className="mb-1 block text-xs font-semibold text-gray-600">{label}</label>
    <div className="flex flex-wrap gap-1.5 mb-2">
        {PRESET_COLORS.map(c => (
            <button key={c} onClick={() => onChange(c)} className={`w-5 h-5 rounded-full border border-gray-200 shadow-sm ${value === c ? 'ring-2 ring-indigo-500' : ''}`} style={{ background: c }} />
        ))}
    </div>
    <div className="flex gap-2">
        <div className="relative w-8 h-8 rounded border overflow-hidden shrink-0">
            <input type="color" value={value.startsWith('var') ? '#000000' : value} onChange={(e) => onChange(e.target.value)} className="absolute -top-2 -left-2 w-12 h-12 cursor-pointer" />
        </div>
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded border-gray-300 text-xs py-1" />
    </div>
  </div>
);

const SimpleGradientBuilder = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
    const [angle, setAngle] = useState('135deg');
    const [start, setStart] = useState('#667eea');
    const [end, setEnd] = useState('#764ba2');

    const update = (a: string, s: string, e: string) => {
        onChange(`linear-gradient(${a}, ${s} 0%, ${e} 100%)`);
    };

    return (
        <div className="mb-3 p-2 bg-gray-50 rounded border border-gray-200">
             <label className="mb-2 block text-xs font-semibold text-gray-600">Gradient Builder</label>
             <div className="grid grid-cols-2 gap-2 mb-2">
                 <div>
                    <label className="text-[10px] uppercase">Start</label>
                    <input type="color" value={start} onChange={(e) => { setStart(e.target.value); update(angle, e.target.value, end); }} className="block w-full h-8" />
                 </div>
                 <div>
                    <label className="text-[10px] uppercase">End</label>
                    <input type="color" value={end} onChange={(e) => { setEnd(e.target.value); update(angle, start, e.target.value); }} className="block w-full h-8" />
                 </div>
             </div>
             <div>
                <label className="text-[10px] uppercase">Direction: {angle}</label>
                <input type="range" min="0" max="360" value={parseInt(angle)} onChange={(e) => { setAngle(`${e.target.value}deg`); update(`${e.target.value}deg`, start, end); }} className="w-full" />
             </div>
        </div>
    )
}

const TextInput = ({ label, value, onChange, type = "text", isArea = false, placeholder = '' }: any) => (
  <div className="mb-3">
    <label className="mb-1 block text-xs font-semibold text-gray-600">{label}</label>
    {isArea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded border-gray-300 text-xs py-2" rows={3} placeholder={placeholder} />
    ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded border-gray-300 text-xs py-2" placeholder={placeholder} />
    )}
  </div>
);

const Toggle = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: (val: boolean) => void }) => (
    <div className="mb-3 flex items-center justify-between">
        <label className="text-xs font-semibold text-gray-600">{label}</label>
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
    </div>
);

const SelectInput = ({ label, value, options, onChange }: any) => (
  <div className="mb-3">
    <label className="mb-1 block text-xs font-semibold text-gray-600">{label}</label>
    <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded border-gray-300 text-xs py-2 bg-white">
      {options.map((o: any) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
);

const ArrayBuilder = <T extends { id: string }>({ items, renderItem, onUpdate, onAdd, label }: { 
    items: T[], 
    renderItem: (item: T, index: number, update: (newItem: T) => void) => React.ReactNode, 
    onUpdate: (items: T[]) => void, 
    onAdd: () => T,
    label: string 
}) => {
    return (
        <div className="mb-4 border border-gray-200 rounded p-2">
            <label className="mb-2 block text-xs font-bold uppercase text-gray-500">{label}</label>
            <div className="space-y-3 mb-2">
                {items.map((item, index) => (
                    <div key={item.id} className="relative rounded border border-gray-200 bg-white p-3 shadow-sm">
                         <button onClick={() => { const n = [...items]; n.splice(index, 1); onUpdate(n); }} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 z-10">
                            <span className="material-symbols-outlined text-base">delete</span>
                         </button>
                         {renderItem(item, index, (newItem) => { const n = [...items]; n[index] = newItem; onUpdate(n); })}
                    </div>
                ))}
            </div>
            <button onClick={() => onUpdate([...items, onAdd()])} className="w-full flex items-center justify-center gap-1 rounded border border-dashed border-gray-300 py-2 text-xs font-bold text-gray-500 hover:bg-gray-50 hover:text-indigo-600">
                <span className="material-symbols-outlined text-sm">add</span> Add Item
            </button>
        </div>
    )
}

export const PropertiesPanel: React.FC<Props> = ({ selectedBlock, globalSettings, mode, language, onUpdateBlock, onUpdateGlobal, onClose }) => {
  const t = LABELS[language] || LABELS.en;

  if (mode === 'settings') {
    return (
      <aside className="flex h-full w-full md:w-80 flex-col border-l border-gray-200 bg-white shadow-xl z-40 overflow-hidden">
        <div className="flex items-center justify-between border-b bg-gray-50 px-4 py-3">
          <h2 className="text-sm font-bold uppercase tracking-wide text-gray-800">{t.globalSettings}</h2>
          <button onClick={onClose}><span className="material-symbols-outlined">close</span></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
            <Section title="SEO & Metadata">
                <TextInput label="Site Title" value={globalSettings.title} onChange={(v: string) => onUpdateGlobal({ ...globalSettings, title: v })} />
                <TextInput label="Meta Description" value={globalSettings.description} onChange={(v: string) => onUpdateGlobal({ ...globalSettings, description: v })} isArea />
                <TextInput label="Keywords" value={globalSettings.keywords} onChange={(v: string) => onUpdateGlobal({ ...globalSettings, keywords: v })} />
                <TextInput label="OG Image URL" value={globalSettings.ogImage} onChange={(v: string) => onUpdateGlobal({ ...globalSettings, ogImage: v })} />
            </Section>
            <Section title="Global Appearance">
                <SelectInput label="Font Family" value={globalSettings.fontFamily} options={['sans', 'serif', 'mono', 'display'].map(f => ({ label: f, value: f }))} onChange={(v: any) => onUpdateGlobal({ ...globalSettings, fontFamily: v })} />
                <ColorInput label="Primary Color" value={globalSettings.primaryColor} onChange={(v) => onUpdateGlobal({ ...globalSettings, primaryColor: v })} />
                <ColorInput label="Secondary Color" value={globalSettings.secondaryColor} onChange={(v) => onUpdateGlobal({ ...globalSettings, secondaryColor: v })} />
                <ColorInput label="Background Color" value={globalSettings.backgroundColor} onChange={(v) => onUpdateGlobal({ ...globalSettings, backgroundColor: v })} />
                <ColorInput label="Text Color" value={globalSettings.textColor} onChange={(v) => onUpdateGlobal({ ...globalSettings, textColor: v })} />
            </Section>
        </div>
      </aside>
    );
  }

  if (!selectedBlock) return null;

  const handleUpdate = (key: string, value: any) => {
    onUpdateBlock(selectedBlock.instanceId, { ...selectedBlock, [key]: value });
  };

  return (
    <aside className="flex h-full w-full md:w-80 flex-col border-l border-gray-200 bg-white shadow-xl z-40 overflow-hidden">
      <div className="flex items-center justify-between border-b bg-gray-50 px-4 py-3">
        <h2 className="text-sm font-bold uppercase tracking-wide text-gray-800 truncate">{selectedBlock.type} Block</h2>
        <button onClick={onClose}><span className="material-symbols-outlined">close</span></button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 scrollbar-thin">
        {/* COMMON SETTINGS */}
        <Section title="General Layout">
             <TextInput label="Anchor ID (e.g. #about)" value={selectedBlock.anchorId || ''} onChange={(v: string) => handleUpdate('anchorId', v)} />
             <SelectInput label="Animation" value={selectedBlock.animation} options={['none','fade-in','slide-up','zoom-in','bounce'].map(v => ({label:v, value:v}))} onChange={(v:any) => handleUpdate('animation', v)} />
             <div className="grid grid-cols-2 gap-2">
                 <SelectInput label="Top Padding" value={selectedBlock.paddingTop} options={['none','sm','md','lg','xl'].map(v => ({label:v, value:v}))} onChange={(v:any) => handleUpdate('paddingTop', v)} />
                 <SelectInput label="Bottom Padding" value={selectedBlock.paddingBottom} options={['none','sm','md','lg','xl'].map(v => ({label:v, value:v}))} onChange={(v:any) => handleUpdate('paddingBottom', v)} />
             </div>
        </Section>
        
        <Section title="Background">
             <SelectInput label="Type" value={selectedBlock.backgroundType} options={[{label:'Solid',value:'solid'},{label:'Gradient',value:'gradient'},{label:'Image',value:'image'}]} onChange={(v: any) => handleUpdate('backgroundType', v)} />
             {selectedBlock.backgroundType === 'solid' && <ColorInput label="Color" value={selectedBlock.backgroundColor} onChange={(v) => handleUpdate('backgroundColor', v)} />}
             {selectedBlock.backgroundType === 'gradient' && <SimpleGradientBuilder value={selectedBlock.gradient} onChange={(v) => handleUpdate('gradient', v)} />}
             {selectedBlock.backgroundType === 'image' && <TextInput label="Image URL" value={selectedBlock.backgroundImage} onChange={(v: string) => handleUpdate('backgroundImage', v)} />}
        </Section>

        {/* --- BLOCK SPECIFIC --- */}

        {selectedBlock.type === 'hero' && (
            <Section title="Hero Content">
                <TextInput label="Heading" value={(selectedBlock as HeroData).heading} onChange={(v: string) => handleUpdate('heading', v)} />
                <ColorInput label="Heading Color" value={(selectedBlock as HeroData).headingColor} onChange={(v) => handleUpdate('headingColor', v)} />
                <TextInput label="Subheading" value={(selectedBlock as HeroData).subheading} onChange={(v: string) => handleUpdate('subheading', v)} isArea />
                <ColorInput label="Subheading Color" value={(selectedBlock as HeroData).subheadingColor} onChange={(v) => handleUpdate('subheadingColor', v)} />
                
                <div className="mt-4 border-t pt-4">
                    <Toggle label="Show Button 1" checked={(selectedBlock as HeroData).showButton1} onChange={(v) => handleUpdate('showButton1', v)} />
                    {(selectedBlock as HeroData).showButton1 && (
                        <div className="pl-2 border-l-2 border-indigo-100">
                             <TextInput label="Text" value={(selectedBlock as HeroData).button1Text} onChange={(v: string) => handleUpdate('button1Text', v)} />
                             <TextInput label="Link" value={(selectedBlock as HeroData).button1Url} onChange={(v: string) => handleUpdate('button1Url', v)} />
                             <ColorInput label="Bg" value={(selectedBlock as HeroData).button1Bg} onChange={(v) => handleUpdate('button1Bg', v)} />
                             <ColorInput label="Text" value={(selectedBlock as HeroData).button1Color} onChange={(v) => handleUpdate('button1Color', v)} />
                        </div>
                    )}
                </div>
                <div className="mt-4 border-t pt-4">
                    <Toggle label="Show Button 2" checked={(selectedBlock as HeroData).showButton2} onChange={(v) => handleUpdate('showButton2', v)} />
                    {(selectedBlock as HeroData).showButton2 && (
                        <div className="pl-2 border-l-2 border-indigo-100">
                             <TextInput label="Text" value={(selectedBlock as HeroData).button2Text} onChange={(v: string) => handleUpdate('button2Text', v)} />
                             <ColorInput label="Bg" value={(selectedBlock as HeroData).button2Bg} onChange={(v) => handleUpdate('button2Bg', v)} />
                             <ColorInput label="Text" value={(selectedBlock as HeroData).button2Color} onChange={(v) => handleUpdate('button2Color', v)} />
                        </div>
                    )}
                </div>
            </Section>
        )}

        {selectedBlock.type === 'navigation' && (
            <>
            <Section title="Navigation Layout">
                <SelectInput label="Layout Style" value={(selectedBlock as NavigationData).layoutStyle || 'topbar'} options={[{label:'Top Bar',value:'topbar'},{label:'Sidebar (Desktop)',value:'sidebar'}]} onChange={(v:any) => handleUpdate('layoutStyle', v)} />
                <SelectInput label="Link Alignment" value={(selectedBlock as NavigationData).layout} options={['left','center','right'].map(v => ({label:v, value:v}))} onChange={(v:any) => handleUpdate('layout', v)} />
            </Section>
            <Section title="Logo & Colors">
                <SelectInput label="Logo Type" value={(selectedBlock as NavigationData).logoType} options={[{label:'Text',value:'text'},{label:'Image',value:'image'}]} onChange={(v:any) => handleUpdate('logoType', v)} />
                {(selectedBlock as NavigationData).logoType === 'text' ? (
                     <TextInput label="Logo Text" value={(selectedBlock as NavigationData).logoText} onChange={(v: string) => handleUpdate('logoText', v)} />
                ) : (
                     <>
                        <TextInput label="Image URL" value={(selectedBlock as NavigationData).logoImage} onChange={(v: string) => handleUpdate('logoImage', v)} />
                        <TextInput label="Width (px)" type="number" value={(selectedBlock as NavigationData).logoWidth} onChange={(v: string) => handleUpdate('logoWidth', Number(v))} />
                     </>
                )}
                 <ColorInput label="Text Color" value={(selectedBlock as NavigationData).textColor} onChange={(v) => handleUpdate('textColor', v)} />
                 <ColorInput label="Link Color" value={(selectedBlock as NavigationData).linkColor} onChange={(v) => handleUpdate('linkColor', v)} />
                 <ColorInput label="Hover Color" value={(selectedBlock as NavigationData).hoverColor} onChange={(v) => handleUpdate('hoverColor', v)} />
            </Section>
            <Section title="Action Button">
                <Toggle label="Show Button" checked={(selectedBlock as NavigationData).showButton} onChange={(v) => handleUpdate('showButton', v)} />
                {(selectedBlock as NavigationData).showButton && (
                    <>
                        <TextInput label="Text" value={(selectedBlock as NavigationData).buttonText} onChange={(v: string) => handleUpdate('buttonText', v)} />
                        <TextInput label="Link" value={(selectedBlock as NavigationData).buttonUrl} onChange={(v: string) => handleUpdate('buttonUrl', v)} />
                        <ColorInput label="Bg Color" value={(selectedBlock as NavigationData).buttonBg} onChange={(v) => handleUpdate('buttonBg', v)} />
                        <ColorInput label="Text Color" value={(selectedBlock as NavigationData).buttonTextColor} onChange={(v) => handleUpdate('buttonTextColor', v)} />
                    </>
                )}
            </Section>
            <ArrayBuilder label="Links" items={(selectedBlock as NavigationData).links} onAdd={() => ({ id: Math.random().toString(), label: 'Link', href: '#' })} onUpdate={(items) => handleUpdate('links', items)} renderItem={(item, i, update) => (
                    <div className="grid grid-cols-2 gap-2">
                        <input className="rounded border-gray-300 text-xs p-1" value={item.label} onChange={(e) => update({...item, label: e.target.value})} placeholder="Label" />
                        <input className="rounded border-gray-300 text-xs p-1" value={item.href} onChange={(e) => update({...item, href: e.target.value})} placeholder="URL" />
                    </div>
            )} />
            </>
        )}

        {selectedBlock.type === 'feature' && (
             <Section title="Feature Grid">
                 <TextInput label="Main Title" value={(selectedBlock as FeatureData).title} onChange={(v: string) => handleUpdate('title', v)} />
                 <TextInput label="Description" value={(selectedBlock as FeatureData).description} onChange={(v: string) => handleUpdate('description', v)} isArea />
                 <ColorInput label="Title Color" value={(selectedBlock as FeatureData).titleColor} onChange={(v) => handleUpdate('titleColor', v)} />
                 <ColorInput label="Desc Color" value={(selectedBlock as FeatureData).descriptionColor} onChange={(v) => handleUpdate('descriptionColor', v)} />
                 
                 <div className="mt-4 border-t pt-2">
                     <p className="font-bold text-xs mb-2">Card Styling</p>
                     <ColorInput label="Card Bg" value={(selectedBlock as FeatureData).cardBgColor} onChange={(v) => handleUpdate('cardBgColor', v)} />
                     <ColorInput label="Icon Bg" value={(selectedBlock as FeatureData).iconBgColor} onChange={(v) => handleUpdate('iconBgColor', v)} />
                     <ColorInput label="Icon Color" value={(selectedBlock as FeatureData).iconColor} onChange={(v) => handleUpdate('iconColor', v)} />
                     <ColorInput label="Feature Title" value={(selectedBlock as FeatureData).featureTitleColor} onChange={(v) => handleUpdate('featureTitleColor', v)} />
                     <ColorInput label="Feature Text" value={(selectedBlock as FeatureData).featureDescColor} onChange={(v) => handleUpdate('featureDescColor', v)} />
                 </div>

                 <ArrayBuilder label="Features" items={(selectedBlock as FeatureData).features} onAdd={() => ({id:Math.random().toString(), title:'New Feature', description:'Desc', icon:'star'})} onUpdate={(i)=>handleUpdate('features', i)} renderItem={(item, i, update) => (
                     <div className="space-y-2">
                         <div className="flex gap-2">
                             <input className="w-2/3 rounded border-gray-300 text-xs p-1" value={item.title} onChange={(e) => update({...item, title: e.target.value})} />
                             <input className="w-1/3 rounded border-gray-300 text-xs p-1" value={item.icon} onChange={(e) => update({...item, icon: e.target.value})} placeholder="icon name" />
                         </div>
                         <textarea className="w-full rounded border-gray-300 text-xs p-1" rows={2} value={item.description} onChange={(e) => update({...item, description: e.target.value})} />
                     </div>
                 )} />
             </Section>
        )}

        {selectedBlock.type === 'pricing' && (
            <>
            <Section title="Pricing Style">
                <ColorInput label="Card Bg" value={(selectedBlock as PricingData).cardBg} onChange={(v) => handleUpdate('cardBg', v)} />
                <ColorInput label="Text Color" value={(selectedBlock as PricingData).textColor} onChange={(v) => handleUpdate('textColor', v)} />
                <ColorInput label="Accent Color" value={(selectedBlock as PricingData).accentColor} onChange={(v) => handleUpdate('accentColor', v)} />
            </Section>
            <ArrayBuilder label="Plans" items={(selectedBlock as PricingData).plans} onAdd={() => ({ id: Math.random().toString(), name: 'Plan', price: '$10', period: '/mo', features: ['Feature'], buttonText: 'Buy', isPopular: false, badgeText: 'Popular' })} onUpdate={(i) => handleUpdate('plans', i)} renderItem={(item, i, update) => (
                <div className="space-y-2">
                     <div className="flex gap-2">
                         <input className="w-1/3 rounded border-gray-300 text-xs p-1" value={item.name} onChange={(e) => update({...item, name: e.target.value})} placeholder="Name" />
                         <input className="w-1/3 rounded border-gray-300 text-xs p-1" value={item.price} onChange={(e) => update({...item, price: e.target.value})} placeholder="Price" />
                         <input className="w-1/3 rounded border-gray-300 text-xs p-1" value={item.period} onChange={(e) => update({...item, period: e.target.value})} placeholder="/mo" />
                     </div>
                     <div className="flex items-center gap-2">
                         <input type="checkbox" checked={item.isPopular} onChange={(e) => update({...item, isPopular: e.target.checked})} />
                         <label className="text-xs">Badge?</label>
                         {item.isPopular && <input className="flex-1 rounded border-gray-300 text-xs p-1" value={item.badgeText} onChange={(e) => update({...item, badgeText: e.target.value})} placeholder="Badge Text" />}
                     </div>
                     <input className="w-full rounded border-gray-300 text-xs p-1" value={item.buttonText} onChange={(e) => update({...item, buttonText: e.target.value})} placeholder="Button Text" />
                     <textarea className="w-full rounded border-gray-300 text-xs p-1" rows={2} value={item.features.join(',')} onChange={(e) => update({...item, features: e.target.value.split(',')})} placeholder="Features (comma separated)" />
                </div>
            )} />
            </>
        )}

        {selectedBlock.type === 'testimonial' && (
            <>
            <Section title="Testimonial Style">
                 <ColorInput label="Card Bg" value={(selectedBlock as TestimonialData).cardBg} onChange={(v) => handleUpdate('cardBg', v)} />
                 <ColorInput label="Text Color" value={(selectedBlock as TestimonialData).textColor} onChange={(v) => handleUpdate('textColor', v)} />
                 <ColorInput label="Star Color" value={(selectedBlock as TestimonialData).starColor} onChange={(v) => handleUpdate('starColor', v)} />
            </Section>
            <ArrayBuilder label="Reviews" items={(selectedBlock as TestimonialData).items} onAdd={() => ({ id: Math.random().toString(), name: 'User', role: 'Customer', quote: 'Great!', avatar: '', rating: 5 })} onUpdate={(i) => handleUpdate('items', i)} renderItem={(item, i, update) => (
                <div className="space-y-2">
                    <input className="w-full rounded border-gray-300 text-xs p-1" value={item.name} onChange={(e) => update({...item, name: e.target.value})} placeholder="Name" />
                    <input className="w-full rounded border-gray-300 text-xs p-1" value={item.role} onChange={(e) => update({...item, role: e.target.value})} placeholder="Role" />
                    <textarea className="w-full rounded border-gray-300 text-xs p-1" rows={2} value={item.quote} onChange={(e) => update({...item, quote: e.target.value})} placeholder="Quote" />
                    <div className="flex items-center gap-2">
                        <label className="text-xs">Rating: {item.rating}</label>
                        <input type="range" min="1" max="5" value={item.rating || 5} onChange={(e) => update({...item, rating: parseInt(e.target.value)})} className="w-24" />
                    </div>
                    <input className="w-full rounded border-gray-300 text-xs p-1" value={item.avatar} onChange={(e) => update({...item, avatar: e.target.value})} placeholder="Avatar URL" />
                </div>
            )} />
            </>
        )}

        {selectedBlock.type === 'cta' && (
            <Section title="CTA Content">
                 <TextInput label="Heading" value={(selectedBlock as CtaData).heading} onChange={(v: string) => handleUpdate('heading', v)} />
                 <ColorInput label="Heading Color" value={(selectedBlock as CtaData).headingColor} onChange={(v) => handleUpdate('headingColor', v)} />
                 <TextInput label="Subtext" value={(selectedBlock as CtaData).subtext} onChange={(v: string) => handleUpdate('subtext', v)} isArea />
                 <ColorInput label="Subtext Color" value={(selectedBlock as CtaData).subtextColor} onChange={(v) => handleUpdate('subtextColor', v)} />
                 
                 <div className="mt-4 border-t pt-2">
                    <Toggle label="Show Button" checked={(selectedBlock as CtaData).showButton} onChange={(v) => handleUpdate('showButton', v)} />
                    <TextInput label="Button Text" value={(selectedBlock as CtaData).buttonText} onChange={(v: string) => handleUpdate('buttonText', v)} />
                    <ColorInput label="Button Bg" value={(selectedBlock as CtaData).buttonBg} onChange={(v) => handleUpdate('buttonBg', v)} />
                    <ColorInput label="Button Text" value={(selectedBlock as CtaData).buttonTextColor} onChange={(v) => handleUpdate('buttonTextColor', v)} />
                 </div>
            </Section>
        )}

        {selectedBlock.type === 'split' && (
             <Section title="Split Content">
                 <SelectInput label="Image Side" value={(selectedBlock as SplitData).imageSide} options={[{label:'Left',value:'left'},{label:'Right',value:'right'}]} onChange={(v:any) => handleUpdate('imageSide', v)} />
                 <TextInput label="Title" value={(selectedBlock as SplitData).title} onChange={(v: string) => handleUpdate('title', v)} />
                 <TextInput label="Content" value={(selectedBlock as SplitData).content} onChange={(v: string) => handleUpdate('content', v)} isArea />
                 <ColorInput label="Text Color" value={(selectedBlock as SplitData).textColor} onChange={(v) => handleUpdate('textColor', v)} />
                 <TextInput label="Image URL" value={(selectedBlock as SplitData).imageUrl} onChange={(v: string) => handleUpdate('imageUrl', v)} />
             </Section>
        )}

        {selectedBlock.type === 'divider' && (
             <Section title="Divider Style">
                 <ColorInput label="Line Color" value={(selectedBlock as DividerBlockData).lineColor} onChange={(v) => handleUpdate('lineColor', v)} />
                 <SelectInput label="Width" value={(selectedBlock as DividerBlockData).lineWidth} options={[{label:'Full',value:'full'},{label:'Short',value:'short'},{label:'Middle',value:'middle'}]} onChange={(v:any) => handleUpdate('lineWidth', v)} />
                 <Toggle label="Show Line" checked={(selectedBlock as DividerBlockData).showLine} onChange={(v) => handleUpdate('showLine', v)} />
             </Section>
        )}

        {selectedBlock.type === 'team' && (
             <>
             <Section title="Team Settings">
                 <TextInput label="Heading" value={(selectedBlock as TeamData).heading} onChange={(v: string) => handleUpdate('heading', v)} />
                 <ColorInput label="Text Color" value={(selectedBlock as TeamData).textColor} onChange={(v) => handleUpdate('textColor', v)} />
             </Section>
             <ArrayBuilder label="Members" items={(selectedBlock as TeamData).members} onAdd={() => ({id:Math.random().toString(), name:'Name', role:'Role', bio:'Bio', image:''})} onUpdate={(i) => handleUpdate('members', i)} renderItem={(item, i, update) => (
                 <div className="space-y-2">
                     <input className="w-full rounded border-gray-300 text-xs p-1" value={item.name} onChange={(e) => update({...item, name: e.target.value})} placeholder="Name" />
                     <input className="w-full rounded border-gray-300 text-xs p-1" value={item.role} onChange={(e) => update({...item, role: e.target.value})} placeholder="Role" />
                     <textarea className="w-full rounded border-gray-300 text-xs p-1" rows={2} value={item.bio} onChange={(e) => update({...item, bio: e.target.value})} placeholder="Bio" />
                     <input className="w-full rounded border-gray-300 text-xs p-1" value={item.image} onChange={(e) => update({...item, image: e.target.value})} placeholder="Image URL" />
                 </div>
             )} />
             </>
        )}

        {selectedBlock.type === 'faq' && (
             <>
             <Section title="FAQ Settings">
                 <TextInput label="Heading" value={(selectedBlock as FaqData).heading} onChange={(v: string) => handleUpdate('heading', v)} />
                 <ColorInput label="Question Color" value={(selectedBlock as FaqData).questionColor} onChange={(v) => handleUpdate('questionColor', v)} />
                 <ColorInput label="Answer Color" value={(selectedBlock as FaqData).answerColor} onChange={(v) => handleUpdate('answerColor', v)} />
                 <ColorInput label="Card Bg" value={(selectedBlock as FaqData).cardBg} onChange={(v) => handleUpdate('cardBg', v)} />
             </Section>
             <ArrayBuilder label="Questions" items={(selectedBlock as FaqData).items} onAdd={() => ({id:Math.random().toString(), question:'?', answer:'...'})} onUpdate={(i)=>handleUpdate('items', i)} renderItem={(item, i, update) => (
                 <div className="space-y-2">
                     <input className="w-full rounded border-gray-300 text-xs p-1 font-bold" value={item.question} onChange={(e) => update({...item, question: e.target.value})} placeholder="Question" />
                     <textarea className="w-full rounded border-gray-300 text-xs p-1" rows={2} value={item.answer} onChange={(e) => update({...item, answer: e.target.value})} placeholder="Answer" />
                 </div>
             )} />
             </>
        )}

        {selectedBlock.type === 'map' && (
            <Section title="Map Details">
                 <TextInput label="Address" value={(selectedBlock as MapData).address} onChange={(v: string) => handleUpdate('address', v)} placeholder="City, State" />
                 <TextInput label="Height (px)" type="number" value={(selectedBlock as MapData).height} onChange={(v: string) => handleUpdate('height', Number(v))} />
            </Section>
        )}
        
        {selectedBlock.type === 'form' && (
             <Section title="Form Styles">
                 <TextInput label="Title" value={(selectedBlock as FormData).title} onChange={(v: string) => handleUpdate('title', v)} />
                 <ColorInput label="Input Background" value={(selectedBlock as FormData).inputBg} onChange={(v) => handleUpdate('inputBg', v)} />
                 <ColorInput label="Input Border" value={(selectedBlock as FormData).inputBorderColor || '#e5e7eb'} onChange={(v) => handleUpdate('inputBorderColor', v)} />
                 <ColorInput label="Button Bg" value={(selectedBlock as FormData).buttonBg} onChange={(v) => handleUpdate('buttonBg', v)} />
             </Section>
        )}

      </div>
    </aside>
  );
};
