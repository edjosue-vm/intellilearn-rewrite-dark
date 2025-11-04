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
        <div className="space-y-6">
          <div className={`transition-all duration-700 ${visibleElements >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-4xl">🌱</span>
            </div>
          </div>
          
          <div className={`transition-all duration-700 delay-300 ${visibleElements >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h2 className="text-3xl font-bold text-center text-white">{topicTitle}</h2>
          </div>
          
          <div className={`transition-all duration-700 delay-500 ${visibleElements >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex justify-center gap-4">
              <div className="w-24 h-1 bg-blue-500 rounded"></div>
              <div className="w-24 h-1 bg-purple-500 rounded"></div>
              <div className="w-24 h-1 bg-pink-500 rounded"></div>
            </div>
          </div>
        </div>
      );
    }

    // Default progressive diagram for content steps
    return (
      <div className="space-y-4">
        <div className={`transition-all duration-700 ${visibleElements >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-blue-500/30">
            <p className="text-lg text-white/90">{content}</p>
          </div>
        </div>

        <div className={`transition-all duration-700 delay-200 ${visibleElements >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💡</span>
            </div>
            <div className="flex-1 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
          </div>
        </div>

        <div className={`transition-all duration-700 delay-400 ${visibleElements >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/20">
                <div className="w-full h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded"></div>
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
