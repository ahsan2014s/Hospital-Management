import express from 'express';
import cors from 'cors';
import apiRouter  from './src/routes/api.js';
import patientRouter  from './src/routes/patientAPI.js';
import nurseRouter from './src/routes/nurseAPI.js';
import adminRouter from './src/routes/adminAPI.js';
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use('/api', apiRouter );
app.use('/api', patientRouter );
app.use('/api', nurseRouter );
app.use('/api/admin', adminRouter );
// Health check
// app.get('/health', (req, res) => {
//   res.json({ message: 'Backend is running!' });
// });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;