import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, Mail, AlertTriangle, Shield, Plus, Edit, Trash2 } from 'lucide-react';
import { TrustedContact } from '../types';

const QuickConnect: React.FC = () => {
  const [contacts, setContacts] = useState<TrustedContact[]>([]);
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    relation: '',
    phone: '',
    email: '',
  });

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockContacts: TrustedContact[] = [
      {
        id: '1',
        name: 'Mom',
        relation: 'Mother',
        phone: '+91-9876543210',
        email: 'mom@example.com',
        priority: 1,
      },
      {
        id: '2',
        name: 'Hostel Warden',
        relation: 'Warden',
        phone: '+91-9876543211',
        priority: 2,
      },
      {
        id: '3',
        name: 'Best Friend',
        relation: 'Friend',
        phone: '+91-9876543212',
        email: 'friend@example.com',
        priority: 3,
      },
    ];
    setContacts(mockContacts);
  }, []);

  const handleEmergencyAction = (contactId: string, action: 'call' | 'sms' | 'email') => {
    const contact = contacts.find(c => c.id === contactId);
    if (!contact) return;

    switch (action) {
      case 'call':
        window.open(`tel:${contact.phone}`);
        break;
      case 'sms':
        window.open(`sms:${contact.phone}?body=Emergency! I need help. Please contact me immediately.`);
        break;
      case 'email':
        if (contact.email) {
          window.open(`mailto:${contact.email}?subject=Emergency Alert&body=Emergency! I need help. Please contact me immediately.`);
        }
        break;
    }

    // Log the emergency action
    console.log(`Emergency ${action} sent to ${contact.name}`);
  };

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    const contact: TrustedContact = {
      id: Date.now().toString(),
      ...newContact,
      priority: contacts.length + 1,
    };
    setContacts([...contacts, contact]);
    setNewContact({ name: '', relation: '', phone: '', email: '' });
    setShowAddContact(false);
  };

  const handleDeleteContact = (contactId: string) => {
    setContacts(contacts.filter(c => c.id !== contactId));
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Emergency Quick Connect
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Instantly connect with your trusted contacts in case of emergency. One tap to call, message, or email.
          </p>
        </motion.div>

        {/* Emergency Alert Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-center space-x-4">
            <Shield className="w-8 h-8 text-red-600" />
            <div className="text-center">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Emergency Broadcast</h3>
              <p className="text-red-700 text-sm mb-4">
                Send an immediate alert to all your trusted contacts
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  contacts.forEach(contact => {
                    handleEmergencyAction(contact.id, 'call');
                  });
                }}
                className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
              >
                SEND EMERGENCY ALERT
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Trusted Contacts */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Trusted Contacts</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddContact(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium"
            >
              <Plus className="w-4 h-4" />
              <span>Add Contact</span>
            </motion.button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {contacts.map((contact, index) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{contact.name}</h3>
                    <p className="text-gray-600">{contact.relation}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-gray-400 hover:text-gray-600">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteContact(contact.id)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <p className="text-sm text-gray-600">📞 {contact.phone}</p>
                  {contact.email && (
                    <p className="text-sm text-gray-600">✉️ {contact.email}</p>
                  )}
                </div>

                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEmergencyAction(contact.id, 'call')}
                    className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                  >
                    <Phone className="w-4 h-4 inline mr-2" />
                    Call
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEmergencyAction(contact.id, 'sms')}
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    SMS
                  </motion.button>
                  {contact.email && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEmergencyAction(contact.id, 'email')}
                      className="flex-1 bg-purple-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors"
                    >
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Add Contact Modal */}
        {showAddContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Add Trusted Contact</h3>
              <form onSubmit={handleAddContact} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={newContact.name}
                    onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Contact name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Relation</label>
                  <input
                    type="text"
                    required
                    value={newContact.relation}
                    onChange={(e) => setNewContact({ ...newContact, relation: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="e.g., Mother, Friend, Warden"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    required
                    value={newContact.phone}
                    onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="+91-9876543210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email (Optional)</label>
                  <input
                    type="email"
                    value={newContact.email}
                    onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="email@example.com"
                  />
                </div>
                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddContact(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
                  >
                    Add Contact
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QuickConnect;