"use client";

import { useState, useEffect } from "react";

import BlogCard from "./BlogCard";

const BlogCardList = ({ data, handleTagClick }) => {
  return <div className="mt-16 prompt_layout">
    {data.map((post)=>{
      return <BlogCard
        key={post._id}
        post = {post}
        handleTagClick={handleTagClick}
      />
    })}
  </div>
}

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([])

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    //fetch data from api
     (async ()=>{
      const response = await fetch('/api/blog')
      const data = await response.json();
      setPosts(data)
    })()
  },[])

  return (
    <section className="feed">
      <form className="relative w-full flex-center ">
        <input
          type="text"
          placeholder="search"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
          required
        />
      </form>

      <BlogCardList
        data= {posts}
        handleTagClick = {()=>{}}
      />

    </section>
  );
};

export default Feed;
