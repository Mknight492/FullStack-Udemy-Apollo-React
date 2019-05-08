import jwt from "jsonwebtoken";

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

const resolvers = {
  Query: {
    getAllRecipies: async (parent, args, context) => {
      const allRecipes = await context.Recipe.find();
      return allRecipes;
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

      return { token: createToken(newUser, process.env.SECRET, "1hr") };
    }
  }
};
export default resolvers;
