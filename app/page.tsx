'use client';

import React, { useState } from 'react';
import ExplanationViewer from '@/components/ExplanationViewer';
import { AdaptiveExplanationEngine } from '@/lib/explanation-engine';
import { photosynthesisTopic, cellStructureTopic, allTopics } from '@/lib/example-topics';
import type { ExplanationPath, Topic } from '@/types/explanation';

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [explanationPath, setExplanationPath] = useState<ExplanationPath | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState<'dashboard' | 'explore' | 'progress'>('dashboard');

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
      <div className="flex h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        {/* Sidebar Navigation */}
        <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r-2 border-purple-200 transition-all duration-300 shadow-xl`}>
          <div className="p-4">
            <button onClick={resetExplanation} className="w-full mb-6">
              <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {sidebarOpen && <span className="font-semibold">Volver</span>}
              </div>
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <ExplanationViewer
            path={explanationPath}
            onStepChange={handleStepChange}
            onInteraction={handleInteraction}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Sidebar Navigation */}
      <div className={`${sidebarOpen ? 'w-72' : 'w-20'} bg-white border-r-2 border-purple-200 transition-all duration-300 shadow-xl flex flex-col`}>
        {/* Logo & Toggle */}
        <div className="p-6 border-b-2 border-purple-100">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <h1 className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                IntelliLearn
              </h1>
            )}
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeView === 'dashboard'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'text-gray-700 hover:bg-purple-50'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {sidebarOpen && <span className="font-semibold">Dashboard</span>}
          </button>

          <button
            onClick={() => setActiveView('explore')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeView === 'explore'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'text-gray-700 hover:bg-purple-50'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {sidebarOpen && <span className="font-semibold">Explorar</span>}
          </button>

          <button
            onClick={() => setActiveView('progress')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeView === 'progress'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'text-gray-700 hover:bg-purple-50'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            {sidebarOpen && <span className="font-semibold">Mi Progreso</span>}
          </button>
        </nav>

        {/* User Profile */}
        {sidebarOpen && (
          <div className="p-4 border-t-2 border-purple-100">
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                U
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800 text-sm">Usuario</p>
                <p className="text-xs text-gray-600">Estudiante</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {activeView === 'dashboard' && (
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-4xl font-extrabold text-gray-800 mb-2">¡Bienvenido de vuelta!</h2>
              <p className="text-lg text-gray-600">Continúa tu viaje de aprendizaje</p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 border-2 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className="text-3xl font-bold text-blue-600">2</span>
                </div>
                <p className="text-gray-600 font-semibold">Temas Completados</p>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-green-200 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-3xl font-bold text-green-600">5</span>
                </div>
                <p className="text-gray-600 font-semibold">Racha (días)</p>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-3xl font-bold text-purple-600">45m</span>
                </div>
                <p className="text-gray-600 font-semibold">Tiempo Hoy</p>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-pink-200 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <span className="text-3xl font-bold text-pink-600">85%</span>
                </div>
                <p className="text-gray-600 font-semibold">Precisión</p>
              </div>
            </div>

            {/* Continue Learning */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Continuar Aprendiendo</h3>
              <div className="bg-white rounded-3xl p-6 border-2 border-purple-200 shadow-xl">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-300 to-emerald-300 rounded-2xl flex items-center justify-center text-5xl">
                    🌱
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-800 mb-1">Fotosíntesis</h4>
                    <p className="text-gray-600 mb-3">Lección 3 de 7 - El proceso clorofílico</p>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full" style={{width: '43%'}}></div>
                    </div>
                  </div>
                  <button 
                    onClick={() => startExplanation(photosynthesisTopic)}
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold hover:shadow-xl transition-all hover:scale-105"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Actividad Reciente</h3>
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-5 border-2 border-blue-200 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">📖</div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">Completaste: Estructura Celular</p>
                      <p className="text-sm text-gray-600">Hace 2 horas</p>
                    </div>
                    <div className="text-2xl">✅</div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border-2 border-green-200 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">🎯</div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">Nuevo logro desbloqueado</p>
                      <p className="text-sm text-gray-600">Hace 1 día</p>
                    </div>
                    <div className="text-2xl">🏆</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'explore' && (
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-4xl font-extrabold text-gray-800 mb-2">Explorar Temas</h2>
              <p className="text-lg text-gray-600">Descubre nuevos conceptos para aprender</p>
            </div>

            {/* Topic Selection */}
            <div className="max-w-5xl mx-auto">
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
          </div>
        )}

        {activeView === 'progress' && (
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-4xl font-extrabold text-gray-800 mb-2">Mi Progreso</h2>
              <p className="text-lg text-gray-600">Revisa tu desempeño y logros</p>
            </div>

            {/* Progress Overview */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 border-2 border-purple-200 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Nivel Actual</h3>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Progreso al Nivel 4</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full" style={{width: '65%'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-blue-200 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Total XP</h3>
                <div className="text-center">
                  <p className="text-5xl font-extrabold text-blue-600 mb-2">1,250</p>
                  <p className="text-sm text-gray-600">+150 esta semana</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-green-200 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Logros</h3>
                <div className="flex justify-center gap-2">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-2xl">🏆</div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-2xl">🎯</div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-2xl">⭐</div>
                </div>
                <p className="text-center text-sm text-gray-600 mt-2">8 de 15 desbloqueados</p>
              </div>
            </div>

            {/* Progress by Topic */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Progreso por Tema</h3>
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-6 border-2 border-green-200 shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-300 to-emerald-300 rounded-2xl flex items-center justify-center text-3xl">
                      🌱
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-800">Fotosíntesis</h4>
                      <p className="text-sm text-gray-600">Biología • 3 de 7 lecciones</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">43%</p>
                      <p className="text-sm text-gray-600">Completado</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full" style={{width: '43%'}}></div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border-2 border-blue-200 shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-300 to-cyan-300 rounded-2xl flex items-center justify-center text-3xl">
                      🔬
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-800">Estructura Celular</h4>
                      <p className="text-sm text-gray-600">Biología • 7 de 7 lecciones</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">100%</p>
                      <p className="text-sm text-gray-600">¡Completado!</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-blue-400 to-cyan-500 h-3 rounded-full" style={{width: '100%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
