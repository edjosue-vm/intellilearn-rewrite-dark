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
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-center text-green-600">🌱 The Plant</h3>
          <div className="bg-gradient-to-b from-green-100 to-emerald-100 rounded-2xl p-10 border-2 border-green-200 shadow-lg">
            <div className="relative w-56 h-56 mx-auto">
              <div className="absolute bottom-0 w-full h-28 bg-gradient-to-t from-green-400 to-green-500 rounded-t-full shadow-lg"></div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-gradient-to-br from-green-300 to-green-400 rounded-full shadow-xl"></div>
            </div>
          </div>
        </div>
      );
    } else if (animationPhase === 1) {
      // Transform to factory
      return (
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-center text-blue-600">🏭 Like a Factory</h3>
          <div className="bg-gradient-to-b from-blue-100 to-cyan-100 rounded-2xl p-10 border-2 border-blue-200 shadow-lg">
            <div className="relative w-56 h-56 mx-auto">
              <div className="absolute bottom-0 w-full h-36 bg-gradient-to-t from-gray-300 to-gray-200 rounded-xl shadow-lg">
                <div className="flex justify-around items-center h-full px-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-300 to-blue-400 rounded-lg animate-pulse shadow-md"></div>
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-lg animate-pulse shadow-md"></div>
                  <div className="w-14 h-14 bg-gradient-to-br from-green-300 to-green-400 rounded-lg animate-pulse shadow-md"></div>
                </div>
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-20 bg-gradient-to-t from-gray-400 to-gray-300 rounded-t-xl shadow-lg"></div>
            </div>
          </div>
        </div>
      );
    } else if (animationPhase === 2) {
      // Show inputs
      return (
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-center text-yellow-600">⚡ Raw Materials In</h3>
          <div className="bg-gradient-to-b from-yellow-100 to-orange-100 rounded-2xl p-10 border-2 border-yellow-200 shadow-lg">
            <div className="flex justify-center gap-10">
              <div className="text-center">
                <div className="w-28 h-28 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-full flex items-center justify-center text-5xl mb-3 shadow-lg">
                  ☀️
                </div>
                <p className="text-base font-semibold text-gray-700">Sunlight</p>
              </div>
              <div className="text-center">
                <div className="w-28 h-28 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full flex items-center justify-center text-5xl mb-3 shadow-lg">
                  💧
                </div>
                <p className="text-base font-semibold text-gray-700">Water</p>
              </div>
              <div className="text-center">
                <div className="w-28 h-28 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-5xl mb-3 shadow-lg">
                  💨
                </div>
                <p className="text-base font-semibold text-gray-700">CO₂</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      // Show output
      return (
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-center text-green-600">🍬 Energy Created!</h3>
          <div className="bg-gradient-to-b from-green-100 to-lime-100 rounded-2xl p-10 border-2 border-green-200 shadow-lg">
            <div className="text-center">
              <div className="w-40 h-40 mx-auto bg-gradient-to-br from-green-200 to-green-300 rounded-full flex items-center justify-center text-7xl mb-6 animate-bounce shadow-xl">
                🍃
              </div>
              <p className="text-2xl text-green-600 font-bold mb-3">Glucose (Sugar) + Oxygen</p>
              <p className="text-lg text-gray-700">The plant's food and our air!</p>
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
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-10 border-2 border-purple-200 shadow-lg">
            <p className="text-center text-xl text-gray-800 leading-relaxed mb-8">{data.content}</p>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md border-2 border-purple-200">
                <p className="text-base text-center font-semibold text-purple-600">🔄 Analogy View</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border-2 border-pink-200">
                <p className="text-base text-center font-semibold text-pink-600">💡 Visual Metaphor</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
