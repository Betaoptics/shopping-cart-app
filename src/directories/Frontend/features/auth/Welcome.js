import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useTitle from '../../hooks/useTitle';

const Welcome = () => {

    const { username, isManager, isAdmin } = useAuth();

    useTitle(`Product catalog: ${username}`);

    // Change const today or give it options from language translation .json file, see formatting samples: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat.
    const date = new Date();
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date);

    const content = (
        <section className="welcome">

            <p>{today}</p>

            <h1>Welcome {username}!</h1>

            <p><Link to="/dash/catalog">View produtcs</Link></p>

            <p><Link to="/catalog/new">Add New Product</Link></p>

            <p><Link to="/dash/history">View purchaseHistory</Link></p>

            <p><Link to="/minicard">View miniCard</Link></p>

            {(isManager || isAdmin) && <p><Link to="/dash/users">View User Settings</Link></p>}

            {(isManager || isAdmin) && <p><Link to="/dash/users/new">Add New User</Link></p>}

        </section>
    );

    return content;
}

export default Welcome;