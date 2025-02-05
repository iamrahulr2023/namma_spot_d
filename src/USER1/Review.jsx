import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Review.css';

const Review = () => {
  const location = useLocation();
  const { cityd } = location.state || {};
  
  const [header, setHeader] = useState('');
  const [body, setBody] = useState('');
  const [starcount, setStarCount] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:3001/review', { cityd, header, body, starcount });
      navigate('/map');
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStarClick = (starCount) => {
    setStarCount(starCount);
  };

  if (!cityd) {
    return <p>No city information available.</p>;
  }

  return (
    <div className='reviewbox'>
      <h1 className='creater'>Create Review</h1>
      <div className="imgname"></div>
      <p>{cityd}</p>
      <div className="ratingbox">
        <h2 className='overall'>Overall rating</h2>
        <div className="rating" id="rating">
          {[...Array(5)].map((_, i) => (
            <span 
              key={i}
              className={`star ${starcount >= i + 1 ? 'active' : ''}`}
              onClick={() => handleStarClick(i + 1)}
            >
              &#9733;
            </span>
          ))}
        </div>
      </div>

      <div className="headline">
        <h2 className='headlinetext'>Add a Headline</h2>
        <input
          className='headinput'
          type='text'
          value={header}
          required
          onChange={(e) => setHeader(e.target.value)}
          placeholder='What’s most important to know?' />
      </div>
      <div className="reviewd">
        <h2 className='reviewdtext'>Add a written review</h2>
        <textarea
          className='reviewbody'
          value={body}
          required
          onChange={(e) => setBody(e.target.value)}
          placeholder='What did you like or dislike?'>
        </textarea>
      </div>
      <button type='submit' className='submitbtnr' onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Review;
