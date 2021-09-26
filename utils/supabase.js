import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://trfvrobvcrzcsvjvimfi.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMjY1OTQzOSwiZXhwIjoxOTQ4MjM1NDM5fQ.UPpKk3eyIMMipswMAhU1ixoG56WwLdqWsVuB7TOai0A'
export const supabase = createClient(supabaseUrl, supabaseKey)
