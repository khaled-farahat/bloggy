
import Feed from "@components/Feed";

/**
 * Renders the home page of the Bloggy app.
 * 
 * @returns {JSX.Element} The home page component.
 */
const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className="head_text text-center">
        Share Your Thoughts
        <br />
        <span className="orange_gradient text-center">All You Need</span>
      </h1>
      <p className="desc text-center">
        Bloggy is a cutting-edge blog app designed to empower users in their
        creative journey. With its innovative features and intuitive interface,
        Bloggy revolutionizes the way you discover, create, and share engaging
        content.
      </p>

      <Feed />
    </section>
  );
};

export default Home;
