import { connectToDB } from "@utils/database";
import Blog from "@models/blog";

export const POST = async (req, res) => {
  const { userId, blog, tag } = await req.json();

  try {
    await connectToDB();

    const newBlog = new Blog({
      creator: userId,
      blog,
      tag,
    });

    await newBlog.save();

    // res.status(201).json({message: newBlog})

    return new Response(JSON.stringify(newBlog), { status: 201 });
  } catch (error) {
    return new Response("failed to create a new blog ", { status: 500 });
  }
};
