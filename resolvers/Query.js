exports.Query = {
  getAllStories: async (root, args, { Story }) => {
    return await Story.find();
  },

  getStory: async (root, { _id }, { Story }) => {
    return await Story.findOne({ _id });
  },

  getCurrentUser: async (root, args, { currentUser, User }) => {
    if (!currentUser) return null;
    const { username } = currentUser;
    return await User.findOne({ username });
  }
}
