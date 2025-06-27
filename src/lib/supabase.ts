import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are properly configured
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const hasPlaceholderValues = 
  supabaseUrl === 'your_supabase_url_here' || 
  supabaseAnonKey === 'your_supabase_anon_key_here';

let supabase: any;

if (!supabaseUrl || !supabaseAnonKey || hasPlaceholderValues || !isValidUrl(supabaseUrl)) {
  console.error('⚠️  Supabase configuration required');
  console.error('Please click the "Connect to Supabase" button in the top right to set up your database connection.');
  
  // Create a mock client that will show helpful error messages
  const mockClient = {
    from: () => ({
      select: () => Promise.reject(new Error('Supabase not configured. Please connect to Supabase first.')),
      insert: () => Promise.reject(new Error('Supabase not configured. Please connect to Supabase first.')),
      update: () => Promise.reject(new Error('Supabase not configured. Please connect to Supabase first.')),
      delete: () => Promise.reject(new Error('Supabase not configured. Please connect to Supabase first.')),
    }),
    auth: {
      signUp: () => Promise.reject(new Error('Supabase not configured. Please connect to Supabase first.')),
      signIn: () => Promise.reject(new Error('Supabase not configured. Please connect to Supabase first.')),
      signOut: () => Promise.reject(new Error('Supabase not configured. Please connect to Supabase first.')),
      getUser: () => Promise.reject(new Error('Supabase not configured. Please connect to Supabase first.')),
    }
  };
  
  // Assign the mock client to prevent runtime errors
  supabase = mockClient;
} else {
  // Create the real Supabase client when properly configured
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

// Generate a unique session ID for the user
export const getUserSession = (): string => {
  let session = localStorage.getItem('user_session');
  if (!session) {
    session = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('user_session', session);
  }
  return session;
};

export { supabase };