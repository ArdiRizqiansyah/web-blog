/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";

const SidebarItem = ({ title, icon, link, end = false }) => {
    return (
        <NavLink to={link} activeclassname="active" end={end} className={"sidebar-item "} >
            <i className={icon}></i>
            {title}
        </NavLink>
    );
}

export default SidebarItem;