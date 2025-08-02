export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  city: string;
  occupation: string;
  profileComplete: boolean;
  safetyVerified: boolean;
}

export interface VoiceResponse {
  question: string;
  answer: string;
  timestamp: Date;
}

export interface MatchProfile {
  id: string;
  firstName: string;
  age: number;
  locality: string;
  compatibilityScore: number;
  lifestyleTags: string[];
  emotionalTraits: string[];
  availabilityDate: string;
  safetyVerified: boolean;
  profileImage?: string;
}

export interface TrustedContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
  email?: string;
  priority: number;
}

export interface EmergencyAlert {
  type: 'call' | 'sms' | 'email';
  message: string;
  timestamp: Date;
}