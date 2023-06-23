import { connectToDB } from "@utils/database";
import Blog from "@models/blog";

export const GET = async () => {

  try {
    await connectToDB();

    const blogs = await Blog.find({}).populate('creator')

    // not working
    // res.status(201).json({message: blogs})
    return new Response(JSON.stringify(blogs), { status: 200 });

  } catch (error) {
    return new Response("failed get blogs ", { status: 500 });
  }
};
