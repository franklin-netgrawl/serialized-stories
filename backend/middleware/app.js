// backend/app.js or index.js
const authMiddleware = require('./middleware/auth');

// Protected routes
app.use('/api/stories', authMiddleware, storiesRoutes);
