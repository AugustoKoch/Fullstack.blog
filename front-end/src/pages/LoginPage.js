import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const logIn = async() => {
        try{
            const response = await axios.post('http://localhost:8000/api/login', {
                email,
                password,
            });

            if (response.status === 200){
                navigate('/');
            }
            else
            {
                setError('Email ou senha inexistentes');
            }            
        }
        catch (error){
            setError('Falha ao tentar realizar o login');
        }
    }


return(
    <>
    <div>
        <h1>Log In</h1>
        { error && <p>{error}</p>}
        <input
            type="email"
            placeholder="Informe o seu email"
            value={email}
            onChange={e => setEmail(e.target.value)}
        />
        <input 
            type="password"
            placeholder="Informe a senha"
            value={password}
            onChange={e => setPassword(e.target.value)}            
        />
        <button onClick={logIn}>Logar no sistema</button>
        <Link to="/newaccount">Não possui uma conta ainda? Cria agora</Link>
    </div>
    </>
);
};

export default LoginPage;