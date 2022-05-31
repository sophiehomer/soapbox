import Auth from '../../utils/auth';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { QUERY_FRIEND, QUERY_ME_BASIC, QUERY_POSTS } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_POST, DELETE_POST } from '../../utils/mutations';
import './profile.css'

// Bad word Filter
var Filter = require('bad-words'),
    filter = new Filter();


// Bad word Filter
var Filter = require('bad-words'),
    filter = new Filter();
    filter.removeWords('hell', 'tit', 'tits', 'boob', 'boobs')


function Profile () {

    const { id: userId } = useParams()
    const { loading, data } = useQuery(QUERY_FRIEND, {
        variables: { id: userId },
      });
    const { basic } = useQuery(QUERY_ME_BASIC);
    const { queryPost } = useQuery(QUERY_POSTS);
    
    const userPosts = data?.user.posts || [];
    const userFriends = data?.user.friends || [];
    const username = basic?.me.username || '';
    console.log('user', userPosts)

    // set up state variables
    const [formState, setFormState] = useState({
        postTitle: '',
        postText: '',
        username: username,
      });
    const [addPost, { error }] = useMutation(ADD_POST);
    const [deletePost] = useMutation(DELETE_POST);

    // update state based on form input changes
    const handleChange = (event) => {
        let { name, value } = event.target;
        // Booleans to keep name and value state
        let cleanName;
        let cleanText;
        // Censor postText
        if (value && !value.match(/^[*]{1,}/)){
            value = filter.clean(value)
            if (value.match(/([*]{3,})/g)) {
                cleanText = false;
            } else {
                cleanText = true
            }
        }
        // Censor postTitle
        if (name && !name.match(/^[*]{1,}/)){
            name = filter.clean(name)
            if (name.match(/([*]{3,})/g)) {
                cleanName = false
            } else {
                cleanName = true
            }
        }
        // Get html elements and check their values to render html elements
        const postBtn = document.getElementById('post-btn')
        const warningDiv = document.getElementById('bad-words-warning');
        if (cleanName && cleanText) {
            warningDiv.innerHTML = '';
             postBtn.disabled = false;
        } else {
            warningDiv.innerHTML = 'Keep it friendly';
            postBtn.disabled = true;
        }
        setFormState({
        ...formState,
        [name]: value,
        });
    };
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        await addPost({
            variables: { ...formState },
        });
    };
    
    const loggedIn = Auth.loggedIn();


    return (
        <>

        {loggedIn ?
            <>  
                <p>PROFILE PAGE</p>
                <form id='post-form' onSubmit={handleFormSubmit}>
                <section>
                <input className='post-tile' type="text" id="postTitle" name="postTitle" value={formState.postTitle} onChange={handleChange} placeholder='Write Title Here' />
                <input type="text" id="postText" name="postText" value={formState.postText} onChange={handleChange} placeholder='Write Post Here' />
                <div id="bad-words-warning"></div>
                <div><button className='post-btn' id='post-btn'>POST</button></div>
                </section>
                </form>

                <section>
                    <h1>Posts</h1>
                    {userPosts.map((post, index) => (
                        <section className='card-main' key={index} id={index}>
                            <span>TITLE: </span><Link to={`/Single-post/`}>{post.postTitle}</Link>
                            <p>CONTENT: {post.postText}</p>
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
                <section>
                    <h1>Friends</h1>
                    {userFriends.map((friend, index) => (
                        <div key={index}>
                        <Link to={`/friendprofile/${friend._id}`}>{friend.username}</Link>
                        </div>
                    ))} 
                </section>
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
