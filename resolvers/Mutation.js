const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (user, secret, expiresIn) => {
  const { username, password } = user;
  return jwt.sign({ username, password }, secret, { expiresIn });
};

exports.Mutation = {
  // User Mutations //

  createUser: async (root, { username, password }, { User }) => {
    const user = await User.findOne({ username });

    if (user) throw new Error('User already exists.');

    const newUser = await new User({
      username,
      password
    }).save();

    return {
      token: createToken(newUser, process.env.TOKEN_SECRET, '1hr'),
      user: newUser
    };
  },

  logInUser: async (root, { username, password }, { User }) => {
    const user = await User.findOne({ username });

    if (!user) throw new Error('User not found.');

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) throw new Error('Password not valid.');

    return {
      token: createToken(user, process.env.TOKEN_SECRET, '1hr'),
      user
    };
  },


  // Story Mutations //

  addStory: async (root, { title, comments }, { Story }) => {
    const newStory = await new Story({
      title,
      comments
    }).save();

    return newStory;
  }
};
