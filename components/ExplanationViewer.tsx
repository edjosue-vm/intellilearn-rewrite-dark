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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Loading explanation...</div>
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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Progress indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
          style={{ width: `${(path.visitedStepIds.length / path.steps.length) * 100}%` }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 pt-4">
          <div className="inline-flex items-center gap-2 bg-slate-800/50 rounded-full px-6 py-2 border border-slate-600/30">
            <span className="text-blue-400 font-semibold">
              Step {path.visitedStepIds.length + 1} of {path.steps.length}
            </span>
          </div>
        </div>

        {/* Main content */}
        <div className="space-y-8">
          {/* Content text */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-8 border border-slate-600/30 backdrop-blur-sm">
              <p className="text-xl text-white/90 leading-relaxed text-center">
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
                className={`px-4 py-2 rounded-lg transition-all ${
                  visualMode === 'diagram'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-white/70 hover:bg-slate-600'
                }`}
              >
                📊 Diagram
              </button>
              <button
                onClick={() => setVisualMode('analogy')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  visualMode === 'analogy'
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-700 text-white/70 hover:bg-slate-600'
                }`}
              >
                🤔 Analogy
              </button>
              <button
                onClick={() => setVisualMode('example')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  visualMode === 'example'
                    ? 'bg-green-600 text-white'
                    : 'bg-slate-700 text-white/70 hover:bg-slate-600'
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
          <div className="inline-flex gap-2 bg-slate-800/30 rounded-full px-6 py-3">
            {path.steps.slice(0, 5).map((step, index) => (
              <div
                key={step.id}
                className={`w-2 h-2 rounded-full transition-all ${
                  path.visitedStepIds.includes(step.id) || step.id === path.currentStepId
                    ? 'bg-blue-500 w-3 h-3'
                    : 'bg-slate-600'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
