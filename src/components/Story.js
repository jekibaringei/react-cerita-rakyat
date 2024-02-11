import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Story = () => {
  const [stories, setStories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getStories = async () => {
      try {
        const response = await axiosPrivate.get('/story', {
          signal: controller.signal,
          params: { search: searchTerm }, // Add search parameter to the API request
        });
        console.log(response.data);
        isMounted && setStories(response.data);
      } catch (err) {
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };

    getStories();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, navigate, location, searchTerm]);

  return (
    <article>
      <br></br>
      <br></br>
      <div className="daftar">
        <h2>DAFTAR CERITA</h2>
      </div>
      <br></br>
      <div className="search-container">
        <label htmlFor="search">Cari Judul </label>
        <input type="text" id="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <div className="btn-log">
          <button>
            <Link to="/" style={{ textDecoration: 'none', color: '#205072', fontFamily: 'Abhaya Libre ExtraBold', fontSize: '20px' }}>
              Kembali
            </Link>
          </button>
        </div>
      </div>
      <br></br>
      {stories.length ? (
        <div className="story-container">
          {stories.map(({ Story }) => (
            <div className="story-item" key={Story.id}>
              <h3>{Story.title}</h3>
              <p>{Story.province}</p>
              <button className="btn-baca">
                <Link to={`/story/${Story.id}`} style={{ textDecoration: 'none', color: '#205072' }}>
                  Baca
                </Link>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No stories to display</p>
      )}
    </article>
  );
};

export default Story;
