import { useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

const Home = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAuth({});
    navigate('/login');
  };

  return (
    <div className="container-menu">
      <p className="selamat">Selamat Datang di Dunia Dongeng Nusantara</p>
      <p className="memukau">Terbanglah ke dalam kisah-kisah yang memukau dan telah diwariskan dari generasi ke generasi.</p>
      <button className="btn-lanjut">
        <Link to="/story" style={{ textDecoration: 'none', color: '#329D9C' }}>
          Mulai Petualanganmu!
        </Link>
      </button>
      <button onClick={logout} className="btn-logout">
        Sign Out
      </button>
    </div>
  );
};

export default Home;
