'use client';

import React, { useState, useEffect } from 'react';

interface AnimatedAnalogyProps {
  data: any;
  isActive: boolean;
}

export default function AnimatedAnalogy({ data, isActive }: AnimatedAnalogyProps) {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    
    const phases = [0, 1, 2, 3];
    let currentPhaseIndex = 0;
    
    const interval = setInterval(() => {
      currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
      setAnimationPhase(phases[currentPhaseIndex]);
    }, 2000);

    return () => clearInterval(interval);
  }, [isActive]);

  const renderPhotosynthesisAnalogy = () => {
    if (animationPhase === 0) {
      // Show plant
      return (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-center text-green-400">🌱 The Plant</h3>
          <div className="bg-gradient-to-b from-green-900/30 to-emerald-900/30 rounded-xl p-8 border border-green-500/30">
            <div className="relative w-48 h-48 mx-auto">
              <div className="absolute bottom-0 w-full h-24 bg-green-600 rounded-t-full"></div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
      );
    } else if (animationPhase === 1) {
      // Transform to factory
      return (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-center text-blue-400">🏭 Like a Factory</h3>
          <div className="bg-gradient-to-b from-blue-900/30 to-cyan-900/30 rounded-xl p-8 border border-blue-500/30">
            <div className="relative w-48 h-48 mx-auto">
              <div className="absolute bottom-0 w-full h-32 bg-gray-700 rounded-lg">
                <div className="flex justify-around items-center h-full">
                  <div className="w-12 h-12 bg-blue-500 rounded animate-pulse"></div>
                  <div className="w-12 h-12 bg-yellow-500 rounded animate-pulse"></div>
                  <div className="w-12 h-12 bg-green-500 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-16 bg-gray-600 rounded-t-lg"></div>
            </div>
          </div>
        </div>
      );
    } else if (animationPhase === 2) {
      // Show inputs
      return (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-center text-yellow-400">⚡ Raw Materials In</h3>
          <div className="bg-gradient-to-b from-yellow-900/30 to-orange-900/30 rounded-xl p-8 border border-yellow-500/30">
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-yellow-500/30 rounded-full flex items-center justify-center text-4xl mb-2">
                  ☀️
                </div>
                <p className="text-sm">Sunlight</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-500/30 rounded-full flex items-center justify-center text-4xl mb-2">
                  💧
                </div>
                <p className="text-sm">Water</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-500/30 rounded-full flex items-center justify-center text-4xl mb-2">
                  💨
                </div>
                <p className="text-sm">CO₂</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      // Show output
      return (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-center text-green-400">🍬 Energy Created!</h3>
          <div className="bg-gradient-to-b from-green-900/30 to-lime-900/30 rounded-xl p-8 border border-green-500/30">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto bg-green-500/30 rounded-full flex items-center justify-center text-6xl mb-4 animate-bounce">
                🍃
              </div>
              <p className="text-lg text-green-400 font-semibold">Glucose (Sugar) + Oxygen</p>
              <p className="text-sm text-white/70 mt-2">The plant's food and our air!</p>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="transition-all duration-500">
        {data.topicTitle?.toLowerCase().includes('photosynthesis') ? (
          renderPhotosynthesisAnalogy()
        ) : (
          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-8 border border-purple-500/30">
            <p className="text-center text-lg text-white/90">{data.content}</p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-purple-500/20 rounded-lg p-4">
                <p className="text-sm text-center">🔄 Analogy View</p>
              </div>
              <div className="bg-pink-500/20 rounded-lg p-4">
                <p className="text-sm text-center">💡 Visual Metaphor</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
