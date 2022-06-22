import Auth from "../../utils/auth";
import "./home.css";
import { useQuery } from "@apollo/client";
import { QUERY_ME_BASIC, GET_USER_POSTS } from "../../utils/queries";
import Login from "../Login/login";
import Header from "../Header/header.js";
import { Link } from 'react-router-dom'
import { BsFillSuitHeartFill } from 'react-icons/bs'


function Home() {
  const { data } = useQuery(QUERY_ME_BASIC);
  const { data: postQuery } = useQuery(GET_USER_POSTS);
  // user information
  const username = data?.me.username || "";
  // Post Info
  const postData = postQuery?.posts || [];

  // check if user is logged in
  const loggedIn = Auth.loggedIn();
  return (
    <>
      {loggedIn ? (
        <>
          <Header />
          <section id="loggedInView">
            <h1 className="welcomeText">Welcome, {username}!</h1>
            {postData.map((post, index) => (
              <section className="discussion-post" key={index}>
                <div className="accordionHeaderDiv">
                  <h2 id="username-post">{post.username}</h2>
                  <p className="postDateCreated">{post.createdAt}</p>
                </div>
                <div>
                  <h3 id="userTitle-post">
                    <Link to={`/Single-post/${post._id}`}>
                      {post.postTitle}
                    </Link>
                  </h3>
                </div>
                <p id="postText">{post.postText}</p>
                  <div id="likes-dislikes">
                    {post.likesLength}
                    <button className="voteBtn">
                      <BsFillSuitHeartFill />
                    </button>
                  </div>
              </section>
            ))}
          </section>
        </>
      ) : (
        <>
          <div className="loginContainer">
            <Login />
          </div>
        </>
      )}
    </>
  );
}

export default Home;
