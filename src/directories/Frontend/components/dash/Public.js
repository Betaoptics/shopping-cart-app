import { Link } from 'react-router-dom'
import Groceries from '../../../../images/Groceries_Background.jpg'
import { Card } from 'react-bootstrap'

const Public = () => {
    
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
                <h1>Welcome to <span className="nowrap">Shopping cart app!</span></h1>
            </header>
            <main className="public__main">
                <address className="public__addr">
                    Joonas Niinimäki<br />
                    ASL &copy;<br />
                    JAMK <br />
                </address>
                <br />
                <p>Owner: Joonas Niinimäki, M3268, JAMK</p>
            </main>
            <footer>
                <Link to="/login">Login</Link>
            </footer>
        </section>
        </Card>
        </div>

    );

    return content;
}

export default Public