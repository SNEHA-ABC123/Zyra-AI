import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, AlertTriangle, CheckCircle, Phone, Mail, MessageSquare } from 'lucide-react';

const Safety: React.FC = () => {
  const [safetyCircle, setSafetyCircle] = useState([
    { id: 1, name: 'Mom', relation: 'Mother', contact: '+91-9876543210', verified: true },
    { id: 2, name: 'Dad', relation: 'Father', contact: '+91-9876543211', verified: true },
    { id: 3, name: 'Sister', relation: 'Sister', contact: '+91-9876543212', verified: false },
  ]);

  const safetyFeatures = [
    {
      icon: Shield,
      title: 'Identity Verification',
      description: 'All users go through a comprehensive verification process including ID verification and background checks.',
      status: 'Active',
    },
    {
      icon: Users,
      title: 'Safety Circle',
      description: 'Set up trusted contacts who will be notified in case of emergencies or safety concerns.',
      status: 'Setup Required',
    },
    {
      icon: AlertTriangle,
      title: 'Emergency Alerts',
      description: 'One-tap emergency alerts to your safety circle and local authorities when needed.',
      status: 'Active',
    },
    {
      icon: Phone,
      title: 'Safe Communication',
      description: 'All communications are monitored and can be reported. Phone numbers are masked for privacy.',
      status: 'Active',
    },
  ];

  const emergencyContacts = [
    { name: 'Police', number: '100', type: 'emergency' },
    { name: 'Women Helpline', number: '1091', type: 'support' },
    { name: 'Ambulance', number: '108', type: 'medical' },
    { name: 'Fire Brigade', number: '101', type: 'emergency' },
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Safety is Our Priority
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive safety features designed specifically for women's security and peace of mind.
          </p>
        </motion.div>

        {/* Safety Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Safety Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {safetyFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          feature.status === 'Active' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {feature.status}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Safety Circle */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Your Safety Circle</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
            >
              Add Contact
            </motion.button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {safetyCircle.map((contact, index) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
                  {contact.verified ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                  )}
                </div>
                <p className="text-gray-600 mb-2">{contact.relation}</p>
                <p className="text-sm text-gray-500 mb-4">{contact.contact}</p>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-green-100 text-green-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Call
                  </button>
                  <button className="flex-1 bg-blue-100 text-blue-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                    <MessageSquare className="w-4 h-4 inline mr-1" />
                    SMS
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Emergency Contacts */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Emergency Contacts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {emergencyContacts.map((contact, index) => (
              <motion.div
                key={contact.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-red-800 mb-2">{contact.name}</h3>
                <p className="text-2xl font-bold text-red-600 mb-4">{contact.number}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open(`tel:${contact.number}`)}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Call Now
                </motion.button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Safety Tips */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Safety Tips</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Before Meeting</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Always meet in public places first</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Verify identity through video call</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Share meeting details with safety circle</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Trust your instincts</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Living Together</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Set clear boundaries and expectations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Keep emergency contacts updated</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Regular check-ins with family</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Report any concerns immediately</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Safety;