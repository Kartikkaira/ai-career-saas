const mongoose = require('mongoose');

let isConnected = false;

const seedDemoUser = async () => {
  try {
    const User = require('../models/User');
    const demoEmail = 'demo@careercraft.ai';
    const existing = await User.findOne({ email: demoEmail });
    if (!existing) {
      await User.create({
        name: 'Demo Candidate',
        email: demoEmail,
        password: 'DemoPass123!',
        role: 'free',
      });
      console.log('[Seed] Demo candidate account initialized (demo@careercraft.ai / DemoPass123!)');
    }
  } catch (seedErr) {
    // Non-blocking
  }
};

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  // If in test environment without explicit DB, skip waiting
  if (process.env.NODE_ENV === 'test' && !process.env.TEST_MONGODB_URI) {
    return;
  }

  const hasEnvUri = Boolean(process.env.MONGODB_URI || process.env.MONGODB_ATLAS_URI);
  const primaryUri = process.env.MONGODB_URI || process.env.MONGODB_ATLAS_URI || 'mongodb://127.0.0.1:27017/ai-career-saas';
  const localFallbackUri = 'mongodb://127.0.0.1:27017/ai-career-saas';

  if (!hasEnvUri && process.env.NODE_ENV === 'production') {
    console.error('================================================================');
    console.error(' [MongoDB] ⚠️  MISSING MONGODB_URI ENVIRONMENT VARIABLE!');
    console.error(' Please add MONGODB_URI to your Render/hosting environment variables.');
    console.error(' Format: mongodb+srv://<user>:<password>@<cluster>.mongodb.net/ai-career-saas?retryWrites=true&w=majority');
    console.error('================================================================');
  }

  try {
    const conn = await mongoose.connect(primaryUri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    console.log(`[MongoDB] Connected: ${conn.connection.host}/${conn.connection.name}`);
    await seedDemoUser();
    return;
  } catch (error) {
    console.warn(`[MongoDB] Notice: Could not connect to primary MongoDB URI.`);
    console.warn(`[MongoDB] Reason: ${error.message}`);

    // If primary was not the local URI and not in production, attempt fallback to local MongoDB
    if (primaryUri !== localFallbackUri && process.env.NODE_ENV !== 'production') {
      console.log(`[MongoDB] Attempting fallback to local MongoDB (${localFallbackUri})...`);
      try {
        const localConn = await mongoose.connect(localFallbackUri, {
          serverSelectionTimeoutMS: 5000,
          socketTimeoutMS: 45000,
        });
        isConnected = true;
        console.log(`[MongoDB] Connected to local MongoDB fallback: ${localConn.connection.host}/${localConn.connection.name}`);
        await seedDemoUser();
        return;
      } catch (localError) {
        console.error(`[MongoDB] Local fallback also failed: ${localError.message}`);
      }
    }
  }
};

module.exports = connectDB;
