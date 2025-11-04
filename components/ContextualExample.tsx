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
        <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl p-10 border-2 border-emerald-200 shadow-lg">
          <h3 className="text-3xl font-bold text-emerald-600 mb-8 text-center">
            📚 What You've Learned
          </h3>
          
          <div className="space-y-5">
            {keyPoints?.map((point: string, index: number) => (
              <div 
                key={index}
                className="flex items-start gap-5 bg-white rounded-xl p-6 transition-all hover:shadow-lg border-2 border-emerald-200"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-emerald-300 to-emerald-400 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {index + 1}
                </div>
                <p className="text-gray-800 flex-1 leading-relaxed">{point}</p>
                <div className="flex-shrink-0 text-3xl">✓</div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-md border-2 border-emerald-200">
              <div className="text-4xl mb-3">🎯</div>
              <p className="text-sm text-gray-600 mb-2">Concepts Mastered</p>
              <p className="text-3xl font-bold text-emerald-600">{keyPoints?.length || 0}</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md border-2 border-teal-200">
              <div className="text-4xl mb-3">🚀</div>
              <p className="text-sm text-gray-600 mb-2">Progress</p>
              <p className="text-3xl font-bold text-teal-600">100%</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md border-2 border-cyan-200">
              <div className="text-4xl mb-3">⭐</div>
              <p className="text-sm text-gray-600 mb-2">Understanding</p>
              <p className="text-3xl font-bold text-cyan-600">High</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default contextual example
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-10 border-2 border-blue-200 shadow-lg">
        <div className="flex items-start gap-8">
          <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-blue-300 to-blue-400 rounded-2xl flex items-center justify-center text-5xl shadow-lg">
            💡
          </div>
          <div className="flex-1">
            <h4 className="text-2xl font-semibold text-blue-600 mb-4">Real-World Example</h4>
            <p className="text-gray-800 leading-relaxed text-lg">{content}</p>
            
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md border-2 border-blue-200">
                <p className="text-base font-semibold text-blue-600 mb-2">In Nature</p>
                <p className="text-sm text-gray-600">How this works in the real world</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border-2 border-indigo-200">
                <p className="text-base font-semibold text-indigo-600 mb-2">In Daily Life</p>
                <p className="text-sm text-gray-600">Practical applications you see</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
