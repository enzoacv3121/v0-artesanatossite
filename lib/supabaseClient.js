import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cjtcnyumzmcuyjhujlwf.supabase.co' // <-- URL CORRIGIDA!
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqdGNueXVtem1jdXlqaHVqbHdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNjA5MjcsImV4cCI6MjA3NjYzNjkyN30.eN4XKECJYZi52NJj3akmlh6bOW70mk3xvLRieM9roew'
export const supabase = createClient(supabaseUrl, supabaseKey)