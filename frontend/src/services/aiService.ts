import axios from 'axios';
import { AIRequest, AIResponse } from '../types/ai.types';

const API_BASE_URL = 'http://localhost:8080/api/ai';

export const aiService = {
  async simulateAI(input: string): Promise<AIResponse> {
    const request: AIRequest = { input };
    const response = await axios.post<AIResponse>(`${API_BASE_URL}/simulate`, request);
    return response.data;
  },

  async checkHealth(): Promise<string> {
    const response = await axios.get<string>(`${API_BASE_URL}/health`);
    return response.data;
  }
};
