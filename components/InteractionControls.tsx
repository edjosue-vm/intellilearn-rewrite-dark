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
      <div className="bg-white rounded-2xl p-8 border-2 border-purple-200 shadow-xl">
        <p className="text-xl text-gray-800 text-center mb-8 font-medium">
          {interactionPoint.promptText}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {interactionPoint.options.map((option) => (
            <button
              key={option.id}
              onClick={() => onOptionSelect(option.id)}
              className="group relative bg-gradient-to-br from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 shadow-lg"
            >
              <div className="flex flex-col items-center gap-4">
                <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                  {option.icon}
                </span>
                <span className="text-white font-bold text-center text-lg">
                  {option.label}
                </span>
              </div>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 rounded-2xl bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
            </button>
          ))}
        </div>

        {interactionPoint.type === 'question' && (
          <div className="mt-8">
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Or type your own question..."
                className="flex-1 bg-gray-50 border-2 border-purple-200 rounded-xl px-6 py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                    onOptionSelect(`custom-${e.currentTarget.value}`);
                  }
                }}
              />
              <button
                className="px-8 py-4 bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500 rounded-xl text-white font-bold transition-all hover:scale-105 active:scale-95 shadow-lg"
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
