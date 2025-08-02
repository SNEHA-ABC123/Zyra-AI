// OmniDimension Voice Assistant Integration
declare global {
  interface Window {
    OmniDimension: any;
  }
}

export class OmniDimensionService {
  private static instance: OmniDimensionService;
  private isInitialized = false;

  static getInstance(): OmniDimensionService {
    if (!OmniDimensionService.instance) {
      OmniDimensionService.instance = new OmniDimensionService();
    }
    return OmniDimensionService.instance;
  }

  async initialize(): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.isInitialized) {
        resolve(true);
        return;
      }

      // Check if OmniDimension script is loaded
      const checkScript = () => {
        if (window.OmniDimension) {
          this.isInitialized = true;
          console.log('OmniDimension Voice Assistant initialized');
          resolve(true);
        } else {
          // Retry after 100ms
          setTimeout(checkScript, 100);
        }
      };

      checkScript();
    });
  }

  async startVoiceRecording(questionId: string, questionText: string): Promise<void> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      // Start voice recording with OmniDimension
      if (window.OmniDimension && window.OmniDimension.startRecording) {
        await window.OmniDimension.startRecording({
          questionId,
          questionText,
          language: 'en-IN', // Indian English
          timeout: 30000, // 30 seconds timeout
        });
      }
    } catch (error) {
      console.error('Failed to start voice recording:', error);
      throw error;
    }
  }

  async stopVoiceRecording(): Promise<string> {
    if (!this.isInitialized) {
      throw new Error('OmniDimension not initialized');
    }

    try {
      // Stop recording and get transcription
      if (window.OmniDimension && window.OmniDimension.stopRecording) {
        const result = await window.OmniDimension.stopRecording();
        return result.transcription || '';
      }
      return '';
    } catch (error) {
      console.error('Failed to stop voice recording:', error);
      throw error;
    }
  }

  async processVoiceResponse(transcription: string, questionId: string): Promise<any> {
    try {
      // Process the voice response for emotional analysis
      if (window.OmniDimension && window.OmniDimension.analyzeEmotion) {
        const analysis = await window.OmniDimension.analyzeEmotion({
          text: transcription,
          questionId,
        });
        
        return {
          transcription,
          emotionalTone: analysis.tone || 'neutral',
          confidence: analysis.confidence || 0.5,
          keywords: analysis.keywords || [],
          sentiment: analysis.sentiment || 'neutral',
        };
      }

      // Fallback if OmniDimension analysis is not available
      return {
        transcription,
        emotionalTone: 'neutral',
        confidence: 0.5,
        keywords: [],
        sentiment: 'neutral',
      };
    } catch (error) {
      console.error('Failed to process voice response:', error);
      throw error;
    }
  }

  isAvailable(): boolean {
    return this.isInitialized && !!window.OmniDimension;
  }
}

export default OmniDimensionService.getInstance();