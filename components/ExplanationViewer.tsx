'use client';

import React, { useState, useEffect } from 'react';
import type { ExplanationPath, ExplanationStep } from '@/types/explanation';
import ProgressiveDiagram from './ProgressiveDiagram';
import AnimatedAnalogy from './AnimatedAnalogy';
import ContextualExample from './ContextualExample';
import InteractionControls from './InteractionControls';

interface ExplanationViewerProps {
  path: ExplanationPath;
  onStepChange: (stepId: string) => void;
  onInteraction: (optionId: string) => void;
}

export default function ExplanationViewer({ 
  path, 
  onStepChange,
  onInteraction 
}: ExplanationViewerProps) {
  const [currentStep, setCurrentStep] = useState<ExplanationStep | null>(null);
  const [visualProgress, setVisualProgress] = useState(0);
  const [showInteraction, setShowInteraction] = useState(false);
  const [visualMode, setVisualMode] = useState<'diagram' | 'analogy' | 'example'>('diagram');

  useEffect(() => {
    const step = path.steps.find(s => s.id === path.currentStepId);
    if (step) {
      setCurrentStep(step);
      setVisualProgress(0);
      setShowInteraction(false);
      
      // Animate the visual progressively
      const progressInterval = setInterval(() => {
        setVisualProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => setShowInteraction(true), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 50);

      return () => clearInterval(progressInterval);
    }
  }, [path.currentStepId, path.steps]);

  const handleOptionSelect = (optionId: string) => {
    // Handle custom questions
    if (optionId.startsWith('custom-')) {
      const question = optionId.replace('custom-', '');
      console.log('User question:', question);
      // In a real implementation, this would trigger the engine to generate a response
    }

    // Handle mode switches
    const option = currentStep?.interactionPoints[0]?.options.find(o => o.id === optionId);
    if (option?.action === 'analogy') {
      setVisualMode('analogy');
      setShowInteraction(false);
      setTimeout(() => setShowInteraction(true), 2000);
      return;
    }

    // Handle navigation
    if (option?.targetStepId) {
      onStepChange(option.targetStepId);
    } else if (option?.action === 'continue' && currentStep?.nextSteps[0]) {
      onStepChange(currentStep.nextSteps[0]);
    }

    onInteraction(optionId);
  };

  if (!currentStep) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full animate-pulse shadow-xl"></div>
          <div className="text-gray-800 text-2xl font-semibold">Loading explanation...</div>
        </div>
      </div>
    );
  }

  const renderVisualization = () => {
    switch (visualMode) {
      case 'analogy':
        return (
          <AnimatedAnalogy 
            data={currentStep.visualData} 
            isActive={true}
          />
        );
      case 'example':
        return <ContextualExample data={currentStep.visualData} />;
      case 'diagram':
      default:
        if (currentStep.visualType === 'progressive-diagram') {
          return (
            <ProgressiveDiagram 
              data={currentStep.visualData} 
              stepProgress={visualProgress}
            />
          );
        } else if (currentStep.visualType === 'animated-analogy') {
          return (
            <AnimatedAnalogy 
              data={currentStep.visualData} 
              isActive={true}
            />
          );
        } else {
          return <ContextualExample data={currentStep.visualData} />;
        }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Progress indicator */}
      <div className="fixed top-0 left-0 right-0 h-2 bg-purple-100 z-50 shadow-sm">
        <div 
          className="h-full bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 transition-all duration-500 rounded-r-full"
          style={{ width: `${(path.visitedStepIds.length / path.steps.length) * 100}%` }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 pt-6">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-8 py-3 border-2 border-purple-200 shadow-lg">
            <span className="text-purple-600 font-bold text-lg">
              Step {path.visitedStepIds.length + 1} of {path.steps.length}
            </span>
          </div>
        </div>

        {/* Main content */}
        <div className="space-y-8">
          {/* Content text */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-10 border-2 border-purple-200 shadow-xl">
              <p className="text-2xl text-gray-800 leading-relaxed text-center font-medium">
                {currentStep.content}
              </p>
            </div>
          </div>

          {/* Visualization */}
          <div className="transition-all duration-500">
            {renderVisualization()}
          </div>

          {/* Mode switcher */}
          {visualProgress >= 100 && (
            <div className="max-w-4xl mx-auto flex justify-center gap-4 mb-4">
              <button
                onClick={() => setVisualMode('diagram')}
                className={`px-6 py-3 rounded-xl transition-all duration-300 font-semibold shadow-md hover:shadow-lg ${
                  visualMode === 'diagram'
                    ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white scale-105'
                    : 'bg-white text-gray-700 hover:bg-blue-50 border-2 border-blue-200'
                }`}
              >
                📊 Diagram
              </button>
              <button
                onClick={() => setVisualMode('analogy')}
                className={`px-6 py-3 rounded-xl transition-all duration-300 font-semibold shadow-md hover:shadow-lg ${
                  visualMode === 'analogy'
                    ? 'bg-gradient-to-r from-purple-400 to-purple-500 text-white scale-105'
                    : 'bg-white text-gray-700 hover:bg-purple-50 border-2 border-purple-200'
                }`}
              >
                🤔 Analogy
              </button>
              <button
                onClick={() => setVisualMode('example')}
                className={`px-6 py-3 rounded-xl transition-all duration-300 font-semibold shadow-md hover:shadow-lg ${
                  visualMode === 'example'
                    ? 'bg-gradient-to-r from-green-400 to-green-500 text-white scale-105'
                    : 'bg-white text-gray-700 hover:bg-green-50 border-2 border-green-200'
                }`}
              >
                💡 Example
              </button>
            </div>
          )}

          {/* Interaction controls */}
          {currentStep.interactionPoints.length > 0 && (
            <InteractionControls
              interactionPoint={currentStep.interactionPoints[0]}
              onOptionSelect={handleOptionSelect}
              isVisible={showInteraction}
            />
          )}
        </div>

        {/* Navigation breadcrumb */}
        <div className="max-w-4xl mx-auto mt-8 text-center">
          <div className="inline-flex gap-3 bg-white rounded-full px-8 py-4 shadow-lg border-2 border-purple-100">
            {path.steps.slice(0, 5).map((step, index) => (
              <div
                key={step.id}
                className={`rounded-full transition-all duration-300 ${
                  path.visitedStepIds.includes(step.id) || step.id === path.currentStepId
                    ? 'bg-gradient-to-r from-purple-400 to-pink-400 w-4 h-4 shadow-md'
                    : 'bg-gray-300 w-3 h-3'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
