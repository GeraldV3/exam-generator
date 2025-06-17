import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lcchrdynewjyepwtrtux.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjY2hyZHluZXdqeWVwd3RydHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2OTQxNDMsImV4cCI6MjA2NTI3MDE0M30.h9taWcQ6WZKx0U4Z7oG8WKoWmzEopJw5ZyQgjX3xglg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
