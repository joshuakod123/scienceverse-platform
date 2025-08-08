// File: components/CourseLayout.js

import React from 'react';
import Head from 'next/head';

const CourseLayout = ({ title, description, children }) => {
  return (
    <>
      <Head>
        <title>{title} | ScienceVerse</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-2xl font-bold text-indigo-600">
                  ScienceVerse
                </div>
                <div className="text-gray-400">|</div>
                <div className="text-lg text-gray-600">
                  Advanced Placement Courses
                </div>
              </div>
              
              <nav className="hidden md:flex items-center space-x-6">
                <a href="/courses" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Courses
                </a>
                <a href="/progress" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Progress
                </a>
                <a href="/profile" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Profile
                </a>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main>
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t mt-16">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center text-gray-600">
              <p>&copy; 2025 ScienceVerse. All rights reserved.</p>
              <p className="mt-2 text-sm">
                Empowering students through interactive science education
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default CourseLayout;