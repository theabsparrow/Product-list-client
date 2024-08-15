import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';

const Navmenu = ({ address, label, icon: Icon }) => {
    return (
        <div>
            <NavLink className={({ isActive }) => isActive ? "text-lg text-white bg-yellow-500 px-3 py-2 rounded-xl font-medium flex items-center gap-1" : "text-white px-3 py-2 font-medium text-lg hover:text-[#859770] hover:bg-[white] hover:rounded-xl flex items-center gap-1"}
                to={address}>
                {<Icon className='text-white text-3xl'></Icon>}
                {label}
            </NavLink>
        </div>
    );
};

Navmenu.propTypes = {
    address: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.func,
}
export default Navmenu;