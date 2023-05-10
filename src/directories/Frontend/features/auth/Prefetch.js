
import { store } from '../../../../redux/store/store';
import { usersApiSlice } from '../../../../redux/featrures/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {

    useEffect(() => {
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
    }, []);

    return <Outlet />
}
export default Prefetch