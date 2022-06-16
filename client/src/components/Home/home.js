import Auth from '../../utils/auth';
import './home.css'
import { useQuery } from '@apollo/client';
import { QUERY_ME_BASIC, GET_USER_POSTS } from '../../utils/queries';
import { Link } from 'react-router-dom';
import Login from '../Login/login';
import Header from '../Header/header.js';

// import { AiOutlineDown } from 'react-icons/ai';
import Accordion from 'react-bootstrap/Accordion';

function Home() {
    const { data } = useQuery(QUERY_ME_BASIC);
    const { data: postQuery } = useQuery(GET_USER_POSTS);
    // user information
    const username = data?.me.username || '';
    // Post Info
    const postData = postQuery?.posts || [];

    // check if user is logged in
    const loggedIn = Auth.loggedIn()
    return (
        <>
            {loggedIn ?
                <>
                    <Header />
                    <section id="loggedInView">
                    <h2 className="welcomeText">Welcome, {username}!</h2>                        
                        {postData.map((post, index) =>
                        (  
                            //  <Accordion key={index}>
                            // <Accordion.Item eventKey="0">
                            <section className="discussion-post" key={index}>
                            {/* <Accordion.Header> */}
                            <div className="accordionHeaderDiv"> 
                            <h4 id="userTitle-post"><Link to={`/Single-post/${post._id}`}>{post.postTitle}</Link></h4>
                            <h3 id="username-post">{post.username}</h3>
                            <p>{post.createdAt}</p>
                            </div>    
                                {/* </Accordion.Header>
                                <Accordion.Body> */}
                                <p id="postText">{post.postText}</p>
                                <div id="likes-dislikes">
                                    {post.likesLength}<a className='voteBtn'>  👍</a>
                                    {post.dislikesLength}<a className='voteBtn'>  👎</a>
                                </div>
                                <p id="ban-meter-p">Ban Meter: </p>
                                <progress id="banMeter" value={post.banMeter} max="0.6">{post.banMeter}</progress>
                                {/* </Accordion.Body> */}
                            </section>
                            // </Accordion.Item>
                            // </Accordion>
                        ))}
                        {/* <button id="logoutBTN" onClick={() => Auth.logout()}>Logout</button> */}
                    </section>
                </>
                :
                <>
                    {/* <div className="logoDiv">
                        
                        <svg id="logo" width="123" height="25" viewBox="0 0 123 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="path-1-outside-1_4_11" maskUnits="userSpaceOnUse" x="-0.0400009" y="0.549988" width="123" height="24" fill="black">
                            <rect fill="white" x="-0.0400009" y="0.549988" width="123" height="24"/>
                            <path d="M16.12 5.68999C15.82 5.34999 15.47 5.04999 15.07 4.78999C14.67 4.50999 14.22 4.26999 13.72 4.06999C13.22 3.86999 12.68 3.70999 12.1 3.58999C11.54 3.46999 10.94 3.40999 10.3 3.40999C8.44 3.40999 7.07 3.76999 6.19 4.48999C5.33 5.18999 4.9 6.14999 4.9 7.36999C4.9 8.20999 5.1 8.86999 5.5 9.34999C5.92 9.82999 6.57 10.22 7.45 10.52C8.33 10.82 9.45 11.13 10.81 11.45C12.33 11.77 13.64 12.15 14.74 12.59C15.84 13.03 16.69 13.63 17.29 14.39C17.89 15.13 18.19 16.14 18.19 17.42C18.19 18.4 18 19.25 17.62 19.97C17.24 20.69 16.71 21.29 16.03 21.77C15.35 22.25 14.54 22.61 13.6 22.85C12.66 23.07 11.63 23.18 10.51 23.18C9.41 23.18 8.35 23.07 7.33 22.85C6.33 22.61 5.38 22.27 4.48 21.83C3.58 21.37 2.74 20.79 1.96 20.09L3.01 18.38C3.39 18.78 3.84 19.16 4.36 19.52C4.9 19.86 5.49 20.17 6.13 20.45C6.79 20.73 7.49 20.95 8.23 21.11C8.99 21.25 9.77 21.32 10.57 21.32C12.27 21.32 13.59 21.01 14.53 20.39C15.49 19.77 15.97 18.85 15.97 17.63C15.97 16.75 15.73 16.05 15.25 15.53C14.77 14.99 14.05 14.55 13.09 14.21C12.13 13.87 10.95 13.54 9.55 13.22C8.07 12.88 6.82 12.5 5.8 12.08C4.78 11.66 4.01 11.11 3.49 10.43C2.99 9.72999 2.74 8.80999 2.74 7.66999C2.74 6.34999 3.06 5.23999 3.7 4.33999C4.36 3.41999 5.26 2.72999 6.4 2.26999C7.54 1.78999 8.85 1.54999 10.33 1.54999C11.27 1.54999 12.14 1.64999 12.94 1.84999C13.76 2.02999 14.51 2.29999 15.19 2.65999C15.89 3.01999 16.54 3.46999 17.14 4.00999L16.12 5.68999Z"/>
      <path d="M28.1327 23.3C27.0127 23.3 25.9727 23.09 25.0127 22.67C24.0727 22.23 23.2527 21.64 22.5527 20.9C21.8727 20.14 21.3427 19.28 20.9627 18.32C20.5827 17.34 20.3927 16.31 20.3927 15.23C20.3927 14.11 20.5827 13.07 20.9627 12.11C21.3427 11.13 21.8827 10.27 22.5827 9.52999C23.2827 8.76999 24.1027 8.17999 25.0427 7.75999C26.0027 7.31999 27.0427 7.09999 28.1627 7.09999C29.2827 7.09999 30.3127 7.31999 31.2527 7.75999C32.1927 8.17999 33.0127 8.76999 33.7127 9.52999C34.4127 10.27 34.9527 11.13 35.3327 12.11C35.7127 13.07 35.9027 14.11 35.9027 15.23C35.9027 16.31 35.7127 17.34 35.3327 18.32C34.9527 19.28 34.4127 20.14 33.7127 20.9C33.0327 21.64 32.2127 22.23 31.2527 22.67C30.3127 23.09 29.2727 23.3 28.1327 23.3ZM22.4627 15.26C22.4627 16.42 22.7127 17.48 23.2127 18.44C23.7327 19.38 24.4227 20.13 25.2827 20.69C26.1427 21.23 27.0927 21.5 28.1327 21.5C29.1727 21.5 30.1227 21.22 30.9827 20.66C31.8427 20.1 32.5327 19.34 33.0527 18.38C33.5727 17.4 33.8327 16.34 33.8327 15.2C33.8327 14.04 33.5727 12.98 33.0527 12.02C32.5327 11.06 31.8427 10.3 30.9827 9.73999C30.1227 9.17999 29.1727 8.89999 28.1327 8.89999C27.0927 8.89999 26.1427 9.18999 25.2827 9.76999C24.4427 10.35 23.7627 11.12 23.2427 12.08C22.7227 13.02 22.4627 14.08 22.4627 15.26Z"/>
      <path d="M46.0945 23.3C44.9545 23.3 43.9045 23.09 42.9445 22.67C42.0045 22.23 41.1745 21.63 40.4545 20.87C39.7545 20.11 39.2045 19.24 38.8045 18.26C38.4245 17.28 38.2345 16.24 38.2345 15.14C38.2345 13.66 38.5645 12.31 39.2245 11.09C39.8845 9.86999 40.8045 8.89999 41.9845 8.17999C43.1645 7.45999 44.5245 7.09999 46.0645 7.09999C47.5245 7.09999 48.8145 7.43999 49.9345 8.11999C51.0545 8.77999 51.8845 9.67999 52.4245 10.82L50.4445 11.45C50.0045 10.65 49.3845 10.03 48.5845 9.58999C47.8045 9.12999 46.9345 8.89999 45.9745 8.89999C44.9345 8.89999 43.9845 9.16999 43.1245 9.70999C42.2645 10.25 41.5745 10.99 41.0545 11.93C40.5545 12.87 40.3045 13.94 40.3045 15.14C40.3045 16.32 40.5645 17.39 41.0845 18.35C41.6045 19.31 42.2945 20.08 43.1545 20.66C44.0145 21.22 44.9645 21.5 46.0045 21.5C46.6845 21.5 47.3345 21.38 47.9545 21.14C48.5945 20.9 49.1445 20.58 49.6045 20.18C50.0845 19.76 50.4045 19.31 50.5645 18.83L52.5745 19.43C52.2945 20.17 51.8245 20.84 51.1645 21.44C50.5245 22.02 49.7645 22.48 48.8845 22.82C48.0245 23.14 47.0945 23.3 46.0945 23.3Z"/>
      <path d="M63.5793 9.16999C62.2193 9.20999 61.0193 9.58999 59.9793 10.31C58.9593 11.03 58.2393 12.02 57.8193 13.28V23H55.7793V7.36999H57.6993V11.12C58.2393 10.02 58.9493 9.12999 59.8293 8.44999C60.7293 7.76999 61.6793 7.38999 62.6793 7.30999C62.8793 7.28999 63.0493 7.27999 63.1893 7.27999C63.3493 7.27999 63.4793 7.28999 63.5793 7.30999V9.16999Z"/>
      <path d="M64.9783 18.5C64.9783 17.52 65.2583 16.68 65.8183 15.98C66.3783 15.26 67.1483 14.71 68.1283 14.33C69.1283 13.93 70.2783 13.73 71.5783 13.73C72.3383 13.73 73.1283 13.79 73.9483 13.91C74.7683 14.03 75.4983 14.21 76.1383 14.45V13.13C76.1383 11.81 75.7483 10.76 74.9683 9.97999C74.1883 9.19999 73.1083 8.80999 71.7283 8.80999C70.8883 8.80999 70.0583 8.96999 69.2383 9.28999C68.4383 9.58999 67.5983 10.04 66.7183 10.64L65.9383 9.19999C66.9583 8.49999 67.9583 7.97999 68.9383 7.63999C69.9183 7.27999 70.9183 7.09999 71.9383 7.09999C73.8583 7.09999 75.3783 7.64999 76.4983 8.74999C77.6183 9.84999 78.1783 11.37 78.1783 13.31V20.54C78.1783 20.82 78.2383 21.03 78.3583 21.17C78.4783 21.29 78.6683 21.36 78.9283 21.38V23C78.7083 23.02 78.5183 23.04 78.3583 23.06C78.1983 23.08 78.0783 23.08 77.9983 23.06C77.4983 23.04 77.1183 22.88 76.8583 22.58C76.5983 22.28 76.4583 21.96 76.4383 21.62L76.4083 20.48C75.7083 21.38 74.7983 22.08 73.6783 22.58C72.5583 23.06 71.4183 23.3 70.2583 23.3C69.2583 23.3 68.3483 23.09 67.5283 22.67C66.7283 22.23 66.0983 21.65 65.6383 20.93C65.1983 20.19 64.9783 19.38 64.9783 18.5ZM75.4483 19.7C75.6683 19.42 75.8383 19.15 75.9583 18.89C76.0783 18.63 76.1383 18.4 76.1383 18.2V15.92C75.4583 15.66 74.7483 15.46 74.0083 15.32C73.2883 15.18 72.5583 15.11 71.8183 15.11C70.3583 15.11 69.1783 15.4 68.2783 15.98C67.3783 16.56 66.9283 17.35 66.9283 18.35C66.9283 18.93 67.0783 19.48 67.3783 20C67.6783 20.5 68.1183 20.92 68.6983 21.26C69.2783 21.58 69.9583 21.74 70.7383 21.74C71.7183 21.74 72.6283 21.55 73.4683 21.17C74.3283 20.79 74.9883 20.3 75.4483 19.7Z"/>
      <path d="M89.9688 22.25C89.8087 22.31 89.5587 22.42 89.2188 22.58C88.8788 22.74 88.4687 22.88 87.9887 23C87.5087 23.12 86.9887 23.18 86.4287 23.18C85.8487 23.18 85.2987 23.07 84.7787 22.85C84.2787 22.63 83.8788 22.3 83.5788 21.86C83.2788 21.4 83.1288 20.84 83.1288 20.18V8.98999H80.9688V7.36999H83.1288V2.08999H85.1687V7.36999H88.7688V8.98999H85.1687V19.61C85.2087 20.17 85.4088 20.59 85.7688 20.87C86.1488 21.15 86.5788 21.29 87.0588 21.29C87.6188 21.29 88.1288 21.2 88.5888 21.02C89.0488 20.82 89.3287 20.68 89.4287 20.6L89.9688 22.25Z"/>
      <path d="M99.0039 23.3C97.8839 23.3 96.8439 23.09 95.8839 22.67C94.9239 22.23 94.0939 21.64 93.3939 20.9C92.6939 20.14 92.1439 19.27 91.7439 18.29C91.3639 17.31 91.1739 16.26 91.1739 15.14C91.1739 13.68 91.5039 12.34 92.1639 11.12C92.8439 9.89999 93.7739 8.92999 94.9539 8.20999C96.1339 7.46999 97.4739 7.09999 98.9739 7.09999C100.514 7.09999 101.854 7.46999 102.994 8.20999C104.154 8.94999 105.064 9.92999 105.724 11.15C106.384 12.35 106.714 13.67 106.714 15.11C106.714 15.27 106.714 15.43 106.714 15.59C106.714 15.73 106.704 15.84 106.684 15.92H93.3039C93.4039 17.04 93.7139 18.04 94.2339 18.92C94.7739 19.78 95.4639 20.47 96.3039 20.99C97.1639 21.49 98.0939 21.74 99.0939 21.74C100.114 21.74 101.074 21.48 101.974 20.96C102.894 20.44 103.534 19.76 103.894 18.92L105.664 19.4C105.344 20.14 104.854 20.81 104.194 21.41C103.534 22.01 102.754 22.48 101.854 22.82C100.974 23.14 100.024 23.3 99.0039 23.3ZM93.2439 14.45H104.794C104.714 13.31 104.404 12.31 103.864 11.45C103.344 10.59 102.654 9.91999 101.794 9.43999C100.954 8.93999 100.024 8.68999 99.0039 8.68999C97.9839 8.68999 97.0539 8.93999 96.2139 9.43999C95.3739 9.91999 94.6839 10.6 94.1439 11.48C93.6239 12.34 93.3239 13.33 93.2439 14.45Z"/>
      <path d="M114.991 23.3C113.711 23.3 112.521 23.09 111.421 22.67C110.321 22.25 109.371 21.61 108.571 20.75L109.411 19.31C110.291 20.13 111.171 20.73 112.051 21.11C112.951 21.47 113.901 21.65 114.901 21.65C116.121 21.65 117.111 21.41 117.871 20.93C118.631 20.43 119.011 19.72 119.011 18.8C119.011 18.18 118.821 17.71 118.441 17.39C118.081 17.05 117.551 16.78 116.851 16.58C116.171 16.36 115.351 16.13 114.391 15.89C113.311 15.59 112.401 15.28 111.661 14.96C110.941 14.62 110.391 14.2 110.011 13.7C109.651 13.18 109.471 12.51 109.471 11.69C109.471 10.67 109.721 9.82999 110.221 9.16999C110.741 8.48999 111.441 7.97999 112.321 7.63999C113.221 7.27999 114.221 7.09999 115.321 7.09999C116.521 7.09999 117.581 7.28999 118.501 7.66999C119.421 8.04999 120.171 8.57999 120.751 9.25999L119.761 10.64C119.201 9.99999 118.531 9.52999 117.751 9.22999C116.991 8.90999 116.141 8.74999 115.201 8.74999C114.561 8.74999 113.951 8.83999 113.371 9.01999C112.791 9.17999 112.311 9.45999 111.931 9.85999C111.571 10.24 111.391 10.77 111.391 11.45C111.391 12.01 111.531 12.45 111.811 12.77C112.091 13.07 112.511 13.33 113.071 13.55C113.631 13.75 114.321 13.97 115.141 14.21C116.321 14.53 117.351 14.86 118.231 15.2C119.111 15.52 119.791 15.94 120.271 16.46C120.751 16.98 120.991 17.71 120.991 18.65C120.991 20.11 120.441 21.25 119.341 22.07C118.241 22.89 116.791 23.3 114.991 23.3Z"/>
      </mask>
      <path d="M16.12 5.68999C15.82 5.34999 15.47 5.04999 15.07 4.78999C14.67 4.50999 14.22 4.26999 13.72 4.06999C13.22 3.86999 12.68 3.70999 12.1 3.58999C11.54 3.46999 10.94 3.40999 10.3 3.40999C8.44 3.40999 7.07 3.76999 6.19 4.48999C5.33 5.18999 4.9 6.14999 4.9 7.36999C4.9 8.20999 5.1 8.86999 5.5 9.34999C5.92 9.82999 6.57 10.22 7.45 10.52C8.33 10.82 9.45 11.13 10.81 11.45C12.33 11.77 13.64 12.15 14.74 12.59C15.84 13.03 16.69 13.63 17.29 14.39C17.89 15.13 18.19 16.14 18.19 17.42C18.19 18.4 18 19.25 17.62 19.97C17.24 20.69 16.71 21.29 16.03 21.77C15.35 22.25 14.54 22.61 13.6 22.85C12.66 23.07 11.63 23.18 10.51 23.18C9.41 23.18 8.35 23.07 7.33 22.85C6.33 22.61 5.38 22.27 4.48 21.83C3.58 21.37 2.74 20.79 1.96 20.09L3.01 18.38C3.39 18.78 3.84 19.16 4.36 19.52C4.9 19.86 5.49 20.17 6.13 20.45C6.79 20.73 7.49 20.95 8.23 21.11C8.99 21.25 9.77 21.32 10.57 21.32C12.27 21.32 13.59 21.01 14.53 20.39C15.49 19.77 15.97 18.85 15.97 17.63C15.97 16.75 15.73 16.05 15.25 15.53C14.77 14.99 14.05 14.55 13.09 14.21C12.13 13.87 10.95 13.54 9.55 13.22C8.07 12.88 6.82 12.5 5.8 12.08C4.78 11.66 4.01 11.11 3.49 10.43C2.99 9.72999 2.74 8.80999 2.74 7.66999C2.74 6.34999 3.06 5.23999 3.7 4.33999C4.36 3.41999 5.26 2.72999 6.4 2.26999C7.54 1.78999 8.85 1.54999 10.33 1.54999C11.27 1.54999 12.14 1.64999 12.94 1.84999C13.76 2.02999 14.51 2.29999 15.19 2.65999C15.89 3.01999 16.54 3.46999 17.14 4.00999L16.12 5.68999Z" stroke="black" stroke-width="2" mask="url(#path-1-outside-1_4_11)"/>
      <path d="M28.1327 23.3C27.0127 23.3 25.9727 23.09 25.0127 22.67C24.0727 22.23 23.2527 21.64 22.5527 20.9C21.8727 20.14 21.3427 19.28 20.9627 18.32C20.5827 17.34 20.3927 16.31 20.3927 15.23C20.3927 14.11 20.5827 13.07 20.9627 12.11C21.3427 11.13 21.8827 10.27 22.5827 9.52999C23.2827 8.76999 24.1027 8.17999 25.0427 7.75999C26.0027 7.31999 27.0427 7.09999 28.1627 7.09999C29.2827 7.09999 30.3127 7.31999 31.2527 7.75999C32.1927 8.17999 33.0127 8.76999 33.7127 9.52999C34.4127 10.27 34.9527 11.13 35.3327 12.11C35.7127 13.07 35.9027 14.11 35.9027 15.23C35.9027 16.31 35.7127 17.34 35.3327 18.32C34.9527 19.28 34.4127 20.14 33.7127 20.9C33.0327 21.64 32.2127 22.23 31.2527 22.67C30.3127 23.09 29.2727 23.3 28.1327 23.3ZM22.4627 15.26C22.4627 16.42 22.7127 17.48 23.2127 18.44C23.7327 19.38 24.4227 20.13 25.2827 20.69C26.1427 21.23 27.0927 21.5 28.1327 21.5C29.1727 21.5 30.1227 21.22 30.9827 20.66C31.8427 20.1 32.5327 19.34 33.0527 18.38C33.5727 17.4 33.8327 16.34 33.8327 15.2C33.8327 14.04 33.5727 12.98 33.0527 12.02C32.5327 11.06 31.8427 10.3 30.9827 9.73999C30.1227 9.17999 29.1727 8.89999 28.1327 8.89999C27.0927 8.89999 26.1427 9.18999 25.2827 9.76999C24.4427 10.35 23.7627 11.12 23.2427 12.08C22.7227 13.02 22.4627 14.08 22.4627 15.26Z" stroke="black" stroke-width="2" mask="url(#path-1-outside-1_4_11)"/>
      <path d="M46.0945 23.3C44.9545 23.3 43.9045 23.09 42.9445 22.67C42.0045 22.23 41.1745 21.63 40.4545 20.87C39.7545 20.11 39.2045 19.24 38.8045 18.26C38.4245 17.28 38.2345 16.24 38.2345 15.14C38.2345 13.66 38.5645 12.31 39.2245 11.09C39.8845 9.86999 40.8045 8.89999 41.9845 8.17999C43.1645 7.45999 44.5245 7.09999 46.0645 7.09999C47.5245 7.09999 48.8145 7.43999 49.9345 8.11999C51.0545 8.77999 51.8845 9.67999 52.4245 10.82L50.4445 11.45C50.0045 10.65 49.3845 10.03 48.5845 9.58999C47.8045 9.12999 46.9345 8.89999 45.9745 8.89999C44.9345 8.89999 43.9845 9.16999 43.1245 9.70999C42.2645 10.25 41.5745 10.99 41.0545 11.93C40.5545 12.87 40.3045 13.94 40.3045 15.14C40.3045 16.32 40.5645 17.39 41.0845 18.35C41.6045 19.31 42.2945 20.08 43.1545 20.66C44.0145 21.22 44.9645 21.5 46.0045 21.5C46.6845 21.5 47.3345 21.38 47.9545 21.14C48.5945 20.9 49.1445 20.58 49.6045 20.18C50.0845 19.76 50.4045 19.31 50.5645 18.83L52.5745 19.43C52.2945 20.17 51.8245 20.84 51.1645 21.44C50.5245 22.02 49.7645 22.48 48.8845 22.82C48.0245 23.14 47.0945 23.3 46.0945 23.3Z" stroke="black" stroke-width="2" mask="url(#path-1-outside-1_4_11)"/>
      <path d="M63.5793 9.16999C62.2193 9.20999 61.0193 9.58999 59.9793 10.31C58.9593 11.03 58.2393 12.02 57.8193 13.28V23H55.7793V7.36999H57.6993V11.12C58.2393 10.02 58.9493 9.12999 59.8293 8.44999C60.7293 7.76999 61.6793 7.38999 62.6793 7.30999C62.8793 7.28999 63.0493 7.27999 63.1893 7.27999C63.3493 7.27999 63.4793 7.28999 63.5793 7.30999V9.16999Z" stroke="black" stroke-width="2" mask="url(#path-1-outside-1_4_11)"/>
      <path d="M64.9783 18.5C64.9783 17.52 65.2583 16.68 65.8183 15.98C66.3783 15.26 67.1483 14.71 68.1283 14.33C69.1283 13.93 70.2783 13.73 71.5783 13.73C72.3383 13.73 73.1283 13.79 73.9483 13.91C74.7683 14.03 75.4983 14.21 76.1383 14.45V13.13C76.1383 11.81 75.7483 10.76 74.9683 9.97999C74.1883 9.19999 73.1083 8.80999 71.7283 8.80999C70.8883 8.80999 70.0583 8.96999 69.2383 9.28999C68.4383 9.58999 67.5983 10.04 66.7183 10.64L65.9383 9.19999C66.9583 8.49999 67.9583 7.97999 68.9383 7.63999C69.9183 7.27999 70.9183 7.09999 71.9383 7.09999C73.8583 7.09999 75.3783 7.64999 76.4983 8.74999C77.6183 9.84999 78.1783 11.37 78.1783 13.31V20.54C78.1783 20.82 78.2383 21.03 78.3583 21.17C78.4783 21.29 78.6683 21.36 78.9283 21.38V23C78.7083 23.02 78.5183 23.04 78.3583 23.06C78.1983 23.08 78.0783 23.08 77.9983 23.06C77.4983 23.04 77.1183 22.88 76.8583 22.58C76.5983 22.28 76.4583 21.96 76.4383 21.62L76.4083 20.48C75.7083 21.38 74.7983 22.08 73.6783 22.58C72.5583 23.06 71.4183 23.3 70.2583 23.3C69.2583 23.3 68.3483 23.09 67.5283 22.67C66.7283 22.23 66.0983 21.65 65.6383 20.93C65.1983 20.19 64.9783 19.38 64.9783 18.5ZM75.4483 19.7C75.6683 19.42 75.8383 19.15 75.9583 18.89C76.0783 18.63 76.1383 18.4 76.1383 18.2V15.92C75.4583 15.66 74.7483 15.46 74.0083 15.32C73.2883 15.18 72.5583 15.11 71.8183 15.11C70.3583 15.11 69.1783 15.4 68.2783 15.98C67.3783 16.56 66.9283 17.35 66.9283 18.35C66.9283 18.93 67.0783 19.48 67.3783 20C67.6783 20.5 68.1183 20.92 68.6983 21.26C69.2783 21.58 69.9583 21.74 70.7383 21.74C71.7183 21.74 72.6283 21.55 73.4683 21.17C74.3283 20.79 74.9883 20.3 75.4483 19.7Z" stroke="black" stroke-width="2" mask="url(#path-1-outside-1_4_11)"/>
      <path d="M89.9688 22.25C89.8087 22.31 89.5587 22.42 89.2188 22.58C88.8788 22.74 88.4687 22.88 87.9887 23C87.5087 23.12 86.9887 23.18 86.4287 23.18C85.8487 23.18 85.2987 23.07 84.7787 22.85C84.2787 22.63 83.8788 22.3 83.5788 21.86C83.2788 21.4 83.1288 20.84 83.1288 20.18V8.98999H80.9688V7.36999H83.1288V2.08999H85.1687V7.36999H88.7688V8.98999H85.1687V19.61C85.2087 20.17 85.4088 20.59 85.7688 20.87C86.1488 21.15 86.5788 21.29 87.0588 21.29C87.6188 21.29 88.1288 21.2 88.5888 21.02C89.0488 20.82 89.3287 20.68 89.4287 20.6L89.9688 22.25Z" stroke="black" stroke-width="2" mask="url(#path-1-outside-1_4_11)"/>
      <path d="M99.0039 23.3C97.8839 23.3 96.8439 23.09 95.8839 22.67C94.9239 22.23 94.0939 21.64 93.3939 20.9C92.6939 20.14 92.1439 19.27 91.7439 18.29C91.3639 17.31 91.1739 16.26 91.1739 15.14C91.1739 13.68 91.5039 12.34 92.1639 11.12C92.8439 9.89999 93.7739 8.92999 94.9539 8.20999C96.1339 7.46999 97.4739 7.09999 98.9739 7.09999C100.514 7.09999 101.854 7.46999 102.994 8.20999C104.154 8.94999 105.064 9.92999 105.724 11.15C106.384 12.35 106.714 13.67 106.714 15.11C106.714 15.27 106.714 15.43 106.714 15.59C106.714 15.73 106.704 15.84 106.684 15.92H93.3039C93.4039 17.04 93.7139 18.04 94.2339 18.92C94.7739 19.78 95.4639 20.47 96.3039 20.99C97.1639 21.49 98.0939 21.74 99.0939 21.74C100.114 21.74 101.074 21.48 101.974 20.96C102.894 20.44 103.534 19.76 103.894 18.92L105.664 19.4C105.344 20.14 104.854 20.81 104.194 21.41C103.534 22.01 102.754 22.48 101.854 22.82C100.974 23.14 100.024 23.3 99.0039 23.3ZM93.2439 14.45H104.794C104.714 13.31 104.404 12.31 103.864 11.45C103.344 10.59 102.654 9.91999 101.794 9.43999C100.954 8.93999 100.024 8.68999 99.0039 8.68999C97.9839 8.68999 97.0539 8.93999 96.2139 9.43999C95.3739 9.91999 94.6839 10.6 94.1439 11.48C93.6239 12.34 93.3239 13.33 93.2439 14.45Z" stroke="black" stroke-width="2" mask="url(#path-1-outside-1_4_11)"/>
      <path d="M114.991 23.3C113.711 23.3 112.521 23.09 111.421 22.67C110.321 22.25 109.371 21.61 108.571 20.75L109.411 19.31C110.291 20.13 111.171 20.73 112.051 21.11C112.951 21.47 113.901 21.65 114.901 21.65C116.121 21.65 117.111 21.41 117.871 20.93C118.631 20.43 119.011 19.72 119.011 18.8C119.011 18.18 118.821 17.71 118.441 17.39C118.081 17.05 117.551 16.78 116.851 16.58C116.171 16.36 115.351 16.13 114.391 15.89C113.311 15.59 112.401 15.28 111.661 14.96C110.941 14.62 110.391 14.2 110.011 13.7C109.651 13.18 109.471 12.51 109.471 11.69C109.471 10.67 109.721 9.82999 110.221 9.16999C110.741 8.48999 111.441 7.97999 112.321 7.63999C113.221 7.27999 114.221 7.09999 115.321 7.09999C116.521 7.09999 117.581 7.28999 118.501 7.66999C119.421 8.04999 120.171 8.57999 120.751 9.25999L119.761 10.64C119.201 9.99999 118.531 9.52999 117.751 9.22999C116.991 8.90999 116.141 8.74999 115.201 8.74999C114.561 8.74999 113.951 8.83999 113.371 9.01999C112.791 9.17999 112.311 9.45999 111.931 9.85999C111.571 10.24 111.391 10.77 111.391 11.45C111.391 12.01 111.531 12.45 111.811 12.77C112.091 13.07 112.511 13.33 113.071 13.55C113.631 13.75 114.321 13.97 115.141 14.21C116.321 14.53 117.351 14.86 118.231 15.2C119.111 15.52 119.791 15.94 120.271 16.46C120.751 16.98 120.991 17.71 120.991 18.65C120.991 20.11 120.441 21.25 119.341 22.07C118.241 22.89 116.791 23.3 114.991 23.3Z" stroke="black" stroke-width="2" mask="url(#path-1-outside-1_4_11)"/>
      </svg>

                    </div> */}
                   
                    <div className="loginContainer">
                        <Login />
                    </div>
                </>


            }
        </>
    )
}

export default Home;