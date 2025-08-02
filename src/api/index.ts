// API configuration and endpoints
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.zyra-ai.com' 
  : 'http://localhost:3001';

// API endpoints
export const endpoints = {
  // Authentication
  login: '/auth/login',
  signup: '/auth/signup',
  logout: '/auth/logout',
  
  // User profile
  profile: '/user/profile',
  updateProfile: '/user/profile',
  
  // Voice intake
  submitVoiceResponses: '/voice/submit',
  getVoiceQuestions: '/voice/questions',
  
  // Matching
  getMatches: '/matches',
  getMatchDetails: '/matches/:id',
  
  // Safety
  emergencyAlert: '/safety/emergency',
  addTrustedContact: '/safety/contacts',
  getTrustedContacts: '/safety/contacts',
  
  // Admin
  getUsers: '/admin/users',
  getSafetyReports: '/admin/safety-reports',
  getAnalytics: '/admin/analytics',
};

// API helper functions
export const api = {
  // Generic request function
  request: async (endpoint: string, options: RequestInit = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('authToken');
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  },

  // Authentication
  login: async (email: string, password: string) => {
    return api.request(endpoints.login, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  signup: async (userData: any) => {
    return api.request(endpoints.signup, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Voice intake
  submitVoiceResponses: async (responses: any[]) => {
    return api.request(endpoints.submitVoiceResponses, {
      method: 'POST',
      body: JSON.stringify({ responses }),
    });
  },

  // Matches
  getMatches: async () => {
    return api.request(endpoints.getMatches);
  },

  // Safety
  sendEmergencyAlert: async (contactIds: string[], message: string) => {
    return api.request(endpoints.emergencyAlert, {
      method: 'POST',
      body: JSON.stringify({ contactIds, message }),
    });
  },

  addTrustedContact: async (contact: any) => {
    return api.request(endpoints.addTrustedContact, {
      method: 'POST',
      body: JSON.stringify(contact),
    });
  },

  getTrustedContacts: async () => {
    return api.request(endpoints.getTrustedContacts);
  },
};

export default api;