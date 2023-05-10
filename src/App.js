// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';

// Public routes
import Layout from './directories/Frontend/components/dash/Layout' // Layout
import Public from './directories/Frontend/components/dash/Public' // Public
import DashLayout from './directories/Frontend/components/dash/DashLayout' // DashLayout

// User controls
import UsersList from './directories/Frontend/features/users/UserList' // UsersList
import EditUser from './directories/Frontend/features/users/EditUserForm' // EditUser
import NewUserForm from './directories/Frontend/features/users/NewUserForm' // NewUserForm

// Authentication
import Welcome from './directories/Frontend/features/auth/Welcome' // Welcome
import Login from './directories/Frontend/features/auth/Login' // Login
import Prefetch from './directories/Frontend/features/auth/Prefetch'; // Prefetch
import PersistLogin from './directories/Frontend/features/auth/PersistLogin' // PersistLogin
import RequireAuth from './directories/Frontend/features/auth/RequireAuth'; // RequireAuth

// Configs & Hooks
import { ROLES } from './directories/Frontend/config/roles'
import useTitle from './directories/Frontend/hooks/useTitle';

// Misc
import Catalog from './directories/Frontend/views/catalog'; // Catalog
import HistoryWrapper from './directories/Frontend/components/history/historyWrapper'; // History wrapper

function App() {

  useTitle('Shopping list app');

  return (
    <div className="App">


        {/*For route documentation, consult: https://reactrouter.com/en/main/route/route*/}
        <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
              <Route element={<Prefetch />}>
                <Route path="dash" element={<DashLayout />}>

                  <Route index element={<Welcome />} />

                  <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
                    <Route path="users">
                      <Route index element={<UsersList />} />
                      <Route path=":id" element={<EditUser />} />
                      <Route path="new" element={<NewUserForm />} />
                    </Route>
                  </Route>

                  <Route path="catalog">
                    <Route index element={<Catalog key={`app-catalog`} />} />
                  </Route>

                  <Route path="history">
                    <Route index element={<HistoryWrapper key={`app-history`} />} />
                  </Route>

                </Route>{/* End Dash */}
              </Route>
            </Route>
          </Route>{/* End Protected Routes */}

        </Route>
      </Routes >
    </div>
  );
}

export default App;
