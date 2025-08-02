import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  icon: string;
}

const VoiceIntake: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [responses, setResponses] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const questions: Question[] = [
    { id: 1, text: "When do you feel most active during the day?", icon: "🌅" },
    { id: 2, text: "How do you feel about cleanliness in your living space?", icon: "✨" },
    { id: 3, text: "Do you prefer spending time with your roommate or personal space?", icon: "👥" },
    { id: 4, text: "What kind of living environment do you enjoy (quiet, lively, mix)?", icon: "🏠" },
    { id: 5, text: "Where do you prefer to work/study — home, café, etc.?", icon: "💻" },
    { id: 6, text: "Do you enjoy cooking or eating out?", icon: "🍳" },
    { id: 7, text: "How do you feel about noise levels?", icon: "🔊" },
    { id: 8, text: "How do you handle emotions when upset?", icon: "💭" },
  ];

  useEffect(() => {
    // Initialize OmniDimension widget when component mounts
    const initializeWidget = () => {
      if (window.OmniDimension) {
        console.log('OmniDimension widget initialized');
      }
    };

    // Check if script is already loaded
    if (document.getElementById('omnidimension-web-widget')) {
      initializeWidget();
    }
  }, []);

  const handleStartRecording = () => {
    setIsRecording(true);
    // Integrate with OmniDimension voice recognition here
    console.log('Starting voice recording for question:', questions[currentQuestion].text);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // Process the recorded response
    const mockResponse = `Response to question ${currentQuestion + 1}`;
    const newResponses = [...responses];
    newResponses[currentQuestion] = mockResponse;
    setResponses(newResponses);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
      // Send responses to backend for processing
      console.log('All responses collected:', responses);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Voice Profile Complete!</h2>
          <p className="text-gray-600 mb-8">
            We're analyzing your responses to find your perfect roommate matches. This may take a few moments.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/matches'}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold"
          >
            View My Matches
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <div className="text-center">
              <div className="text-6xl mb-6">{questions[currentQuestion].icon}</div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                {questions[currentQuestion].text}
              </h2>

              {/* Voice Recording Interface */}
              <div className="flex flex-col items-center space-y-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={isRecording ? handleStopRecording : handleStartRecording}
                  className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isRecording
                      ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                      : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:shadow-xl'
                  }`}
                >
                  {isRecording ? (
                    <MicOff className="w-10 h-10 text-white" />
                  ) : (
                    <Mic className="w-10 h-10 text-white" />
                  )}
                </motion.button>

                <p className="text-gray-600 max-w-md">
                  {isRecording
                    ? 'Recording your response... Click to stop'
                    : 'Click the microphone to start recording your answer'}
                </p>

                {responses[currentQuestion] && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md">
                    <p className="text-green-800 text-sm">✓ Response recorded</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              currentQuestion === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Previous</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            disabled={!responses[currentQuestion]}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              !responses[currentQuestion]
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg'
            }`}
          >
            <span>{currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default VoiceIntake;