import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';

const Navmenu = ({ address, label, icon: Icon, image }) => {
    return (
        <div>
            <NavLink className={({ isActive }) => isActive ? "text-lg text-white bg-yellow-500 px-3 py-2 rounded-xl font-medium flex items-center gap-1" : "text-white px-3 py-2 font-medium text-lg hover:text-[#859770] hover:bg-yellow-500 hover:rounded-xl duration-500 flex items-center gap-1"}
                to={address}>
                {
                    Icon && <Icon className='text-yellow-500 text-3xl'></Icon>
                }
                {
                    image && <img className="w-[2.5vw] h-[2.5vw] rounded-full" src={image} alt="profile" />
                }

                {label}
            </NavLink>
        </div>
    );
};

Navmenu.propTypes = {
    address: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.func,
    image: PropTypes.string,
}
export default Navmenu;