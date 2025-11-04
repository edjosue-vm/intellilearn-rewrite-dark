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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Hero Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-full p-1 shadow-lg">
              <div className="bg-white rounded-full px-6 py-2">
                <span className="text-purple-600 font-bold text-sm">✨ Aprendizaje Adaptativo</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-7xl font-extrabold mb-6 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent drop-shadow-sm animate-pulse">
            IntelliLearn
          </h1>
          
          <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
            Explicaciones visuales interactivas que se adaptan a tu manera de aprender
          </p>
          
          <div className="flex justify-center gap-4">
            <div className="bg-white rounded-full px-6 py-3 shadow-md border-2 border-purple-200">
              <span className="text-purple-600 font-semibold">🎯 Personalizado</span>
            </div>
            <div className="bg-white rounded-full px-6 py-3 shadow-md border-2 border-pink-200">
              <span className="text-pink-600 font-semibold">🚀 Interactivo</span>
            </div>
            <div className="bg-white rounded-full px-6 py-3 shadow-md border-2 border-blue-200">
              <span className="text-blue-600 font-semibold">💡 Visual</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-300 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative bg-white rounded-3xl p-8 border-2 border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-md">
                <div className="text-4xl">🎨</div>
              </div>
              <h3 className="text-2xl font-bold text-blue-700 mb-3">Aprendizaje Visual</h3>
              <p className="text-gray-600 leading-relaxed">
                Los conceptos se construyen visualmente ante tus ojos, no solo texto plano
              </p>
              <div className="mt-4 flex items-center text-blue-500 font-semibold text-sm">
                <span>Explorar</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-300 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative bg-white rounded-3xl p-8 border-2 border-purple-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
              <div className="bg-gradient-to-br from-purple-100 to-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-md">
                <div className="text-4xl">🔄</div>
              </div>
              <h3 className="text-2xl font-bold text-purple-700 mb-3">Adaptativo</h3>
              <p className="text-gray-600 leading-relaxed">
                Las explicaciones cambian según tus respuestas y preguntas
              </p>
              <div className="mt-4 flex items-center text-purple-500 font-semibold text-sm">
                <span>Descubrir</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-pink-300 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative bg-white rounded-3xl p-8 border-2 border-pink-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
              <div className="bg-gradient-to-br from-pink-100 to-pink-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-md">
                <div className="text-4xl">💬</div>
              </div>
              <h3 className="text-2xl font-bold text-pink-700 mb-3">Interactivo</h3>
              <p className="text-gray-600 leading-relaxed">
                Pausa, haz preguntas y explora a tu propio ritmo
              </p>
              <div className="mt-4 flex items-center text-pink-500 font-semibold text-sm">
                <span>Comenzar</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Topic Selection */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-extrabold text-gray-800 mb-4">
              Elige un Tema para Explorar
            </h2>
            <p className="text-lg text-gray-600">Selecciona un tema y comienza tu viaje de aprendizaje personalizado</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {allTopics.map((topic, index) => (
              <button
                key={topic.id}
                onClick={() => startExplanation(topic)}
                className="group relative bg-white rounded-3xl p-8 border-2 border-purple-200 hover:border-purple-400 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 text-left overflow-hidden"
              >
                {/* Animated background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start gap-6 mb-4">
                    <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-purple-300 to-pink-300 rounded-3xl flex items-center justify-center text-5xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                      {topic.id === 'photosynthesis' ? '🌱' : '🔬'}
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="text-3xl font-extrabold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                        {topic.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-sm text-gray-500 font-medium">Disponible ahora</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                    {topic.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {topic.availableModes.map((mode) => (
                      <span
                        key={mode}
                        className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-bold border border-purple-200 group-hover:scale-110 transition-transform"
                      >
                        {mode}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
                    <span className="text-purple-600 font-bold group-hover:translate-x-2 transition-transform flex items-center gap-2">
                      Comenzar ahora
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map((star) => (
                        <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-extrabold text-gray-800 mb-4">
              Cómo Funciona
            </h2>
            <p className="text-lg text-gray-600">Tres simples pasos para comenzar tu aprendizaje interactivo</p>
          </div>
          
          <div className="relative">
            {/* Connection line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-green-300 via-blue-300 to-purple-300 hidden md:block"></div>
            
            <div className="space-y-8">
              <div className="flex gap-8 items-start relative">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-400 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl z-10 transform hover:scale-110 hover:rotate-12 transition-all duration-300">
                  1
                </div>
                <div className="flex-1 bg-white rounded-3xl p-8 border-2 border-green-200 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 rounded-2xl p-3">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-green-600 mb-3">Elige Tu Tema</h4>
                      <p className="text-gray-700 leading-relaxed text-lg">Selecciona lo que quieres aprender de nuestra creciente biblioteca de temas</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-8 items-start relative">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl z-10 transform hover:scale-110 hover:rotate-12 transition-all duration-300">
                  2
                </div>
                <div className="flex-1 bg-white rounded-3xl p-8 border-2 border-blue-200 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 rounded-2xl p-3">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-blue-600 mb-3">Observa Cómo se Construye</h4>
                      <p className="text-gray-700 leading-relaxed text-lg">Los conceptos se construyen visualmente, paso a paso, con pausas automáticas</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-8 items-start relative">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl z-10 transform hover:scale-110 hover:rotate-12 transition-all duration-300">
                  3
                </div>
                <div className="flex-1 bg-white rounded-3xl p-8 border-2 border-purple-200 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 rounded-2xl p-3">
                      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-purple-600 mb-3">Guía Tu Aprendizaje</h4>
                      <p className="text-gray-700 leading-relaxed text-lg">Elige analogías, haz preguntas o profundiza - la explicación se adapta a ti</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
