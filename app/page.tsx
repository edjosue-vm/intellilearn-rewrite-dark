'use client';

import React, { useState } from 'react';
import ExplanationViewer from '@/components/ExplanationViewer';
import { AdaptiveExplanationEngine } from '@/lib/explanation-engine';
import { photosynthesisTopic, cellStructureTopic, allTopics } from '@/lib/example-topics';
import type { ExplanationPath, Topic } from '@/types/explanation';

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [explanationPath, setExplanationPath] = useState<ExplanationPath | null>(null);

  const startExplanation = (topic: Topic) => {
    setSelectedTopic(topic);
    const path = AdaptiveExplanationEngine.buildExplanationPath(topic);
    setExplanationPath(path);
  };

  const handleStepChange = (stepId: string) => {
    if (!explanationPath) return;

    setExplanationPath({
      ...explanationPath,
      currentStepId: stepId,
      visitedStepIds: [...explanationPath.visitedStepIds, explanationPath.currentStepId],
    });
  };

  const handleInteraction = (optionId: string) => {
    if (!explanationPath) return;

    // Save interaction
    const interaction = {
      timestamp: new Date(),
      stepId: explanationPath.currentStepId,
      optionId,
    };

    setExplanationPath({
      ...explanationPath,
      userInteractions: [...explanationPath.userInteractions, interaction],
    });
  };

  const resetExplanation = () => {
    setSelectedTopic(null);
    setExplanationPath(null);
  };

  if (explanationPath && selectedTopic) {
    return (
      <>
        <button
          onClick={resetExplanation}
          className="fixed top-6 left-6 z-50 px-6 py-3 bg-white hover:bg-purple-50 text-purple-600 rounded-xl border-2 border-purple-200 shadow-lg hover:shadow-xl backdrop-blur-sm transition-all duration-300 font-semibold"
        >
          ← Back to Topics
        </button>
        <ExplanationViewer
          path={explanationPath}
          onStepChange={handleStepChange}
          onInteraction={handleInteraction}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-sm">
            IntelliLearn
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Experience adaptive learning with interactive visual explanations that evolve based on how you understand
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-8 border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-5xl mb-4">🎨</div>
            <h3 className="text-2xl font-semibold text-blue-600 mb-3">Visual Learning</h3>
            <p className="text-gray-700 leading-relaxed">
              Concepts build visually before your eyes, not just plain text
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl p-8 border-2 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-5xl mb-4">🔄</div>
            <h3 className="text-2xl font-semibold text-purple-600 mb-3">Adaptive Approach</h3>
            <p className="text-gray-700 leading-relaxed">
              Explanations change based on your responses and questions
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-pink-100 to-pink-50 rounded-2xl p-8 border-2 border-pink-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-2xl font-semibold text-pink-600 mb-3">Interactive</h3>
            <p className="text-gray-700 leading-relaxed">
              Pause, ask questions, and explore at your own pace
            </p>
          </div>
        </div>

        {/* Topic Selection */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center">
            Choose a Topic to Explore
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {allTopics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => startExplanation(topic)}
                className="group bg-white hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 rounded-2xl p-8 border-2 border-purple-200 hover:border-purple-300 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-left"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-purple-200 to-pink-200 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300 shadow-md">
                    {topic.id === 'photosynthesis' ? '🌱' : '🔬'}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {topic.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {topic.availableModes.map((mode) => (
                        <span
                          key={mode}
                          className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium"
                        >
                          {mode}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-4xl mx-auto mt-20">
          <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center">
            How It Works
          </h2>
          
          <div className="space-y-6">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-green-300 to-emerald-300 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                1
              </div>
              <div className="flex-1 bg-white rounded-2xl p-6 border-2 border-green-200 shadow-md hover:shadow-lg transition-shadow">
                <h4 className="text-xl font-semibold text-green-600 mb-2">Choose Your Topic</h4>
                <p className="text-gray-700 leading-relaxed">Select what you want to learn from our growing library of subjects</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-300 to-cyan-300 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                2
              </div>
              <div className="flex-1 bg-white rounded-2xl p-6 border-2 border-blue-200 shadow-md hover:shadow-lg transition-shadow">
                <h4 className="text-xl font-semibold text-blue-600 mb-2">Watch It Build</h4>
                <p className="text-gray-700 leading-relaxed">Concepts are constructed visually, step by step, with automatic pauses</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                3
              </div>
              <div className="flex-1 bg-white rounded-2xl p-6 border-2 border-purple-200 shadow-md hover:shadow-lg transition-shadow">
                <h4 className="text-xl font-semibold text-purple-600 mb-2">Guide Your Learning</h4>
                <p className="text-gray-700 leading-relaxed">Choose analogies, ask questions, or dive deeper - the explanation adapts to you</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
