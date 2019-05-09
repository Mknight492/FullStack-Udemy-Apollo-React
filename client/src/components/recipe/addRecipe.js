import React, { useState } from "react";

const AddRecipe = () => {
  const [form, setForm] = useState({});

  const handleChange = e => {};

  return (
    <div>
      <h2>Add Recipe</h2>
      <form>
        <select name="category" onChange={handleChange}>
          <option value="Breakfast"> Breakfast</option>
          <option value="Lunch"> Lunch</option>
          <option value="Dinner"> Dinner</option>
          <option value="Snack"> Snack</option>
        </select>
        <input
          type="text"
          name="decription"
          placeholder="Add description"
          onChange={handleChange}
        />
        <textarea
          name="instructions"
          placeholder="Add instructions"
          onChange={handleChange}
        />
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipe;
