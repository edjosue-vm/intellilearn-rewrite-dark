// Phase 1: Core Adaptive Explanation Engine
// Analyzes topics and creates interactive explanation paths

import type { Topic, ExplanationPath, ExplanationStep, ExplanationMode, VisualizationType } from '@/types/explanation';

export class AdaptiveExplanationEngine {
  /**
   * Analyzes a topic and determines the most effective explanatory approaches
   */
  static analyzeTopicApproaches(topic: Topic): ExplanationMode[] {
    const approaches: ExplanationMode[] = ['diagram'];
    
    // Add technical mode if topic has detailed points
    if (topic.keyPoints.length > 3) {
      approaches.push('technical');
    }
    
    // Always offer analogy mode for better understanding
    approaches.push('analogy');
    
    // Add practical mode for real-world applications
    approaches.push('practical');
    
    return approaches;
  }

  /**
   * Builds an interactive explanation path with interaction points
   */
  static buildExplanationPath(topic: Topic, startMode: ExplanationMode = 'diagram'): ExplanationPath {
    const steps = this.generateSteps(topic, startMode);
    
    return {
      topicId: topic.id,
      steps,
      currentStepId: steps[0]?.id || '',
      visitedStepIds: [],
      userInteractions: [],
    };
  }

  /**
   * Generates steps for a topic based on the selected mode
   */
  private static generateSteps(topic: Topic, mode: ExplanationMode): ExplanationStep[] {
    const steps: ExplanationStep[] = [];
    
    // Introduction step
    steps.push({
      id: `${topic.id}-intro`,
      content: `Let's explore ${topic.title}. ${topic.description}`,
      visualType: 'progressive-diagram',
      visualData: { type: 'introduction', topic: topic.title },
      interactionPoints: [{
        id: 'intro-checkpoint',
        type: 'pause',
        promptText: 'Ready to begin?',
        options: [
          {
            id: 'continue',
            label: 'Let\'s go!',
            icon: '✅',
            action: 'continue',
          },
          {
            id: 'change-mode',
            label: 'Show me differently',
            icon: '🔄',
            action: 'analogy',
          },
        ],
      }],
      nextSteps: [`${topic.id}-step-1`],
    });

    // Generate steps for each key point
    topic.keyPoints.forEach((point, index) => {
      const stepId = `${topic.id}-step-${index + 1}`;
      const visualType = this.selectVisualizationType(mode, index);
      
      steps.push({
        id: stepId,
        content: point,
        visualType,
        visualData: this.generateVisualData(topic, point, visualType, mode),
        interactionPoints: this.generateInteractionPoints(stepId, index, topic.keyPoints.length),
        nextSteps: index < topic.keyPoints.length - 1 
          ? [`${topic.id}-step-${index + 2}`]
          : [`${topic.id}-summary`],
      });
    });

    // Summary step
    steps.push({
      id: `${topic.id}-summary`,
      content: `Great! You've learned about ${topic.title}. Let's recap the key concepts.`,
      visualType: 'contextual-example',
      visualData: { type: 'summary', keyPoints: topic.keyPoints },
      interactionPoints: [{
        id: 'summary-checkpoint',
        type: 'question',
        promptText: 'How are you feeling about this topic?',
        options: [
          {
            id: 'confident',
            label: 'I understand it!',
            icon: '🎯',
            action: 'continue',
          },
          {
            id: 'review',
            label: 'Let me review',
            icon: '🔄',
            targetStepId: `${topic.id}-intro`,
          },
          {
            id: 'deeper',
            label: 'Tell me more',
            icon: '🔍',
            action: 'deeper',
          },
        ],
      }],
      nextSteps: [],
    });

    return steps;
  }

  private static selectVisualizationType(mode: ExplanationMode, stepIndex: number): VisualizationType {
    switch (mode) {
      case 'diagram':
        return 'progressive-diagram';
      case 'analogy':
        return 'animated-analogy';
      case 'technical':
      case 'practical':
        return 'contextual-example';
      default:
        return 'progressive-diagram';
    }
  }

  private static generateVisualData(topic: Topic, point: string, visualType: VisualizationType, mode: ExplanationMode) {
    return {
      type: visualType,
      mode,
      content: point,
      topicTitle: topic.title,
    };
  }

  private static generateInteractionPoints(stepId: string, stepIndex: number, totalSteps: number) {
    return [{
      id: `${stepId}-interaction`,
      type: 'pause' as const,
      promptText: 'Got it so far?',
      options: [
        {
          id: 'continue',
          label: 'Continue',
          icon: '✅',
          action: 'continue' as const,
        },
        {
          id: 'analogy',
          label: 'Show analogy',
          icon: '🤔',
          action: 'analogy' as const,
        },
        {
          id: 'technical',
          label: 'More details',
          icon: '🔍',
          action: 'deeper' as const,
        },
      ],
    }];
  }

  /**
   * Handles user interruptions and creates branch paths
   */
  static handleUserQuestion(
    currentPath: ExplanationPath,
    currentStepId: string,
    userQuestion: string
  ): ExplanationStep {
    // Create a dynamic step to answer the user's question
    const branchStep: ExplanationStep = {
      id: `${currentStepId}-branch-${Date.now()}`,
      content: `Let me explain: ${userQuestion}`,
      visualType: 'contextual-example',
      visualData: {
        type: 'dynamic-answer',
        question: userQuestion,
        contextStepId: currentStepId,
      },
      interactionPoints: [{
        id: 'branch-return',
        type: 'question',
        promptText: 'Does that help?',
        options: [
          {
            id: 'back',
            label: 'Yes, let\'s continue',
            icon: '✅',
            targetStepId: currentStepId,
          },
          {
            id: 'deeper',
            label: 'Tell me more',
            icon: '🔍',
            action: 'deeper',
          },
        ],
      }],
      nextSteps: [currentStepId],
    };

    return branchStep;
  }
}
