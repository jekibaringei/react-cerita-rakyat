// OneStory.js
import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const OneStory = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getStoryById = async () => {
      try {
        const response = await axiosPrivate.get(`/story/${id}`, {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setStory(response.data.Story); // Akses properti Story di sini
      } catch (err) {
        console.error(err);
        navigate('/login');
      }
    };

    getStoryById();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [id]);

  return (
    <div className="cerita-satu">
      {story ? (
        <div className="one-story-container">
          <h2 className="judulcerita">{story.title}</h2>
          <p className="ceritapendek">{story.short_story}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button className="tombolkembali">
        <Link to="/story" style={{ textDecoration: 'none', color: '#205072' }}>
          Kembali
        </Link>
      </button>
    </div>
  );
};

export default OneStory;
