// Core types for the Adaptive Explanation Engine

export type ExplanationMode = 'diagram' | 'analogy' | 'technical' | 'practical';

export type VisualizationType = 'progressive-diagram' | 'animated-analogy' | 'contextual-example';

export interface ExplanationStep {
  id: string;
  content: string;
  visualType: VisualizationType;
  visualData: any;
  interactionPoints: InteractionPoint[];
  nextSteps: string[]; // IDs of possible next steps
}

export interface InteractionPoint {
  id: string;
  type: 'pause' | 'branch' | 'question';
  promptText: string;
  options: InteractionOption[];
}

export interface InteractionOption {
  id: string;
  label: string;
  icon: string;
  targetStepId?: string; // For branching
  mode?: ExplanationMode; // For mode switching
  action?: 'continue' | 'deeper' | 'analogy' | 'example';
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  availableModes: ExplanationMode[];
}

export interface ExplanationPath {
  topicId: string;
  steps: ExplanationStep[];
  currentStepId: string;
  visitedStepIds: string[];
  userInteractions: UserInteraction[];
}

export interface UserInteraction {
  timestamp: Date;
  stepId: string;
  optionId: string;
  selectedMode?: ExplanationMode;
  userQuestion?: string;
}

export interface ProgressState {
  topicId: string;
  pathId: string;
  currentStepId: string;
  completedSteps: string[];
  lastUpdated: Date;
}
