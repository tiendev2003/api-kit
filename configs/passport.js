const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GithubStrategy = require("passport-github2").Strategy;

const { User } = require("../models/userModel");
const { createString } = require("../../utils/crypto");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_GOOGLE_ID,
      clientSecret: process.env.CLIENT_GOOGLE_SECRET,
      callbackURL: process.env.CALLBACK_GOOGLE_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value || null;
      const user = await User.findOne({ where: { email } });
      if (user) {
        return done(null, user);
      } else {
        const newUser = await User.create({
          email,
          password: createString(),
          isVerified: profile.emails[0].verified,
          name: profile.displayName,
          verifiedDate: new Date(),
        });
        return done(null, newUser);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.CLIENT_FACEBOOK_ID,
      clientSecret: process.env.CLIENT_FACEBOOK_SECRET,
      callbackURL: process.env.CALLBACK_FACEBOOK_URL,
      profileFields: ["id", "displayName", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value || null;
      const user = await User.findOne({ where: { email } });
      if (user) {
        return done(null, user);
      } else {
        const newUser = await User.create({
          email,
          password: createString(),
          isVerified: profile.emails[0].verified,
          name: profile.displayName,
          verifiedDate: new Date(),
        });
        return done(null, newUser);
      }
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.CLIENT_GITHUB_ID,
      clientSecret: process.env.CLIENT_GITHUB_SECRET,
      callbackURL: process.env.CALLBACK_GITHUB_URL,
      scope: ["user:email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value || null;
      const user = await User.findOne({ where: { email } });
      if (user) {
        return done(null, user);
      } else {
        const newUser = await User.create({
          email,
          password: createString(),
          isVerified: profile.emails[0].verified,
          name: profile.displayName,
          verifiedDate: new Date(),
        });
        return done(null, newUser);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findByPk(id);
  done(null, user);
});
