
import React from 'react';
import { BlockType } from '../types';

interface SidebarProps {
  onAddBlock: (type: BlockType) => void;
  onSelectSettings: () => void;
  onOpenPreferences: () => void;
  language: string;
}

const LABELS: Record<string, Record<string, string>> = {
    en: {
        blocks: 'Blocks', settings: 'Settings', layout: 'Layout', basic: 'Basic', marketing: 'Marketing',
        nav: 'Navigation', hero: 'Hero Section', feature: 'Feature Grid', split: 'Split Content', footer: 'Footer',
        text: 'Text Block', button: 'Button', image: 'Image / Video', divider: 'Divider',
        cta: 'Call to Action', form: 'Form', map: 'Map', pricing: 'Pricing', testimonial: 'Testimonials', team: 'Team', faq: 'FAQ'
    },
    pt: {
        blocks: 'Blocos', settings: 'Configurações', layout: 'Layout', basic: 'Básico', marketing: 'Marketing',
        nav: 'Navegação', hero: 'Seção Hero', feature: 'Grid Recursos', split: 'Divisão', footer: 'Rodapé',
        text: 'Texto', button: 'Botão', image: 'Imagem / Vídeo', divider: 'Divisor',
        cta: 'Chamada Ação', form: 'Formulário', map: 'Mapa', pricing: 'Preços', testimonial: 'Depoimentos', team: 'Equipe', faq: 'FAQ'
    },
    es: {
        blocks: 'Bloques', settings: 'Ajustes', layout: 'Diseño', basic: 'Básico', marketing: 'Marketing',
        nav: 'Navegación', hero: 'Sección Hero', feature: 'Cuadrícula', split: 'División', footer: 'Pie de página',
        text: 'Texto', button: 'Botón', image: 'Imagen', divider: 'Divisor',
        cta: 'Llamada Acción', form: 'Formulario', map: 'Mapa', pricing: 'Precios', testimonial: 'Testimonios', team: 'Equipo', faq: 'FAQ'
    },
    fr: {
        blocks: 'Blocs', settings: 'Paramètres', layout: 'Mise en page', basic: 'Basique', marketing: 'Marketing',
        nav: 'Navigation', hero: 'Section Hero', feature: 'Grille', split: 'Division', footer: 'Pied de page',
        text: 'Texte', button: 'Bouton', image: 'Image', divider: 'Diviseur',
        cta: 'Appel à l\'action', form: 'Formulaire', map: 'Carte', pricing: 'Tarifs', testimonial: 'Témoignages', team: 'Équipe', faq: 'FAQ'
    }
}

export const Sidebar: React.FC<SidebarProps> = ({ onAddBlock, onSelectSettings, onOpenPreferences, language }) => {
  const t = LABELS[language] || LABELS.en;

  const menuItems: { type: BlockType; icon: string; label: string; group: string }[] = [
    { type: 'navigation', icon: 'menu', label: t.nav, group: t.layout },
    { type: 'hero', icon: 'star', label: t.hero, group: t.layout },
    { type: 'feature', icon: 'grid_view', label: t.feature, group: t.layout },
    { type: 'split', icon: 'splitscreen', label: t.split, group: t.layout },
    { type: 'footer', icon: 'vertical_align_bottom', label: t.footer, group: t.layout },
    
    { type: 'text', icon: 'title', label: t.text, group: t.basic },
    { type: 'button', icon: 'smart_button', label: t.button, group: t.basic },
    { type: 'image', icon: 'image', label: t.image, group: t.basic },
    { type: 'divider', icon: 'remove', label: t.divider, group: t.basic },
    
    { type: 'cta', icon: 'ads_click', label: t.cta, group: t.marketing },
    { type: 'pricing', icon: 'sell', label: t.pricing, group: t.marketing },
    { type: 'testimonial', icon: 'format_quote', label: t.testimonial, group: t.marketing },
    { type: 'team', icon: 'groups', label: t.team, group: t.marketing },
    { type: 'faq', icon: 'help', label: t.faq, group: t.marketing },
    { type: 'form', icon: 'contact_mail', label: t.form, group: t.marketing },
    { type: 'map', icon: 'map', label: t.map, group: t.marketing },
  ];

  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item);
    return acc;
  }, {} as Record<string, typeof menuItems>);

  return (
    <aside className="flex h-full w-full md:w-64 flex-col bg-gray-900 text-gray-300 border-r border-gray-800 overflow-y-auto">
      <div className="flex h-full flex-col p-4 gap-4">
        
        <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">{t.blocks}</h2>
            <button onClick={onOpenPreferences} className="text-gray-500 hover:text-white" title="Preferences">
                <span className="material-symbols-outlined text-xl">tune</span>
            </button>
        </div>

        <button 
          onClick={onSelectSettings}
          className="flex w-full items-center gap-3 rounded-lg bg-indigo-600/10 border border-indigo-500/30 px-3 py-3 text-left hover:bg-indigo-600/20 transition-all group"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white shadow-lg group-hover:scale-110 transition-transform">
             <span className="material-symbols-outlined text-lg">settings</span>
          </div>
          <div className="flex flex-col">
             <span className="text-sm font-bold text-white">{t.settings}</span>
             <span className="text-[10px] text-indigo-300">SEO • Global Styles</span>
          </div>
        </button>

        <div className="h-px w-full bg-gray-800 my-1"></div>

        <div className="flex flex-col gap-6">
          {Object.entries(groupedItems).map(([group, items]) => (
            <div key={group}>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 pl-2">{group}</p>
                <div className="space-y-1">
                    {items.map((item) => (
                        <button
                        key={item.type}
                        onClick={() => onAddBlock(item.type)}
                        className="group flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-all hover:bg-gray-800 hover:text-white hover:translate-x-1"
                        >
                        <span className="material-symbols-outlined text-gray-500 group-hover:text-indigo-400 transition-colors text-lg">
                            {item.icon}
                        </span>
                        <span className="text-sm font-medium">{item.label}</span>
                        </button>
                    ))}
                </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
