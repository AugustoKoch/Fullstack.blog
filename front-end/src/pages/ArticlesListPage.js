import { useState, useEffect } from 'react';
import ArticleList from "../components/ArticleList";
import { Link } from 'react-router-dom';

const ArticlesListPage = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/articles');
                const data = await response.json();
                setArticles(data); // Atualiza o estado com os artigos retornados
            } catch (error) {
                console.error('Erro ao buscar artigos:', error);
            }
        };

        fetchArticles();
    }, []);

    return (
        <>
            <h1>Confira os artigos</h1>

            <Link to="/addarticle"><button >Novo Artigo</button></Link>

            {articles.length > 0 ? (
                <ArticleList articles={articles} />
            ) : (
                <p>Nenhum artigo encontrado</p>
            )}
        </>
    );
};

export default ArticlesListPage;
