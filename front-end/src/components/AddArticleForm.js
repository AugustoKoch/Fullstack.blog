import { useState } from 'react';

const AddArticleForm = () => {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newArticle = { name, title, content };

        try {
            const response = await fetch('http://localhost:8000/api/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newArticle),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Artigo criado com sucesso!');
                setName('');
                setTitle('');
                setContent('');
            } else {
                setMessage(data.message || 'Erro ao criar o artigo');
            }
        } catch (error) {
            setMessage('Erro na conexão com o servidor');
        }
    };

    return (
        <div>
            <h2>Cadastrar Novo Artigo</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={title}
                    onChange={(e) => [setTitle(e.target.value), setName(e.target.value)]} //seta o valor de título para título e nome
                    placeholder="Título"
                    required
                />
                <textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Conteúdo"
                    required
                />
                <button type="submit">Cadastrar</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddArticleForm;
