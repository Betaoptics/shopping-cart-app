import { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Card, Form, FormLabel } from 'react-bootstrap';
import { setCredentials } from '../../../../redux/featrures/authSlice';
import { useLoginMutation } from '../../../../redux/featrures/authApiSlice';
import usePersist from '../../hooks/usePersist';
import useTitle from '../../hooks/useTitle';
import PulseLoader from 'react-spinners/PulseLoader';
import Groceries from '../../../../images/Groceries_Background.jpg'

const Login = () => {

    useTitle('Employee Login');

    const userRef = useRef();
    const errRef = useRef();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [persist, setPersist] = usePersist();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [username, password]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { accessToken } = await login({ username, password }).unwrap();
            dispatch(setCredentials({ accessToken }));
            setUsername('');
            setPassword('');
            navigate('/dash/catalog');
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    };

    const handleUserInput = (event) => setUsername(event.target.value);
    const handlePwdInput = (event) => setPassword(event.target.value);
    const handleToggle = () => setPersist(prev => !prev);

    const errClass = errMsg ? "errmsg" : "offscreen";

    if (isLoading) return <PulseLoader color={"#FFF"} />

    const content = (
        <div style= {{
            backgroundImage: `url(${process.env.PUBLIC_URL + Groceries})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            width: '100vw',
            height: '100vh',
        }}>
        <br></br>
        <Card className='card-centered'>
        <section className="public">
            <header>
                <h1>Login</h1>
            </header>
            <main className="login">
                <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

                <form className="form login-inputs" onSubmit={handleSubmit}>
                    <Form.Label htmlFor="username">Username:</Form.Label>
                    <input
                        className="form__input username-input"
                        type="text"
                        id="username"
                        ref={userRef}
                        value={username}
                        onChange={handleUserInput}
                        autoComplete="off"
                        required
                    />

                    <Form.Label htmlFor="password">Password:</Form.Label>
                    <input
                        className="form__input password-input"
                        type="password"
                        id="password"
                        onChange={handlePwdInput}
                        value={password}
                        required
                    />
                    <Button type="submit" value="Submit" variant="default" className="form__submit-button sign-in-button">Sign In</Button>

                    <FormLabel htmlFor="persist" className="form__persist login-checkbox-text">
                        <input
                            type="checkbox"
                            className="form__checkbox login-checkbox-box"
                            id="persist"
                            onChange={handleToggle}
                            checked={persist}
                        />
                        Trust This Device
                    </FormLabel>
                </form>
            </main>
            <footer>
                <Link to="/">Back to Home</Link>
            </footer>
        </section>
        </Card>
        </div>
    );

    return content;
}

export default Login;