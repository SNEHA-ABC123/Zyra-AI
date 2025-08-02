import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, AlertTriangle, BarChart3, Settings, Search, Filter } from 'lucide-react';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');

  const stats = [
    { label: 'Total Users', value: '2,847', change: '+12%', color: 'text-blue-600' },
    { label: 'Active Matches', value: '1,234', change: '+8%', color: 'text-green-600' },
    { label: 'Safety Reports', value: '23', change: '-15%', color: 'text-red-600' },
    { label: 'Verified Profiles', value: '2,456', change: '+18%', color: 'text-purple-600' },
  ];

  const recentUsers = [
    { id: 1, name: 'Priya Sharma', email: 'priya@example.com', city: 'Bangalore', status: 'verified', joinDate: '2024-01-15' },
    { id: 2, name: 'Ananya Gupta', email: 'ananya@example.com', city: 'Mumbai', status: 'pending', joinDate: '2024-01-14' },
    { id: 3, name: 'Kavya Reddy', email: 'kavya@example.com', city: 'Hyderabad', status: 'verified', joinDate: '2024-01-13' },
  ];

  const safetyReports = [
    { id: 1, reporter: 'User #1234', type: 'Inappropriate Behavior', status: 'investigating', date: '2024-01-15' },
    { id: 2, reporter: 'User #5678', type: 'Fake Profile', status: 'resolved', date: '2024-01-14' },
    { id: 3, reporter: 'User #9012', type: 'Safety Concern', status: 'pending', date: '2024-01-13' },
  ];

  const tabs = [
    { id: 'users', label: 'Users', icon: Users },
    { id: 'safety', label: 'Safety', icon: Shield },
    { id: 'reports', label: 'Reports', icon: AlertTriangle },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Manage users, monitor safety, and oversee platform operations.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-sm font-medium text-gray-600 mb-2">{stat.label}</h3>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                <span className={`text-sm font-medium ${stat.color}`}>{stat.change}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-pink-500 text-pink-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Users Tab */}
            {activeTab === 'users' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
                  <div className="flex space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search users..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Filter className="w-4 h-4" />
                      <span>Filter</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">City</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Join Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map((user) => (
                        <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{user.name}</td>
                          <td className="py-3 px-4 text-gray-600">{user.email}</td>
                          <td className="py-3 px-4 text-gray-600">{user.city}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.status === 'verified' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-orange-100 text-orange-700'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{user.joinDate}</td>
                          <td className="py-3 px-4">
                            <button className="text-pink-600 hover:text-pink-700 font-medium text-sm">
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Safety Tab */}
            {activeTab === 'safety' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-gray-900">Safety Reports</h2>
                
                <div className="space-y-4">
                  {safetyReports.map((report) => (
                    <div key={report.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{report.type}</h3>
                          <p className="text-sm text-gray-600">Reported by {report.reporter}</p>
                          <p className="text-sm text-gray-500">{report.date}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            report.status === 'resolved' 
                              ? 'bg-green-100 text-green-700'
                              : report.status === 'investigating'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-orange-100 text-orange-700'
                          }`}>
                            {report.status}
                          </span>
                          <button className="text-pink-600 hover:text-pink-700 font-medium text-sm">
                            Review
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Other tabs content */}
            {activeTab === 'reports' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">Reports & Analytics</h3>
                <p className="text-gray-500">Detailed reports and analytics coming soon.</p>
              </motion.div>
            )}

            {activeTab === 'analytics' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">Analytics Dashboard</h3>
                <p className="text-gray-500">Advanced analytics and insights coming soon.</p>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Settings className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">Platform Settings</h3>
                <p className="text-gray-500">Configuration and settings panel coming soon.</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;