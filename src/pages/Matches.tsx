import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, MapPin, Calendar, Shield, MessageCircle, Phone, Star } from 'lucide-react';
import { MatchProfile } from '../types';

const Matches: React.FC = () => {
  const [matches, setMatches] = useState<MatchProfile[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockMatches: MatchProfile[] = [
      {
        id: '1',
        firstName: 'Priya',
        age: 24,
        locality: 'Koramangala, Bangalore',
        compatibilityScore: 92,
        lifestyleTags: ['Early Bird', 'Clean', 'Quiet', 'Student'],
        emotionalTraits: ['Empathetic', 'Calm', 'Supportive'],
        availabilityDate: '2024-02-15',
        safetyVerified: true,
        profileImage: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=300',
      },
      {
        id: '2',
        firstName: 'Ananya',
        age: 26,
        locality: 'Bandra, Mumbai',
        compatibilityScore: 88,
        lifestyleTags: ['Night Owl', 'Social', 'Cook', 'Professional'],
        emotionalTraits: ['Outgoing', 'Understanding', 'Positive'],
        availabilityDate: '2024-03-01',
        safetyVerified: true,
        profileImage: 'https:images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=300',
      },
      {
        id: '3',
        firstName: 'Kavya',
        age: 23,
        locality: 'Cyber City, Gurgaon',
        compatibilityScore: 85,
        lifestyleTags: ['Balanced', 'Organized', 'Fitness', 'Tech'],
        emotionalTraits: ['Motivated', 'Reliable', 'Friendly'],
        availabilityDate: '2024-02-28',
        safetyVerified: true,
        profileImage: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=300',
      },
    ];

    setTimeout(() => {
      setMatches(mockMatches);
      setLoading(false);
    }, 1500);
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    return 'text-orange-600 bg-orange-100';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Finding your perfect matches...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Perfect Matches
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Based on your voice profile, we've found these compatible roommates for you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {matches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Profile Image */}
              <div className="relative">
                <img
                  src={match.profileImage}
                  alt={match.firstName}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  {match.safetyVerified && (
                    <div className="bg-green-500 text-white p-2 rounded-full">
                      <Shield className="w-4 h-4" />
                    </div>
                  )}
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(match.compatibilityScore)}`}>
                    {match.compatibilityScore}% Match
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{match.firstName}</h3>
                  <span className="text-gray-600">{match.age} years</span>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{match.locality}</span>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">Available from {new Date(match.availabilityDate).toLocaleDateString()}</span>
                </div>

                {/* Lifestyle Tags */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Lifestyle</h4>
                  <div className="flex flex-wrap gap-2">
                    {match.lifestyleTags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Emotional Traits */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Personality</h4>
                  <div className="flex flex-wrap gap-2">
                    {match.emotionalTraits.map((trait, traitIndex) => (
                      <span
                        key={traitIndex}
                        className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200"
                  >
                    <MessageCircle className="w-4 h-4 inline mr-2" />
                    Chat
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-white border-2 border-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:border-pink-300 transition-all duration-200"
                  >
                    <Phone className="w-4 h-4 inline mr-2" />
                    Call
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {matches.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No matches found yet</h3>
            <p className="text-gray-500">Complete your voice profile to find compatible roommates.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Matches;