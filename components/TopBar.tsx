
import React from 'react';
import { AppPreferences } from '../types';

interface TopBarProps {
  title: string;
  viewMode: 'desktop' | 'tablet' | 'mobile';
  canUndo: boolean;
  canRedo: boolean;
  preferences: AppPreferences;
  onSetViewMode: (mode: 'desktop' | 'tablet' | 'mobile') => void;
  onExport: (type: 'html' | 'react') => void;
  onUndo: () => void;
  onRedo: () => void;
  onToggleMobileMenu: () => void;
  onSetLanguage: (lang: 'en' | 'pt' | 'es' | 'fr') => void;
}

export const TopBar: React.FC<TopBarProps> = ({ 
    title, viewMode, canUndo, canRedo, preferences, 
    onSetViewMode, onExport, onUndo, onRedo, onToggleMobileMenu, onSetLanguage 
}) => {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 md:px-6 shadow-sm z-30 relative">
      <div className="flex items-center gap-4">
        <button onClick={onToggleMobileMenu} className="md:hidden text-gray-600">
           <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded bg-indigo-600 text-white shadow-md">
          <span className="material-symbols-outlined text-xl">auto_awesome_mosaic</span>
        </div>
        <h1 className="text-sm md:text-lg font-bold text-gray-900 truncate max-w-[120px] md:max-w-xs">{title}</h1>
      </div>

      <div className="hidden lg:flex items-center bg-gray-100 rounded-lg p-1 gap-1">
          <button 
            onClick={() => onSetViewMode('desktop')} 
            className={`p-1.5 rounded-md flex items-center justify-center transition-colors ${viewMode === 'desktop' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}
            title="Desktop View"
          >
              <span className="material-symbols-outlined text-xl">desktop_windows</span>
          </button>
          <button 
            onClick={() => onSetViewMode('tablet')} 
            className={`p-1.5 rounded-md flex items-center justify-center transition-colors ${viewMode === 'tablet' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}
            title="Tablet View"
          >
              <span className="material-symbols-outlined text-xl">tablet_mac</span>
          </button>
          <button 
            onClick={() => onSetViewMode('mobile')} 
            className={`p-1.5 rounded-md flex items-center justify-center transition-colors ${viewMode === 'mobile' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}
            title="Mobile View"
          >
              <span className="material-symbols-outlined text-xl">smartphone</span>
          </button>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
         <div className="flex items-center gap-1">
            <button onClick={onUndo} disabled={!canUndo} className="p-2 rounded hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent" title="Undo">
                <span className="material-symbols-outlined text-xl">undo</span>
            </button>
            <button onClick={onRedo} disabled={!canRedo} className="p-2 rounded hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent" title="Redo">
                <span className="material-symbols-outlined text-xl">redo</span>
            </button>
         </div>
         
         <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

         <div className="hidden md:flex items-center gap-1">
             {(['en', 'pt', 'es', 'fr'] as const).map(lang => (
                 <button 
                    key={lang} 
                    onClick={() => onSetLanguage(lang)} 
                    className={`text-xs font-bold uppercase w-6 h-6 rounded ${preferences.language === lang ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-100'}`}
                 >
                     {lang}
                 </button>
             ))}
         </div>

         <div className="flex items-center gap-2">
            <button onClick={() => onExport('html')} className="h-9 px-3 rounded-lg border border-gray-300 bg-white text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-2 shadow-sm">
                <span className="material-symbols-outlined text-sm">html</span>
                <span className="hidden sm:inline">HTML</span>
            </button>
            <button onClick={() => onExport('react')} className="h-9 px-3 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 flex items-center gap-2 shadow-md">
                <span className="material-symbols-outlined text-sm">code</span>
                <span className="hidden sm:inline">React</span>
            </button>
         </div>
      </div>
    </header>
  );
};
