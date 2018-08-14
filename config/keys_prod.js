// Add to Heroku.  Server will recognize the values.

module.exports = {
  mongoURI: process.env.MONGO_URI,
  secretOrKey: process.env.SECRET_OR_KEY,
  passportSecret: process.env.PASSPORT_SECRET,
  apiKey: process.env.GEOCODER_API_KEY
};
