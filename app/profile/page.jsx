"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [posts, setPosts] = useState([]);

  const handleEdit = (post) => {
    router.push(`/update-blog?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "are you sure you want to delete this blog????"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/blog/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((myPost) => {
          myPost._id !== post._id;
        });

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };
    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  return (
    <Profile
      name={`my`}
      desc="welcome to your personalized page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default page;
