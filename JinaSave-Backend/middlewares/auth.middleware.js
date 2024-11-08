const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];  // Extract token

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);  // Verify the token

    console.log('Verified user:', verified);  // Ensure user info is logged

    // Check if the decoded token contains the user _id
    if (!verified._id) {
      return res.status(401).json({ message: 'User ID not found in token.' });
    }

    req.user = { _id: verified._id };
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

