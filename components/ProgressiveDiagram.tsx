'use client';

import React, { useState, useEffect } from 'react';

interface ProgressiveDiagramProps {
  data: any;
  stepProgress: number; // 0-100
  onComplete?: () => void;
}

export default function ProgressiveDiagram({ data, stepProgress, onComplete }: ProgressiveDiagramProps) {
  const [visibleElements, setVisibleElements] = useState<number>(0);
  const totalElements = 5; // Default number of elements to progressively show

  useEffect(() => {
    const elementIndex = Math.floor((stepProgress / 100) * totalElements);
    setVisibleElements(elementIndex);
    
    if (stepProgress >= 100 && onComplete) {
      onComplete();
    }
  }, [stepProgress, onComplete]);

  const renderDiagramContent = () => {
    const { type, topicTitle, content } = data;

    if (type === 'introduction') {
      return (
        <div className="space-y-8">
          <div className={`transition-all duration-700 ${visibleElements >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="w-40 h-40 mx-auto bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-6xl">🌱</span>
            </div>
          </div>
          
          <div className={`transition-all duration-700 delay-300 ${visibleElements >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h2 className="text-4xl font-bold text-center text-gray-800">{topicTitle}</h2>
          </div>
          
          <div className={`transition-all duration-700 delay-500 ${visibleElements >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex justify-center gap-6">
              <div className="w-32 h-2 bg-gradient-to-r from-blue-300 to-blue-400 rounded-full shadow-md"></div>
              <div className="w-32 h-2 bg-gradient-to-r from-purple-300 to-purple-400 rounded-full shadow-md"></div>
              <div className="w-32 h-2 bg-gradient-to-r from-pink-300 to-pink-400 rounded-full shadow-md"></div>
            </div>
          </div>
        </div>
      );
    }

    // Default progressive diagram for content steps
    return (
      <div className="space-y-6">
        <div className={`transition-all duration-700 ${visibleElements >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 border-2 border-blue-200 shadow-lg">
            <p className="text-xl text-gray-800 leading-relaxed">{content}</p>
          </div>
        </div>

        <div className={`transition-all duration-700 delay-200 ${visibleElements >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-3xl">💡</span>
            </div>
            <div className="flex-1 h-3 bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 rounded-full shadow-md"></div>
          </div>
        </div>

        <div className={`transition-all duration-700 delay-400 ${visibleElements >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border-2 border-purple-200 shadow-md hover:shadow-lg transition-shadow">
                <div className="w-full h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {renderDiagramContent()}
    </div>
  );
}
