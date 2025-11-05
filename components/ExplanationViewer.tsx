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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-300/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-300/40 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      {/* Progress indicator */}
      <div className="fixed top-0 left-0 right-0 h-3 bg-white/50 backdrop-blur-sm z-50 shadow-lg">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 transition-all duration-500 rounded-r-full shadow-lg"
          style={{ width: `${(path.visitedStepIds.length / path.steps.length) * 100}%` }}
        >
          <div className="absolute right-0 top-0 h-full w-8 bg-white/30 blur-sm"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 pt-8">
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-10 py-4 border-2 border-purple-300 shadow-2xl">
            <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-purple-600 font-extrabold text-xl">
              Paso {path.visitedStepIds.length + 1} de {path.steps.length}
            </span>
          </div>
        </div>

        {/* Main content */}
        <div className="space-y-10">
          {/* Content text */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-pink-200 rounded-3xl blur opacity-30"></div>
              <div className="relative bg-white rounded-3xl p-12 border-2 border-purple-300 shadow-2xl">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full shadow-lg"></div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full shadow-lg"></div>
                <p className="text-2xl text-gray-800 leading-relaxed text-center font-medium">
                  {currentStep.content}
                </p>
              </div>
            </div>
          </div>

          {/* Visualization */}
          <div className="transition-all duration-500">
            {renderVisualization()}
          </div>

          {/* Mode switcher */}
          {visualProgress >= 100 && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl p-6 border-2 border-purple-200 shadow-xl">
                <p className="text-center text-sm text-gray-600 mb-4 font-semibold">Cambia la vista:</p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setVisualMode('diagram')}
                    className={`group px-8 py-4 rounded-2xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                      visualMode === 'diagram'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white scale-105'
                        : 'bg-white text-gray-700 hover:bg-blue-50 border-2 border-blue-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">📊</span>
                      <span>Diagrama</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setVisualMode('analogy')}
                    className={`group px-8 py-4 rounded-2xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                      visualMode === 'analogy'
                        ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white scale-105'
                        : 'bg-white text-gray-700 hover:bg-purple-50 border-2 border-purple-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🤔</span>
                      <span>Analogía</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setVisualMode('example')}
                    className={`group px-8 py-4 rounded-2xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                      visualMode === 'example'
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white scale-105'
                        : 'bg-white text-gray-700 hover:bg-green-50 border-2 border-green-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">💡</span>
                      <span>Ejemplo</span>
                    </div>
                  </button>
                </div>
              </div>
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
