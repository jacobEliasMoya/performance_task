import React from 'react';
import AdminPanel from '../containers/AdminPanel';
import NewUserForm from '../forms/NewUser';
import '../stylesheets/main.css';

const Main: React.FC = () => {
    
    return (
        <div className="app-main">
            <AdminPanel />
            <NewUserForm />
        </div>
    );
};

export default Main;
