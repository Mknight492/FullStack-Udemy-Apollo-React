import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

const resolvers = {
  Query: {
    getAllRecipies: async (parent, args, context) => {
      const allRecipes = await context.Recipe.find();
      return allRecipes;
    },
    getRecipe: async (parent, { _id }, { Recipe }) => {
      console.log(_id);
      const recipe = await Recipe.findOne({ _id });
      return recipe;
    },
    getCurrentUser: async (parent, args, { currentUser, User }) => {
      if (!currentUser) return null;
      const user = await User.findOne({
        username: currentUser.username
      }).populate({
        path: "favourites",
        model: "Recipe"
      });
      return user;
    }
  },
  Mutation: {
    addRecipe: async (
      parent,
      { name, category, description, instructions, username },
      { Recipe }
    ) => {
      const newRecipe = await new Recipe({
        name,
        category,
        description,
        instructions,
        username
      }).save();
      return newRecipe;
    },

    signupUser: async (parent, { username, password, email }, { User }) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error("User already exists");
      }

      const newUser = await new User({ username, password, email }).save();

      return {
        token: createToken(newUser, process.env.SECRET, "1hr"),
        user: newUser
      };
    },

    signinUser: async (parent, { username, password }, { User }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("User not found");
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error("Incorrect username or password");
      }
      return { token: createToken(user, process.env.SECRET, "1hr"), user };
    }
  }
};
export default resolvers;
