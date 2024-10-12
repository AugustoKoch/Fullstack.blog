import {useState} from 'react';
import {Link, useNavigate}  from 'react-router-dom';
import axios from 'axios';

const CreateAccountPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUserName] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const createAccount = async() => {
        if (password !== confirmPassword){
            setError('As senhas não conferem');
            return;
        }

        try{
            const response = await axios.post('http://localhost:8000/api/create-account',{
                username,
                email,
                password,

            });
            if (response.status === 201){
                navigate('/login');
            }
            else{
                setError("Falha ao criar a conta");
            }
        }
        catch(error)
        {
            setError("Falha ao criar a conta");
        }
    }

    return(
        <div>
            <h1>Criar uma nova conta</h1>
            {error && <p>{error}</p>}
            <input 
                type="text"
                placeholder="Nome do usuário"
                value={username}
                onChange={e => setUserName(e.target.value)}                              
            />
            <input 
                type="email"
                placeholder="Informe seu email"
                value={email}
                onChange={e => setEmail(e.target.value)}                              
            />
            <input 
                type="password"
                placeholder="Informe a senha"
                value={password}
                onChange={e => setPassword(e.target.value)}                              
            />
            <input 
                type="password"
                placeholder="Confirme a senha"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}                              
            />
            <button onClick={createAccount}>Criar uma nova conta</button>
            <Link to="/login">Já possui uma conta? Clique aqui</Link>
        </div>

    )

};

export default CreateAccountPage;