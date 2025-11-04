'use client';

import React from 'react';

interface ContextualExampleProps {
  data: any;
}

export default function ContextualExample({ data }: ContextualExampleProps) {
  const { type, content, keyPoints } = data;

  if (type === 'summary') {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 rounded-xl p-8 border border-emerald-500/30">
          <h3 className="text-2xl font-bold text-emerald-400 mb-6 text-center">
            📚 What You've Learned
          </h3>
          
          <div className="space-y-4">
            {keyPoints?.map((point: string, index: number) => (
              <div 
                key={index}
                className="flex items-start gap-4 bg-emerald-500/10 rounded-lg p-4 transition-all hover:bg-emerald-500/20"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 font-bold">
                  {index + 1}
                </div>
                <p className="text-white/90 flex-1">{point}</p>
                <div className="flex-shrink-0 text-2xl">✓</div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="bg-emerald-500/10 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🎯</div>
              <p className="text-sm text-white/70">Concepts Mastered</p>
              <p className="text-xl font-bold text-emerald-400">{keyPoints?.length || 0}</p>
            </div>
            <div className="bg-teal-500/10 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🚀</div>
              <p className="text-sm text-white/70">Progress</p>
              <p className="text-xl font-bold text-teal-400">100%</p>
            </div>
            <div className="bg-cyan-500/10 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">⭐</div>
              <p className="text-sm text-white/70">Understanding</p>
              <p className="text-xl font-bold text-cyan-400">High</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default contextual example
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-xl p-8 border border-blue-500/30">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0 w-16 h-16 bg-blue-500/30 rounded-xl flex items-center justify-center text-4xl">
            💡
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-semibold text-blue-400 mb-3">Real-World Example</h4>
            <p className="text-white/90 leading-relaxed">{content}</p>
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-blue-500/10 rounded-lg p-4">
                <p className="text-sm font-semibold text-blue-400 mb-2">In Nature</p>
                <p className="text-xs text-white/70">How this works in the real world</p>
              </div>
              <div className="bg-indigo-500/10 rounded-lg p-4">
                <p className="text-sm font-semibold text-indigo-400 mb-2">In Daily Life</p>
                <p className="text-xs text-white/70">Practical applications you see</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
