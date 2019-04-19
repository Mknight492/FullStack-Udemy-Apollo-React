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
    }
  }
};
export default resolvers;
