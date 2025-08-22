"use client"

import React, { useState, useEffect } from 'react';
import { Monitor, Smartphone, Tablet, Laptop, Tv } from 'lucide-react';
import { ThemeToogler } from './ThemeToggler';

const BreakpointIndicator = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState('');
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [isMinimized, setIsMinimized] = useState(true);

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenSize({ width, height });

      if (width < 640) {
        setCurrentBreakpoint('xs');
      } else if (width >= 640 && width < 768) {
        setCurrentBreakpoint('sm');
      } else if (width >= 768 && width < 1024) {
        setCurrentBreakpoint('md');
      } else if (width >= 1024 && width < 1280) {
        setCurrentBreakpoint('lg');
      } else if (width >= 1280 && width < 1536) {
        setCurrentBreakpoint('xl');
      } else {
        setCurrentBreakpoint('2xl');
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);

    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  const getBreakpointInfo = () => {
    switch (currentBreakpoint) {
      case 'xs':
        return { 
          label: 'Extra Small', 
          range: '< 640px',
          icon: <Smartphone className="w-4 h-4" />,
          color: 'bg-red-500'
        };
      case 'sm':
        return { 
          label: 'Small', 
          range: '640px - 767px',
          icon: <Smartphone className="w-4 h-4" />,
          color: 'bg-orange-500'
        };
      case 'md':
        return { 
          label: 'Medium', 
          range: '768px - 1023px',
          icon: <Tablet className="w-4 h-4" />,
          color: 'bg-yellow-500'
        };
      case 'lg':
        return { 
          label: 'Large', 
          range: '1024px - 1279px',
          icon: <Laptop className="w-4 h-4" />,
          color: 'bg-green-500'
        };
      case 'xl':
        return { 
          label: 'Extra Large', 
          range: '1280px - 1535px',
          icon: <Monitor className="w-4 h-4" />,
          color: 'bg-blue-500'
        };
      case '2xl':
        return { 
          label: '2X Large', 
          range: '≥ 1536px',
          icon: <Tv className="w-4 h-4" />,
          color: 'bg-purple-500'
        };
      default:
        return { 
          label: 'Unknown', 
          range: '',
          icon: <Monitor className="w-4 h-4" />,
          color: 'bg-gray-500'
        };
    }
  };

  // N'afficher qu'en mode développement
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const breakpointInfo = getBreakpointInfo();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div 
        className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg transition-all duration-300 ${
          isMinimized ? 'w-12 h-12' : 'min-w-[200px]'
        }`}
      >
        {isMinimized ? (
          <button
            onClick={() => setIsMinimized(false)}
            className={`w-full h-full flex items-center justify-center text-white rounded-lg ${breakpointInfo.color} hover:opacity-80 transition-opacity`}
          >
            {breakpointInfo.icon}
          </button>
        ) : (
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Breakpoint
              </h3>
              <button
                onClick={() => setIsMinimized(true)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className={`p-1 rounded ${breakpointInfo.color} text-white`}>
                  {breakpointInfo.icon}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {currentBreakpoint.toUpperCase()}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {breakpointInfo.label}
                  </div>
                </div>
              </div>
              
              <div className="text-xs space-y-1">
                <div className="text-gray-600 dark:text-gray-400">
                  Range: {breakpointInfo.range}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Size: {screenSize.width} × {screenSize.height}px
                </div>
              </div>
              <ThemeToogler />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BreakpointIndicator;