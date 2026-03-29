const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  // Delete old and create fresh admin
  await User.deleteOne({ email: 'admin@gmail.com' })
  const hashed = await bcrypt.hash('Admin@123', 10);
  await new User({ 
    name: 'Girija Palani', 
    email: 'admin@gmail.com', 
    password: hashed, 
    isAdmin: true 
  }).save();
  console.log('✅ Admin ready! Email: admin@gmail.com | Password: Admin@123');
  process.exit();
}).catch(err => { console.log(err); process.exit(); });