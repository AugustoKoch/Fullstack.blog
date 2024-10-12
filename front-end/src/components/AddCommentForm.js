import {useState} from 'react';
import axios from 'axios';

const AddCommentForm = ({ articleName, onArticleUpdated}) => {
    const [name, setName] = useState('');
    const [commentText, setCommentText] = useState([]);
    const addComment = async() => {
        const response = await axios.post(
            `http://localhost:8000/api/articles/${articleName}/comments`,
            {
                postedBy: name,
                text: commentText,
            }
        );
        const updateArticle = response.data;
        onArticleUpdated(updateArticle);
        setName('');
        setCommentText('');
    }

    return (
        <div id="add-comment-form">
            <h3>Adicione um comentário</h3>
            <label>
                Nome:
                <input 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type="text"
                />
            </label>
            <label>
                Comentário:
                <textarea 
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    rows="4"
                    cols="50"
                />
            </label>
            <button onClick={addComment}>Adicione seu comentário</button>
        </div>
    )
}

export default AddCommentForm;