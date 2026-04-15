import { create } from 'zustand'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const AUTH = `${API_URL}/api`;
export const useStore = create((set) => ({
  isLoading: false,
  result: null, // Dito itatago ang response (FAKE, 9/10, etc.)
  error: null,

  // Inayos ang syntax ng async function
  checkNews: async (text) => {
    set({ isLoading: true, error: null });
    try {
      // Ipinasa natin ang 'text' sa body ng request
      const res = await axios.post(`${AUTH}/news/check`, { text });
      
      // I-set ang result base sa response ng API
      set({ result: res.data, isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || "Something went wrong" 
      });
    }
  }
}))

