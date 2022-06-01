import Auth from '../../utils/auth';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { QUERY_FRIEND, QUERY_ME_BASIC, QUERY_USERS_POSTS } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_POST, DELETE_POST } from '../../utils/mutations';
import './profile.css'
import Header from '../Header/header.js';

function Profile () {

    // get ID and query a user's info
    const { id: userId } = useParams()
    const { data } = useQuery(QUERY_FRIEND, {
        variables: { id: userId },
      });
    const { basic } = useQuery(QUERY_ME_BASIC);
    // Get username and friends
    const userFriends = data?.user.friends || [];
    const username = basic?.me.username || '';
    
    // Query the posts of the user
    const { data: userPostsQuery } = useQuery(QUERY_USERS_POSTS, {
        variables: { username: username },
    });
    const userPosts = userPostsQuery?.posts || [];

    // set up state variables
    const [formState, setFormState] = useState({
        postTitle: '',
        postText: '',
        username: username,
      });
    const [addPost, { error }] = useMutation(ADD_POST);
    const [deletePost] = useMutation(DELETE_POST);
    
    const loggedIn = Auth.loggedIn();


    return (
        <>

        {loggedIn ?
            <>  

            <Header />
                {/* <p>PROFILE PAGE</p> */}
              <main className="profilePage">
                {/* <form id='post-form' onSubmit={handleFormSubmit}>
                <section className="writePostSection">
                <input className="post-title" type="text" id="postTitle" name="postTitle" value={formState.postTitle} onChange={handleChange} placeholder='Title' />
                <div className="writePostDiv">
                <input className="writePostInput" type="text" id="postText" name="postText" value={formState.postText} onChange={handleChange} placeholder='Post' />
                    <button className="postButton" id="post-btn">Post</button>
                </div>
                <div id="bad-words-warning"></div>
                </section>
                </form> */}

                <section className="postsSection">

                    <h1>Posts</h1>
                    {userPosts.map((post, index) => (
                        <section className='postContainer' key={index} id={index}>
                            <h2>Title:</h2> <Link to={`/Single-post/`}>{post.postTitle}</Link>
                            <h3>Post: {post.postText}</h3>
                            <button id='delete-post-btn'
                            onClick={() => {
                                deletePost({variables: {postId: post._id}})
                                const deletedPost = document.getElementById(index);
                                deletedPost.remove();
                                }
                            }
                            >Delete</button>
                        </section>
                    ))}
                </section>
                <section className="friendsSection">
                    <h1>Friends</h1>
                    {userFriends.map((friend, index) => (
                        <div key={index}>
                        <Link to={`/friendprofile/${friend._id}`}>{friend.username}</Link>
                        </div>
                    ))} 
                </section>
            </main>  
              {/* </main>   */}
            </>
            :
            <>
                <p>You need to login to see this page</p>
            </>
            }
        </>
    )
}

export default Profile;
