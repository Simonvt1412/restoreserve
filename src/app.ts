import express, { Request, Response } from 'express';
import path from 'path';
import { SupabaseClient } from '@supabase/supabase-js';
import supabase from './server/services/db';
import { renderFile } from 'ejs'; // Importeer renderFile van EJS

const app = express();
const PORT = process.env.PORT || 3000;

// Stel de views-map in voor server-side rendering
app.set('views', path.join(__dirname, '../../views'));
app.set('view engine', 'html');
app.engine('html', renderFile); // Gebruik de geïmporteerde renderFile-functie

// Serveer statische bestanden uit de public-map
app.use(express.static(path.join(__dirname, '../../public')));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.render('index');
});

app.get('/afspraken', (req: Request, res: Response) => {
  res.render('afspraken');
});

app.get('/detail', (req: Request, res: Response) => {
  res.render('detail');
});

// Test de Supabase-verbinding
async function testConnection() {
  try {
    const supabaseClient: SupabaseClient = supabase;
    const { data, error } = await supabaseClient.from('restaurants').select('*').limit(1);
    if (error) throw error;
    console.log('Successfully connected to Supabase:', data);
  } catch (error) {
    console.error('Error connecting to Supabase:', error);
  }
}
testConnection();

// Start de server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});