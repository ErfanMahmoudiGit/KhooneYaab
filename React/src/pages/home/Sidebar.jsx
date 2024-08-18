import React from 'react';
import { NavLink } from 'react-router-dom';
import Filters from './Filters';

const Sidebar = () => {
    return (
        <div className="sidebar-cont no-scroll">
            <h4>دسته ها</h4>
            <ul>
                <li><NavLink to={`/category="فروش آپارتمان"`}>فروش آپارتمان</NavLink></li>
                <li><NavLink to={`/category="فروش خانه و ویلا"`}>فروش خانه و ویلا</NavLink></li>
                <li><NavLink to={`/category="اجاره آپارتمان"`}>اجاره آپارتمان</NavLink></li>
                <li><NavLink to={`/category="اجاره خانه و ویلا"`}>اجاره خانه و ویلا</NavLink></li>
            </ul>
            <Filters />
        </div>
    );
};

export default Sidebar;
