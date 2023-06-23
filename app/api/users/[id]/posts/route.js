import { connectToDB } from "@utils/database";
import Blog from "@models/blog";

export const GET = async (request, {params}) => {

  try {
    await connectToDB();

    console.log('we get the data')
    const blogs = await Blog.find({
      creator: params.id
    }).populate('creator')

    // not working
    // res.status(201).json({message: blogs})
    return new Response(JSON.stringify(blogs), { status: 200 });

  } catch (error) {
    return new Response("Failed to fetch blogs created by user", { status: 500 });
  }
};
