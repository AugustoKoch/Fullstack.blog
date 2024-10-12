import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import NotFoundPage from "./NotFoundPage";
import CommentList from "../components/CommentList";
import AddCommentForm from "../components/AddCommentForm";
import axios from 'axios';

const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
    const { articleId } = useParams(); // Usando o nome do artigo como parâmetro

    useEffect(() => {
        const loadArticleInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/articles/${articleId}`);
                const newArticleInfo = response.data;
                setArticleInfo(newArticleInfo);
            } catch (error) {
                console.error("Erro ao buscar o artigo:", error);
            }
        };

        loadArticleInfo();
    }, [articleId]);

    const addUpvote = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/api/articles/${articleId}/upvote`);
            const updatedArticle = response.data;
            if (updatedArticle && typeof updatedArticle.upvotes === 'number') {
                setArticleInfo(prevInfo => ({
                    ...prevInfo,
                    upvotes: updatedArticle.upvotes
                }));
            } else {
                console.error("API não está retornando corretamente os votos");
            }
        } catch (error) {
            console.error("Erro ao votar no artigo:", error);
        }
    };

    if (!articleInfo || !articleInfo.name) {
        return <NotFoundPage />;
    }

    return (
        <>
            <h1>{articleInfo.title}</h1>
            <div className="upvotes-section">
                <button onClick={addUpvote}>Votar</button>
                <p>Este artigo possui {articleInfo.upvotes} votos</p>
            </div>
            {/* Exibindo o conteúdo como uma string */}
            <p>{articleInfo.content}</p>
            <AddCommentForm
                articleName={articleId}
                onArticleUpdated={updateArticle => setArticleInfo(updateArticle)}
            />
            <CommentList comments={articleInfo.comments} />
        </>
    );
};

export default ArticlePage;
