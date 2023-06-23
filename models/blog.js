import { Schema, model, models } from "mongoose";

const BlogSchema = new Schema({

  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },

  blog: {
    type: String,
    required: [true, "blog content is required"],
  },
  tag: {
    type: String,
    required: [true, "tag is required"],
  },
});

// The "models" object is provided by the Mongoose Library and stores all the registered models. If a model named "User" already exists in the "models " object, it assigns that existing model to the "User" variable.

// This prevents redefining the model and ensures that the existing model is reused.

// If a model named "User" does not exist in the "models " object, the "model " function from Mongoose is called to create a new model

// The newly created model is then assigned to the "User" variable.

// this because this route get called every time the connection is established every single time from scratch
export default models.Blog || model("Blog", BlogSchema);
