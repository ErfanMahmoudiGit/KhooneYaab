import React from 'react';
import { Outlet } from 'react-router-dom';
import NavScrollExample from './NavScrollExample';
import Sidebar from './Sidebar'; // Create a separate Sidebar component

const HomeLayout = () => {
    return (
        <>
            <NavScrollExample />
            <div className="fixed-sidebar">
                <Sidebar />
            </div>
            <div className="main-content">
                <Outlet /> {/* This will render child routes */}
            </div>
        </>
    );
};

export default HomeLayout;
