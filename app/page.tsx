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
          className="fixed top-4 left-4 z-50 px-4 py-2 bg-slate-800/80 hover:bg-slate-700 text-white rounded-lg border border-slate-600/30 backdrop-blur-sm transition-colors"
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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            IntelliLearn
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Experience adaptive learning with interactive visual explanations that evolve based on how you understand
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-xl p-6 border border-blue-500/30">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold text-blue-400 mb-2">Visual Learning</h3>
            <p className="text-white/70 text-sm">
              Concepts build visually before your eyes, not just plain text
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 rounded-xl p-6 border border-purple-500/30">
            <div className="text-4xl mb-4">🔄</div>
            <h3 className="text-xl font-semibold text-purple-400 mb-2">Adaptive Approach</h3>
            <p className="text-white/70 text-sm">
              Explanations change based on your responses and questions
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-pink-900/30 to-pink-800/30 rounded-xl p-6 border border-pink-500/30">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-pink-400 mb-2">Interactive</h3>
            <p className="text-white/70 text-sm">
              Pause, ask questions, and explore at your own pace
            </p>
          </div>
        </div>

        {/* Topic Selection */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Choose a Topic to Explore
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {allTopics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => startExplanation(topic)}
                className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 hover:from-slate-700/50 hover:to-slate-800/50 rounded-xl p-8 border border-slate-600/30 backdrop-blur-sm transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10 text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    {topic.id === 'photosynthesis' ? '🌱' : '🔬'}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-white/70 mb-4">
                      {topic.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {topic.availableModes.map((mode) => (
                        <span
                          key={mode}
                          className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs"
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
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            How It Works
          </h2>
          
          <div className="space-y-6">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <div className="flex-1 bg-slate-800/30 rounded-lg p-6 border border-slate-600/30">
                <h4 className="text-lg font-semibold text-green-400 mb-2">Choose Your Topic</h4>
                <p className="text-white/70">Select what you want to learn from our growing library of subjects</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <div className="flex-1 bg-slate-800/30 rounded-lg p-6 border border-slate-600/30">
                <h4 className="text-lg font-semibold text-blue-400 mb-2">Watch It Build</h4>
                <p className="text-white/70">Concepts are constructed visually, step by step, with automatic pauses</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                3
              </div>
              <div className="flex-1 bg-slate-800/30 rounded-lg p-6 border border-slate-600/30">
                <h4 className="text-lg font-semibold text-purple-400 mb-2">Guide Your Learning</h4>
                <p className="text-white/70">Choose analogies, ask questions, or dive deeper - the explanation adapts to you</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
