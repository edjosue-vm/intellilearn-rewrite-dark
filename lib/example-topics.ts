// Example topic data: Photosynthesis
import type { Topic } from '@/types/explanation';

export const photosynthesisTopic: Topic = {
  id: 'photosynthesis',
  title: 'Photosynthesis',
  description: 'Learn how plants convert sunlight into energy through a fascinating natural process.',
  keyPoints: [
    'Plants capture sunlight using chlorophyll, the green pigment in their leaves',
    'Water from the soil travels up through the plant to the leaves',
    'Carbon dioxide (CO₂) from the air enters through tiny pores called stomata',
    'Using light energy, water and CO₂ are transformed into glucose (sugar) and oxygen',
    'The oxygen is released into the air, while glucose provides energy for the plant to grow',
  ],
  availableModes: ['diagram', 'analogy', 'technical', 'practical'],
};

export const cellStructureTopic: Topic = {
  id: 'cell-structure',
  title: 'Cell Structure',
  description: 'Discover the basic building blocks of life and how cells are organized.',
  keyPoints: [
    'Cells are the smallest unit of life, like tiny factories working together',
    'The cell membrane acts as a protective barrier, controlling what goes in and out',
    'The nucleus is the control center, containing DNA with instructions for the cell',
    'Mitochondria are the powerhouses, generating energy from nutrients',
    'Different organelles work together like departments in a factory',
  ],
  availableModes: ['diagram', 'analogy', 'technical', 'practical'],
};

export const allTopics: Topic[] = [
  photosynthesisTopic,
  cellStructureTopic,
];
