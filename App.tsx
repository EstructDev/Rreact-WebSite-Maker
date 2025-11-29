
import React, { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { Canvas } from './components/Canvas';
import { PropertiesPanel } from './components/PropertiesPanel';
import { BlockType, BlockData, BLOCK_TEMPLATES, GlobalSettings, AppPreferences } from './types';

const generateId = () => Math.random().toString(36).substr(2, 9);

const PADDING_MAP: Record<string, string> = {
    none: '0', xs: '8', sm: '12', md: '20', lg: '32', xl: '48', '2xl': '64'
};

// Preferences Modal Component
const PreferencesModal = ({ isOpen, onClose, prefs, onUpdate }: { isOpen: boolean, onClose: () => void, prefs: AppPreferences, onUpdate: (p: AppPreferences) => void }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold">App Preferences</h2>
                    <button onClick={onClose}><span className="material-symbols-outlined">close</span></button>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span>Dark Mode (Editor)</span>
                        <input type="checkbox" checked={prefs.darkMode} onChange={(e) => onUpdate({...prefs, darkMode: e.target.checked})} className="toggle" />
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Show Grid Lines</span>
                        <input type="checkbox" checked={prefs.showGridLines} onChange={(e) => onUpdate({...prefs, showGridLines: e.target.checked})} className="toggle" />
                    </div>
                    <div>
                         <label className="block mb-2 text-sm font-bold">Language</label>
                         <select value={prefs.language} onChange={(e) => onUpdate({...prefs, language: e.target.value as any})} className="w-full rounded border-gray-300 p-2">
                             <option value="en">English</option>
                             <option value="pt">Português</option>
                             <option value="es">Español</option>
                             <option value="fr">Français</option>
                         </select>
                    </div>
                </div>
                <button onClick={onClose} className="mt-6 w-full rounded-lg bg-indigo-600 py-3 font-bold text-white hover:bg-indigo-700">Done</button>
            </div>
        </div>
    )
}

function App() {
  const [blocks, setBlocks] = useState<BlockData[]>([
    { ...BLOCK_TEMPLATES.navigation, instanceId: 'nav-init', id: 'nav' } as any,
    { ...BLOCK_TEMPLATES.hero, instanceId: 'hero-init', id: 'hero' } as any,
  ]);
  
  // Undo/Redo
  const [past, setPast] = useState<BlockData[][]>([]);
  const [future, setFuture] = useState<BlockData[][]>([]);

  const commitHistory = (newBlocks: BlockData[]) => {
      setPast(prev => [...prev, blocks]);
      setFuture([]);
      setBlocks(newBlocks);
  };

  const undo = () => {
      if (past.length === 0) return;
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      setPast(newPast);
      setFuture(prev => [blocks, ...prev]);
      setBlocks(previous);
  };

  const redo = () => {
      if (future.length === 0) return;
      const next = future[0];
      const newFuture = future.slice(1);
      setPast(prev => [...prev, blocks]);
      setFuture(newFuture);
      setBlocks(next);
  };

  const [selectedBlockId, setSelectedBlockId] = useState<string | null>('hero-init');
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  
  const [globalSettings, setGlobalSettings] = useState<GlobalSettings>({
    title: 'My Awesome Site', description: 'Created with Website Builder', keywords: '', ogImage: '', robots: 'User-agent: *', author: '',
    fontFamily: 'sans', primaryColor: '#4F46E5', secondaryColor: '#E5E7EB', backgroundColor: '#F9FAFB', textColor: '#111827', accentColor: '#FBBF24',
  });

  const [appPreferences, setAppPreferences] = useState<AppPreferences>({
      darkMode: false, showGridLines: false, language: 'en'
  });

  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'blocks' | 'settings'>('editor');

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', globalSettings.primaryColor);
    root.style.setProperty('--color-secondary', globalSettings.secondaryColor);
    root.style.setProperty('--color-bg', globalSettings.backgroundColor);
    root.style.setProperty('--color-text', globalSettings.textColor);
    root.style.setProperty('--color-accent', globalSettings.accentColor);
  }, [globalSettings]);

  const addBlock = (type: BlockType) => {
    const newBlock = { ...BLOCK_TEMPLATES[type], instanceId: generateId() } as BlockData;
    commitHistory([...blocks, newBlock]);
    setSelectedBlockId(newBlock.instanceId);
    setActiveTab('editor');
  };

  const updateBlock = (instanceId: string, newData: BlockData) => {
    commitHistory(blocks.map(b => b.instanceId === instanceId ? newData : b));
  };

  const moveBlock = (instanceId: string, direction: 'up' | 'down') => {
    const index = blocks.findIndex(b => b.instanceId === instanceId);
    if (index === -1) return;
    const newBlocks = [...blocks];
    if (direction === 'up' && index > 0) {
      [newBlocks[index], newBlocks[index - 1]] = [newBlocks[index - 1], newBlocks[index]];
    } else if (direction === 'down' && index < newBlocks.length - 1) {
      [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
    }
    commitHistory(newBlocks);
  };

  const deleteBlock = (instanceId: string) => {
    const newBlocks = blocks.filter(b => b.instanceId !== instanceId);
    commitHistory(newBlocks);
    if (selectedBlockId === instanceId) setSelectedBlockId(null);
  };

  const duplicateBlock = (instanceId: string) => {
    const blockToDup = blocks.find(b => b.instanceId === instanceId);
    if (!blockToDup) return;
    const newBlock = { ...blockToDup, instanceId: generateId() };
    const index = blocks.findIndex(b => b.instanceId === instanceId);
    const newBlocks = [...blocks];
    newBlocks.splice(index + 1, 0, newBlock);
    commitHistory(newBlocks);
  };

  // --- EXPORT LOGIC ---
  const generateHTML = () => {
    const content = blocks.map(block => {
        let style = `background: ${block.backgroundType === 'gradient' ? block.gradient : block.backgroundColor};`;
        if(block.backgroundType === 'image') style += `background-image: url(${block.backgroundImage}); background-size: cover; background-position: center;`;
        
        const pt = `pt-${PADDING_MAP[block.paddingTop] || 20}`;
        const pb = `pb-${PADDING_MAP[block.paddingBottom] || 20}`;

        let blockContent = '';
        
        if (block.type === 'hero') {
            const b = block as any;
            blockContent = `
            <div class="container mx-auto px-4 text-${b.alignment} py-20 relative z-10">
                <h1 class="text-4xl md:text-6xl font-bold mb-6" style="color:${b.headingColor}">${b.heading}</h1>
                <p class="text-xl md:text-2xl mb-8" style="color:${b.subheadingColor}">${b.subheading}</p>
                <div class="flex gap-4 justify-${b.alignment === 'center' ? 'center' : b.alignment === 'right' ? 'end' : 'start'}">
                    ${b.showButton1 ? `<a href="${b.button1Url}" class="px-8 py-3 rounded bg-[${b.button1Bg}] text-[${b.button1Color}] font-bold shadow-lg">${b.button1Text}</a>` : ''}
                    ${b.showButton2 ? `<a href="${b.button2Url}" class="px-8 py-3 rounded bg-[${b.button2Bg}] text-[${b.button2Color}] font-bold border" style="border-color:${b.button2Color}">${b.button2Text}</a>` : ''}
                </div>
            </div>`;
        } 
        else if (block.type === 'feature') {
            const b = block as any;
            const gridClass = b.gridCols === 2 ? 'md:grid-cols-2' : b.gridCols === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3';
            blockContent = `
            <div class="container mx-auto px-4">
                <div class="text-center mb-16 max-w-4xl mx-auto">
                    <h2 class="text-3xl font-bold mb-4" style="color:${b.titleColor}">${b.title}</h2>
                    <p class="text-lg" style="color:${b.descriptionColor}">${b.description}</p>
                </div>
                <div class="grid gap-8 ${gridClass}">
                    ${b.features.map((f:any) => `
                    <div class="p-6 rounded-lg shadow-sm" style="background-color:${b.cardBgColor}">
                        <div class="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style="background-color:${b.iconBgColor}; color:${b.iconColor}">
                            <span class="material-symbols-outlined">${f.icon}</span>
                        </div>
                        <h3 class="text-xl font-bold mb-2" style="color:${b.featureTitleColor}">${f.title}</h3>
                        <p style="color:${b.featureDescColor}">${f.description}</p>
                    </div>`).join('')}
                </div>
            </div>`;
        }
        else if (block.type === 'cta') {
            const b = block as any;
            blockContent = `
            <div class="container mx-auto px-4 text-center relative z-10">
                <h2 class="text-4xl font-bold mb-6" style="color:${b.headingColor}">${b.heading}</h2>
                <p class="text-xl mb-8 max-w-2xl mx-auto" style="color:${b.subtextColor}">${b.subtext}</p>
                ${b.showButton ? `<a href="${b.destinationUrl}" class="inline-block px-8 py-4 font-bold rounded shadow-lg transition-transform hover:-translate-y-1" style="background-color:${b.buttonBg}; color:${b.buttonTextColor}">${b.buttonText}</a>` : ''}
            </div>`;
        }
        else if (block.type === 'pricing') {
            const b = block as any;
            blockContent = `
            <div class="container mx-auto px-4 py-12">
                <div class="grid md:grid-cols-3 gap-8">
                ${b.plans.map((p: any) => `
                    <div class="relative p-8 border rounded-lg flex flex-col" style="background-color:${b.cardBg}; border-color:${p.isPopular ? b.accentColor : '#e5e7eb'}">
                        ${p.isPopular ? `<div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 text-xs font-bold text-white rounded-full uppercase tracking-wide" style="background-color:${b.accentColor}">${p.badgeText || 'Most Popular'}</div>` : ''}
                        <h3 class="text-xl font-bold mb-4" style="color:${b.textColor}">${p.name}</h3>
                        <div class="text-4xl font-bold mb-6" style="color:${b.textColor}">${p.price}<span class="text-lg opacity-70">${p.period}</span></div>
                        <ul class="mb-8 space-y-3 flex-1">
                            ${p.features.map((f:string) => `<li class="flex items-center gap-2"><span style="color:${b.accentColor}">✔</span> <span style="color:${b.textColor}">${f}</span></li>`).join('')}
                        </ul>
                        <a href="#" class="block text-center py-3 rounded font-bold transition-opacity hover:opacity-90" style="background-color:${p.isPopular ? b.accentColor : '#f3f4f6'}; color:${p.isPopular ? '#fff' : '#1f2937'}">${p.buttonText}</a>
                    </div>
                `).join('')}
                </div>
            </div>`;
        }
        else if (block.type === 'testimonial') {
            const b = block as any;
            blockContent = `
            <div class="container mx-auto px-4">
                <div class="grid md:grid-cols-3 gap-8">
                    ${b.items.map((item:any) => `
                    <div class="p-8 rounded-lg shadow-sm border border-gray-100" style="background-color:${b.cardBg}">
                        <div class="flex gap-1 mb-4" style="color:${b.starColor}">
                            ${Array(5).fill(0).map((_, i) => `<span class="material-symbols-outlined text-sm">${i < (item.rating || 5) ? 'star' : 'star_border'}</span>`).join('')}
                        </div>
                        <p class="text-lg italic mb-6 opacity-80" style="color:${b.textColor}">"${item.quote}"</p>
                        <div class="flex items-center gap-4">
                             ${item.avatar ? `<img src="${item.avatar}" class="w-12 h-12 rounded-full object-cover">` : `<div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"><span class="material-symbols-outlined text-gray-400">person</span></div>`}
                             <div>
                                <p class="font-bold" style="color:${b.textColor}">${item.name}</p>
                                <p class="text-sm opacity-60" style="color:${b.textColor}">${item.role}</p>
                             </div>
                        </div>
                    </div>`).join('')}
                </div>
            </div>`;
        }
        else if (block.type === 'team') {
            const b = block as any;
            blockContent = `
            <div class="container mx-auto px-4">
                <h2 class="text-4xl font-bold text-center mb-16" style="color:${b.textColor}">${b.heading}</h2>
                <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
                    ${b.members.map((m:any) => `
                    <div class="text-center">
                        <div class="w-40 h-40 mx-auto mb-6 overflow-hidden rounded-full bg-gray-200 shadow-md">
                            <img src="${m.image}" alt="${m.name}" class="w-full h-full object-cover">
                        </div>
                        <h3 class="text-xl font-bold mb-1" style="color:${b.textColor}">${m.name}</h3>
                        <p class="text-sm uppercase tracking-wide opacity-70 mb-4" style="color:${b.textColor}">${m.role}</p>
                        <p class="opacity-80 max-w-xs mx-auto" style="color:${b.textColor}">${m.bio}</p>
                    </div>`).join('')}
                </div>
            </div>`;
        }
        else if (block.type === 'faq') {
            const b = block as any;
            blockContent = `
            <div class="container mx-auto px-4 max-w-3xl">
                <h2 class="text-3xl font-bold text-center mb-12" style="color:${b.questionColor}">${b.heading}</h2>
                <div class="space-y-4">
                    ${b.items.map((item:any) => `
                    <details class="group p-6 rounded-xl cursor-pointer" style="background-color:${b.cardBg}">
                        <summary class="flex justify-between items-center font-bold list-none">
                            <span style="color:${b.questionColor}">${item.question}</span>
                            <span class="material-symbols-outlined">expand_more</span>
                        </summary>
                        <div class="mt-4 opacity-90 leading-relaxed" style="color:${b.answerColor}">${item.answer}</div>
                    </details>`).join('')}
                </div>
            </div>`;
        }
        else if (block.type === 'navigation') {
            const b = block as any;
            if (b.layoutStyle === 'sidebar') {
                blockContent = `
                <div class="flex flex-col h-full w-64 p-6 fixed left-0 top-0 bottom-0 shadow-lg" style="background-color:${b.backgroundColor}">
                   <div class="mb-10 text-2xl font-bold" style="color:${b.textColor}">${b.logoText}</div>
                   <div class="flex flex-col gap-4 flex-1">
                      ${b.links.map((l:any) => `<a href="${l.href}" class="block py-2 font-medium" style="color:${b.linkColor}">${l.label}</a>`).join('')}
                   </div>
                </div>`;
            } else {
                blockContent = `
                <div class="container mx-auto px-4 flex justify-between items-center h-16">
                    <div class="text-2xl font-bold" style="color:${b.textColor}">${b.logoText}</div>
                    <div class="hidden md:flex gap-8">
                        ${b.links.map((l:any) => `<a href="${l.href}" class="font-medium" style="color:${b.linkColor}">${l.label}</a>`).join('')}
                    </div>
                    ${b.showButton ? `<a href="${b.buttonUrl}" class="px-5 py-2 rounded font-bold" style="background:${b.buttonBg}; color:${b.buttonTextColor}">${b.buttonText}</a>` : ''}
                </div>`;
            }
        }
        else if (block.type === 'split') {
            const b = block as any;
            const order = b.imageSide === 'right' ? 'flex-row' : 'flex-row-reverse';
            blockContent = `
            <div class="container mx-auto px-4 py-12">
                <div class="flex flex-col md:${order} items-center gap-12">
                    <div class="flex-1">
                        <h2 class="text-3xl font-bold mb-4" style="color:${b.textColor}">${b.title}</h2>
                        <div style="color:${b.textColor}">${b.content}</div>
                    </div>
                    <div class="flex-1">
                        <img src="${b.imageUrl}" alt="Split" class="rounded-lg shadow-xl w-full" />
                    </div>
                </div>
            </div>`;
        }
        else if (block.type === 'map') {
            const b = block as any;
            blockContent = `
            <div class="container mx-auto px-4">
                <div class="w-full rounded-xl overflow-hidden shadow-md" style="height:${b.height}px">
                    <iframe width="100%" height="100%" frameborder="0" src="https://maps.google.com/maps?q=${encodeURIComponent(b.address)}&z=${b.zoom}&output=embed"></iframe>
                </div>
            </div>`;
        }
        else if (block.type === 'form') {
            const b = block as any;
            blockContent = `
            <div class="container mx-auto px-4">
                <div class="max-w-2xl mx-auto p-8 rounded-xl ${b.boxShadow ? 'shadow-2xl' : ''}" style="background-color:${b.backgroundColor === 'transparent' ? '#ffffff' : b.backgroundColor}">
                    <div class="text-center mb-10">
                        <h2 class="text-3xl font-bold mb-2" style="color:${b.textColor}">${b.title}</h2>
                        <p style="color:${b.textColor}">${b.subtitle}</p>
                    </div>
                    <form class="space-y-6">
                        ${b.fields.map((f:any) => `
                        <div class="flex flex-col gap-1">
                            <label class="font-semibold text-sm" style="color:${b.textColor}">${f.label}</label>
                            ${f.type === 'textarea' 
                            ? `<textarea placeholder="${f.placeholder}" class="w-full p-3 rounded border" style="background:${b.inputBg}"></textarea>`
                            : `<input type="${f.type}" placeholder="${f.placeholder}" class="w-full p-3 rounded border" style="background:${b.inputBg}">`}
                        </div>`).join('')}
                        <button type="submit" class="w-full py-4 font-bold rounded-lg shadow-lg hover:shadow-xl" style="background-color:${b.buttonBg}; color:${b.buttonTextColor}">${b.submitText}</button>
                    </form>
                </div>
            </div>`;
        }
        else if (block.type === 'image') {
            const b = block as any;
            blockContent = `
            <div class="container mx-auto px-4 text-${b.align}">
                <figure class="inline-block ${b.width === 'full' ? 'w-full' : 'max-w-5xl'}">
                    <img src="${b.url}" alt="${b.alt}" class="w-full h-auto ${b.shadow ? 'shadow-lg' : ''}" style="border-radius:0.5rem">
                    ${b.caption ? `<figcaption class="mt-2 text-center text-sm text-gray-500 bg-white/80 inline-block px-2 rounded">${b.caption}</figcaption>` : ''}
                </figure>
            </div>`;
        }
        else if (block.type === 'text') {
            const b = block as any;
            blockContent = `
            <div class="container mx-auto px-4">
                <div style="text-align:${b.align}; font-weight:${b.fontWeight}; color:${b.color}" class="text-${b.fontSize}">
                    ${b.content}
                </div>
            </div>`;
        }
        else if (block.type === 'button') {
            const b = block as any;
            blockContent = `
            <div class="container mx-auto px-4 flex justify-${b.align === 'center' ? 'center' : b.align === 'right' ? 'end' : 'start'}">
                <a href="${b.url}" class="inline-block px-6 py-3 font-bold transition-opacity hover:opacity-80" style="background-color:${b.variant === 'outline' ? 'transparent' : b.buttonBg}; color:${b.variant === 'outline' ? b.buttonBg : b.buttonColor}; border: ${b.variant === 'outline' ? '2px solid '+b.buttonBg : 'none'}; border-radius:0.5rem">
                    ${b.text}
                </a>
            </div>`;
        }
        else if (block.type === 'divider') {
            const b = block as any;
            const width = b.lineWidth === 'full' ? '100%' : b.lineWidth === 'short' ? '20%' : '50%';
            blockContent = `
            <div class="container mx-auto px-4">
                ${b.showLine ? `<div style="height:1px; background-color:${b.lineColor}; width:${width}; margin:0 auto"></div>` : ''}
            </div>`;
        }
        else if (block.type === 'footer') {
            const b = block as any;
            blockContent = `
            <div class="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <div style="color:${b.textColor}">${b.copyrightText}</div>
                <div class="flex gap-4">
                    ${b.socialLinks.map((s:any) => `<a href="${s.url}" style="color:${b.iconColor}">${s.platform}</a>`).join('')}
                </div>
            </div>`;
        }
        else {
             // Generic fallback
             blockContent = `<div class="container mx-auto px-4 py-12"><h2 class="text-2xl font-bold">Block Type: ${block.type}</h2></div>`;
        }

        return `<section id="${block.anchorId}" style="${style}" class="${pt} ${pb} animate__animated animate__${block.animation || 'none'}">
           ${blockContent}
        </section>`;
    }).join('\n');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${globalSettings.title}</title>
    <meta name="description" content="${globalSettings.description}">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,0" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=${globalSettings.fontFamily === 'sans' ? 'Inter' : globalSettings.fontFamily === 'serif' ? 'Merriweather' : globalSettings.fontFamily === 'mono' ? 'Roboto+Mono' : 'Playfair+Display'}:wght@400;700&display=swap" rel="stylesheet">
    <style>
      :root {
        --color-primary: ${globalSettings.primaryColor};
        --color-secondary: ${globalSettings.secondaryColor};
        --color-bg: ${globalSettings.backgroundColor};
        --color-text: ${globalSettings.textColor};
      }
      body { font-family: '${globalSettings.fontFamily === 'sans' ? 'Inter' : globalSettings.fontFamily === 'serif' ? 'Merriweather' : globalSettings.fontFamily === 'mono' ? 'Roboto Mono' : 'Playfair Display'}', sans-serif; background: var(--color-bg); color: var(--color-text); }
      .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
    </style>
</head>
<body>
    ${content}
</body>
</html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();
  };

  const generateReact = () => {
    // Generate React component code mimicking the structure of the HTML generator but in JSX
    const blocksJSX = blocks.map(block => {
        let styleObj = `{{ background: '${block.backgroundType === 'gradient' ? block.gradient : block.backgroundColor}'${block.backgroundType === 'image' ? `, backgroundImage: 'url(${block.backgroundImage})', backgroundSize: 'cover', backgroundPosition: 'center'` : ''} }}`;
        
        const pt = `pt-${PADDING_MAP[block.paddingTop] || 20}`;
        const pb = `pb-${PADDING_MAP[block.paddingBottom] || 20}`;

        let contentJSX = '';
        if (block.type === 'hero') {
            const b = block as any;
            contentJSX = `
            <div className="container mx-auto px-4 text-${b.alignment} py-20 relative z-10">
                <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{color:'${b.headingColor}'}}>${b.heading}</h1>
                <p className="text-xl md:text-2xl mb-8" style={{color:'${b.subheadingColor}'}}>${b.subheading}</p>
                <div className="flex gap-4 justify-${b.alignment === 'center' ? 'center' : b.alignment === 'right' ? 'end' : 'start'}">
                    ${b.showButton1 ? `<a href="${b.button1Url}" className="px-8 py-3 rounded font-bold shadow-lg" style={{backgroundColor:'${b.button1Bg}', color:'${b.button1Color}'}}>${b.button1Text}</a>` : ''}
                    ${b.showButton2 ? `<a href="${b.button2Url}" className="px-8 py-3 rounded font-bold border" style={{backgroundColor:'${b.button2Bg}', color:'${b.button2Color}', borderColor:'${b.button2Color}'}}>${b.button2Text}</a>` : ''}
                </div>
            </div>`;
        } 
        else if (block.type === 'feature') {
            const b = block as any;
            const gridClass = b.gridCols === 2 ? 'md:grid-cols-2' : b.gridCols === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3';
            contentJSX = `
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4" style={{color:'${b.titleColor}'}}>${b.title}</h2>
                    <p className="text-lg" style={{color:'${b.descriptionColor}'}}>${b.description}</p>
                </div>
                <div className="grid gap-8 ${gridClass}">
                    {${JSON.stringify(b.features)}.map((f:any, i:number) => (
                    <div key={i} className="p-6 rounded-lg shadow-sm" style={{backgroundColor:'${b.cardBgColor}'}}>
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{backgroundColor:'${b.iconBgColor}', color:'${b.iconColor}'}}>
                            <span className="material-symbols-outlined">{f.icon}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2" style={{color:'${b.featureTitleColor}'}}>{f.title}</h3>
                        <p style={{color:'${b.featureDescColor}'}}>{f.description}</p>
                    </div>
                    ))}
                </div>
            </div>`;
        }
        else if (block.type === 'cta') {
            const b = block as any;
            contentJSX = `
            <div className="container mx-auto px-4 text-center relative z-10">
                <h2 className="text-4xl font-bold mb-6" style={{color:'${b.headingColor}'}}>${b.heading}</h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto" style={{color:'${b.subtextColor}'}}>${b.subtext}</p>
                ${b.showButton ? `<a href="${b.destinationUrl}" className="inline-block px-8 py-4 font-bold rounded shadow-lg hover:-translate-y-1 transition-transform" style={{backgroundColor:'${b.buttonBg}', color:'${b.buttonTextColor}'}}>${b.buttonText}</a>` : ''}
            </div>`;
        }
        else if (block.type === 'pricing') {
             const b = block as any;
             contentJSX = `
             <div className="container mx-auto px-4 py-12">
                 <div className="grid md:grid-cols-3 gap-8">
                 {${JSON.stringify(b.plans)}.map((p:any, i:number) => (
                     <div key={i} className="relative p-8 border rounded-lg flex flex-col" style={{backgroundColor:'${b.cardBg}', borderColor: p.isPopular ? '${b.accentColor}' : '#e5e7eb'}}>
                         {p.isPopular && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 text-xs font-bold text-white rounded-full uppercase tracking-wide" style={{backgroundColor:'${b.accentColor}'}}>{p.badgeText || 'Popular'}</div>}
                         <h3 className="text-xl font-bold mb-4" style={{color:'${b.textColor}'}}>{p.name}</h3>
                         <div className="text-4xl font-bold mb-6" style={{color:'${b.textColor}'}}>{p.price}<span className="text-lg opacity-70">{p.period}</span></div>
                         <ul className="mb-8 space-y-3 flex-1">
                             {p.features.map((f:string, j:number) => <li key={j} className="flex items-center gap-2"><span style={{color:'${b.accentColor}'}}>✔</span> <span style={{color:'${b.textColor}'}}>{f}</span></li>)}
                         </ul>
                         <a href="#" className="block text-center py-3 rounded font-bold transition-opacity hover:opacity-90" style={{backgroundColor: p.isPopular ? '${b.accentColor}' : '#f3f4f6', color: p.isPopular ? '#fff' : '#1f2937'}}>{p.buttonText}</a>
                     </div>
                 ))}
                 </div>
             </div>`;
        }
        else if (block.type === 'testimonial') {
             const b = block as any;
             contentJSX = `
             <div className="container mx-auto px-4">
                 <div className="grid md:grid-cols-3 gap-8">
                     {${JSON.stringify(b.items)}.map((item:any, i:number) => (
                     <div key={i} className="p-8 rounded-lg shadow-sm border border-gray-100" style={{backgroundColor:'${b.cardBg}'}}>
                         <div className="flex gap-1 mb-4" style={{color:'${b.starColor}'}}>
                             {Array(5).fill(0).map((_, i) => <span key={i} className={\`material-symbols-outlined text-sm \${i < (item.rating || 5) ? 'fill-current' : 'opacity-30'}\`}>star</span>)}
                         </div>
                         <p className="text-lg italic mb-6 opacity-80" style={{color:'${b.textColor}'}}>"{item.quote}"</p>
                         <div className="flex items-center gap-4">
                              {item.avatar ? <img src={item.avatar} className="w-12 h-12 rounded-full object-cover" /> : <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"><span className="material-symbols-outlined text-gray-400">person</span></div>}
                              <div>
                                 <p className="font-bold" style={{color:'${b.textColor}'}}>{item.name}</p>
                                 <p className="text-sm opacity-60" style={{color:'${b.textColor}'}}>{item.role}</p>
                              </div>
                         </div>
                     </div>
                     ))}
                 </div>
             </div>`;
        }
        else if (block.type === 'team') {
             const b = block as any;
             contentJSX = `
             <div className="container mx-auto px-4">
                 <h2 className="text-4xl font-bold text-center mb-16" style={{color:'${b.textColor}'}}>${b.heading}</h2>
                 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
                     {${JSON.stringify(b.members)}.map((m:any, i:number) => (
                     <div key={i} className="text-center">
                         <div className="w-40 h-40 mx-auto mb-6 overflow-hidden rounded-full bg-gray-200 shadow-md">
                             <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                         </div>
                         <h3 className="text-xl font-bold mb-1" style={{color:'${b.textColor}'}}>{m.name}</h3>
                         <p className="text-sm uppercase tracking-wide opacity-70 mb-4" style={{color:'${b.textColor}'}}>{m.role}</p>
                         <p className="opacity-80 max-w-xs mx-auto" style={{color:'${b.textColor}'}}>{m.bio}</p>
                     </div>
                     ))}
                 </div>
             </div>`;
        }
        else if (block.type === 'faq') {
             const b = block as any;
             contentJSX = `
             <div className="container mx-auto px-4 max-w-3xl">
                 <h2 className="text-3xl font-bold text-center mb-12" style={{color:'${b.questionColor}'}}>${b.heading}</h2>
                 <div className="space-y-4">
                     {${JSON.stringify(b.items)}.map((item:any, i:number) => (
                     <details key={i} className="group p-6 rounded-xl cursor-pointer" style={{backgroundColor:'${b.cardBg}'}}>
                         <summary className="flex justify-between items-center font-bold list-none">
                             <span style={{color:'${b.questionColor}'}}>{item.question}</span>
                             <span className="material-symbols-outlined">expand_more</span>
                         </summary>
                         <div className="mt-4 opacity-90 leading-relaxed" style={{color:'${b.answerColor}'}}>{item.answer}</div>
                     </details>
                     ))}
                 </div>
             </div>`;
        }
        else if (block.type === 'navigation') {
            const b = block as any;
            if (b.layoutStyle === 'sidebar') {
                contentJSX = `
                <div className="flex flex-col h-full w-64 p-6 fixed left-0 top-0 bottom-0 shadow-lg" style={{backgroundColor:'${b.backgroundColor}'}}>
                   <div className="mb-10 text-2xl font-bold" style={{color:'${b.textColor}'}}>${b.logoText}</div>
                   <div className="flex flex-col gap-4 flex-1">
                      {${JSON.stringify(b.links)}.map((l:any, i:number) => <a key={i} href={l.href} className="block py-2 font-medium" style={{color:'${b.linkColor}'}}>{l.label}</a>)}
                   </div>
                </div>`;
            } else {
                contentJSX = `
                <div className="container mx-auto px-4 flex justify-between items-center h-16">
                    <div className="text-2xl font-bold" style={{color:'${b.textColor}'}}>${b.logoText}</div>
                    <div className="hidden md:flex gap-8">
                        {${JSON.stringify(b.links)}.map((l:any, i:number) => <a key={i} href={l.href} className="font-medium" style={{color:'${b.linkColor}'}}>{l.label}</a>)}
                    </div>
                    ${b.showButton ? `<a href="${b.buttonUrl}" className="px-5 py-2 rounded font-bold" style={{backgroundColor:'${b.buttonBg}', color:'${b.buttonTextColor}'}}>${b.buttonText}</a>` : ''}
                </div>`;
            }
        }
        else if (block.type === 'split') {
            const b = block as any;
            const order = b.imageSide === 'right' ? 'flex-row' : 'flex-row-reverse';
            contentJSX = `
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col md:${order} items-center gap-12">
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-4" style={{color:'${b.textColor}'}}>${b.title}</h2>
                        <div style={{color:'${b.textColor}'}} dangerouslySetInnerHTML={{__html: \`${b.content}\`}} />
                    </div>
                    <div className="flex-1">
                        <img src="${b.imageUrl}" alt="Split" className="rounded-lg shadow-xl w-full" />
                    </div>
                </div>
            </div>`;
        }
        else if (block.type === 'map') {
            const b = block as any;
            contentJSX = `
            <div className="container mx-auto px-4">
                <div className="w-full rounded-xl overflow-hidden shadow-md" style={{height:'${b.height}px'}}>
                    <iframe width="100%" height="100%" frameBorder="0" src={\`https://maps.google.com/maps?q=\${encodeURIComponent('${b.address}')}&z=${b.zoom}&output=embed\`} title="Map"></iframe>
                </div>
            </div>`;
        }
        else if (block.type === 'form') {
             const b = block as any;
             contentJSX = `
             <div className="container mx-auto px-4">
                 <div className="max-w-2xl mx-auto p-8 rounded-xl ${b.boxShadow ? 'shadow-2xl' : ''}" style={{backgroundColor: '${b.backgroundColor === 'transparent' ? '#ffffff' : b.backgroundColor}'}}>
                     <div className="text-center mb-10">
                         <h2 className="text-3xl font-bold mb-2" style={{color:'${b.textColor}'}}>${b.title}</h2>
                         <p style={{color:'${b.textColor}'}}>${b.subtitle}</p>
                     </div>
                     <form className="space-y-6">
                         {${JSON.stringify(b.fields)}.map((f:any, i:number) => (
                         <div key={i} className="flex flex-col gap-1">
                             <label className="font-semibold text-sm" style={{color:'${b.textColor}'}}>{f.label}</label>
                             {f.type === 'textarea' 
                             ? <textarea placeholder={f.placeholder} className="w-full p-3 rounded border" style={{background:'${b.inputBg}'}}></textarea>
                             : <input type={f.type} placeholder={f.placeholder} className="w-full p-3 rounded border" style={{background:'${b.inputBg}'}} />}
                         </div>
                         ))}
                         <button type="submit" className="w-full py-4 font-bold rounded-lg shadow-lg hover:shadow-xl" style={{backgroundColor:'${b.buttonBg}', color:'${b.buttonTextColor}'}}>${b.submitText}</button>
                     </form>
                 </div>
             </div>`;
        }
        else if (block.type === 'image') {
             const b = block as any;
             contentJSX = `
             <div className="container mx-auto px-4 text-${b.align}">
                 <figure className="inline-block ${b.width === 'full' ? 'w-full' : 'max-w-5xl'}">
                     <img src="${b.url}" alt="${b.alt}" className="w-full h-auto ${b.shadow ? 'shadow-lg' : ''}" style={{borderRadius:'0.5rem'}} />
                     ${b.caption ? `<figcaption className="mt-2 text-center text-sm text-gray-500 bg-white/80 inline-block px-2 rounded">${b.caption}</figcaption>` : ''}
                 </figure>
             </div>`;
        }
        else if (block.type === 'text') {
             const b = block as any;
             contentJSX = `
             <div className="container mx-auto px-4">
                 <div style={{textAlign:'${b.align}', fontWeight:'${b.fontWeight}', color:'${b.color}'}} className="text-${b.fontSize}" dangerouslySetInnerHTML={{__html: \`${b.content}\`}} />
             </div>`;
        }
        else if (block.type === 'button') {
             const b = block as any;
             contentJSX = `
             <div className="container mx-auto px-4 flex justify-${b.align === 'center' ? 'center' : b.align === 'right' ? 'end' : 'start'}">
                 <a href="${b.url}" className="inline-block px-6 py-3 font-bold transition-opacity hover:opacity-80" style={{backgroundColor:'${b.variant === 'outline' ? 'transparent' : b.buttonBg}', color:'${b.variant === 'outline' ? b.buttonBg : b.buttonColor}', border: '${b.variant === 'outline' ? '2px solid '+b.buttonBg : 'none'}', borderRadius:'0.5rem'}}>
                     ${b.text}
                 </a>
             </div>`;
        }
        else if (block.type === 'divider') {
             const b = block as any;
             const width = b.lineWidth === 'full' ? '100%' : b.lineWidth === 'short' ? '20%' : '50%';
             contentJSX = `
             <div className="container mx-auto px-4">
                 ${b.showLine ? `<div style={{height:'1px', backgroundColor:'${b.lineColor}', width:'${width}', margin:'0 auto'}}></div>` : ''}
             </div>`;
        }
        else if (block.type === 'footer') {
             const b = block as any;
             contentJSX = `
             <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
                 <div style={{color:'${b.textColor}'}}>${b.copyrightText}</div>
                 <div className="flex gap-4">
                     {${JSON.stringify(b.socialLinks)}.map((s:any, i:number) => <a key={i} href={s.url} style={{color:'${b.iconColor}'}}>{s.platform}</a>)}
                 </div>
             </div>`;
        }
        else {
             contentJSX = `<div className="container mx-auto px-4 py-12"><h2 className="text-2xl font-bold">Block Type: ${block.type}</h2></div>`;
        }

        return `      {/* ${block.type} */}
      <section id="${block.anchorId}" className="${pt} ${pb} animate__animated animate__${block.animation || 'none'}" style={${styleObj}}>
${contentJSX}
      </section>`;
    }).join('\n');

    const code = `import React from 'react';
// Requires Tailwind CSS setup
// Fonts: ${globalSettings.fontFamily}

const Page = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '${globalSettings.backgroundColor}', color: '${globalSettings.textColor}', fontFamily: '${globalSettings.fontFamily}' }}>
${blocksJSX}
    </div>
  );
}
export default Page;`;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Page.tsx';
    a.click();
  }

  return (
    <div className={`flex h-screen w-full flex-col font-${globalSettings.fontFamily} ${appPreferences.darkMode ? 'dark' : ''}`}>
      <TopBar 
        title={globalSettings.title} 
        viewMode={viewMode}
        onSetViewMode={setViewMode}
        canUndo={past.length > 0}
        canRedo={future.length > 0}
        onUndo={undo}
        onRedo={redo}
        preferences={appPreferences}
        onSetLanguage={(l) => setAppPreferences({...appPreferences, language: l})}
        onExport={(type) => type === 'html' ? generateHTML() : generateReact()} 
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
      />
      
      <div className="flex flex-1 overflow-hidden relative">
        <div className={`${activeTab === 'blocks' ? 'block' : 'hidden'} md:block absolute md:relative z-20 h-full w-full md:w-auto bg-white md:bg-transparent shadow-xl md:shadow-none`}>
           <Sidebar 
            onAddBlock={addBlock} 
            onSelectSettings={() => { setSelectedBlockId(null); setActiveTab('settings'); }} 
            onOpenPreferences={() => setIsPreferencesOpen(true)}
            language={appPreferences.language}
           />
        </div>

        <Canvas 
          blocks={blocks} 
          selectedId={selectedBlockId}
          onSelect={(id) => { setSelectedBlockId(id); setActiveTab('editor'); }}
          onMove={moveBlock}
          onDelete={deleteBlock}
          onDuplicate={duplicateBlock}
          globalSettings={globalSettings}
          appPreferences={appPreferences}
          viewMode={viewMode}
        />

        <div className={`${activeTab === 'settings' || activeTab === 'editor' ? 'block' : 'hidden'} md:block absolute md:relative right-0 z-20 h-full w-full md:w-auto bg-white md:bg-transparent shadow-xl md:shadow-none`}>
           <PropertiesPanel 
             selectedBlock={blocks.find(b => b.instanceId === selectedBlockId)} 
             globalSettings={globalSettings}
             mode={activeTab === 'settings' ? 'settings' : 'editor'}
             language={appPreferences.language}
             onUpdateBlock={updateBlock}
             onUpdateGlobal={setGlobalSettings}
             onClose={() => setActiveTab('editor')}
           />
        </div>
      </div>
      
      <PreferencesModal 
        isOpen={isPreferencesOpen} 
        onClose={() => setIsPreferencesOpen(false)} 
        prefs={appPreferences}
        onUpdate={setAppPreferences}
      />
    </div>
  );
}
export default App;
