import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import ArticlesListPage from './pages/ArticlesListPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';
import NavBar from './NavBar';
import AddArticleForm from './components/AddArticleForm';

function App() {
  return (
    <>
    <BrowserRouter>
      <div>
        <NavBar />
        <div id="page-body">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/articlelist" element={<ArticlesListPage />} />
            <Route path="/articlelist/:articleId" element={<ArticlePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/newaccount" element={<CreateAccountPage />} />
            <Route path="/addarticle" element={<AddArticleForm />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
    </>
  );
}

export default App;
