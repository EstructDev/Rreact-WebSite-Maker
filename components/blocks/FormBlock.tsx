
import React from 'react';
import { FormData } from '../../types';

export const FormBlock: React.FC<{ data: FormData }> = ({ data }) => {
  const paddingClass = {
    none: 'py-0', xs: 'py-4', sm: 'py-8', md: 'py-16', lg: 'py-24', xl: 'py-32', '2xl': 'py-40'
  }[data.paddingTop || 'md'];

  const radiusClass = {
    none: 'rounded-none', sm: 'rounded', md: 'rounded-lg', lg: 'rounded-xl', xl: 'rounded-2xl', full: 'rounded-full'
  }[data.buttonRadius];

  const bgStyle = data.backgroundType === 'image' 
    ? { backgroundImage: `url(${data.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : data.backgroundType === 'gradient'
    ? { background: data.gradient }
    : { backgroundColor: data.backgroundColor };

  return (
    <div id={data.anchorId} className={`${paddingClass} animate__animated animate__${data.animation}`} style={bgStyle}>
        <div 
            className={`max-w-2xl mx-auto p-8 sm:p-10 ${data.boxShadow ? 'shadow-2xl' : ''}`}
            style={{ backgroundColor: data.backgroundColor === 'transparent' ? '#ffffff' : data.backgroundColor, borderRadius: '1rem' }}
        >
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-2" style={{ color: data.textColor }}>{data.title}</h2>
                <p className="text-lg opacity-80" style={{ color: data.textColor }}>{data.subtitle}</p>
            </div>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                {data.fields.map((field) => (
                    <div key={field.id} className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold ml-1" style={{ color: data.textColor }}>
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                        {field.type === 'textarea' ? (
                            <textarea 
                                placeholder={field.placeholder}
                                className="w-full rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-indigo-500 transition-colors py-3 px-4 shadow-sm"
                                rows={4}
                                style={{ backgroundColor: data.inputBg }}
                            />
                        ) : field.type === 'select' ? (
                            <select 
                                className="w-full rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-indigo-500 transition-colors py-3 px-4 shadow-sm"
                                style={{ backgroundColor: data.inputBg }}
                            >
                                <option value="" disabled selected>{field.placeholder}</option>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                            </select>
                        ) : (
                            <input 
                                type={field.type}
                                placeholder={field.placeholder}
                                className="w-full rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-indigo-500 transition-colors py-3 px-4 shadow-sm"
                                style={{ backgroundColor: data.inputBg }}
                            />
                        )}
                    </div>
                ))}
                <button 
                    type="submit"
                    className={`w-full py-4 font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all active:translate-y-0 active:shadow-md ${radiusClass}`}
                    style={{ backgroundColor: data.buttonBg, color: data.buttonTextColor }}
                >
                    {data.submitText}
                </button>
            </form>
        </div>
    </div>
  );
};
