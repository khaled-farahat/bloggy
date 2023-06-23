import { connectToDB } from "@utils/database";
import Blog from "@models/blog";

// GET (read)

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const blog = await Blog.findById(params.id).populate("creator");
    if (!blog) return new Response("blog not found", { status: 404 });

    // not working
    // res.status(201).json({message: blogs})
    return new Response(JSON.stringify(blog), { status: 200 });
  } catch (error) {
    return new Response("failed get blog ", { status: 500 });
  }
};

// PATCH (update)

export const PATCH = async (request, { params }) => {
  const { blog, tag } = await request.json();

  try {
    await connectToDB();

    const existingBlog = await Blog.findById(params.id).populate("creator");

    if (!existingBlog) return new Response("blog not found", { status: 404 });

    existingBlog.blog = blog;
    existingBlog.tag = tag;

    await existingBlog.save();

    return new Response(JSON.stringify(existingBlog), { status: 200 });
  } catch (error) {
    return new Response("failed to update", { status: 500 });
  }
};

// DELETE (delete)

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Blog.findByIdAndRemove(params.id);

    return new Response("blog deleted", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("failed to delete blog", { status: 500 });
  }
};
