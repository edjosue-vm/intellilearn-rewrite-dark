'use client';

import React from 'react';
import type { InteractionPoint } from '@/types/explanation';

interface InteractionControlsProps {
  interactionPoint: InteractionPoint;
  onOptionSelect: (optionId: string) => void;
  isVisible: boolean;
}

export default function InteractionControls({ 
  interactionPoint, 
  onOptionSelect, 
  isVisible 
}: InteractionControlsProps) {
  if (!isVisible) return null;

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-slate-600/30 backdrop-blur-sm">
        <p className="text-lg text-white/90 text-center mb-6">
          {interactionPoint.promptText}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {interactionPoint.options.map((option) => (
            <button
              key={option.id}
              onClick={() => onOptionSelect(option.id)}
              className="group relative bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 active:scale-95"
            >
              <div className="flex flex-col items-center gap-3">
                <span className="text-4xl group-hover:scale-110 transition-transform">
                  {option.icon}
                </span>
                <span className="text-white font-semibold text-center">
                  {option.label}
                </span>
              </div>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/5 transition-colors duration-300"></div>
            </button>
          ))}
        </div>

        {interactionPoint.type === 'question' && (
          <div className="mt-6">
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Or type your own question..."
                className="flex-1 bg-slate-800/50 border border-slate-600/30 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                    onOptionSelect(`custom-${e.currentTarget.value}`);
                  }
                }}
              />
              <button
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 rounded-lg text-white font-semibold transition-all hover:scale-105 active:scale-95"
                onClick={(e) => {
                  const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                  if (input && input.value.trim()) {
                    onOptionSelect(`custom-${input.value}`);
                  }
                }}
              >
                Ask
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
