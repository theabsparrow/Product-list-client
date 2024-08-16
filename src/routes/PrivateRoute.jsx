import { Navigate } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import PropTypes from 'prop-types';

const PrivateRoute = ({children}) => {
    const { user, loading } = UseAuth()
    console.log(loading)

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">
            <span className="loading loading-bars loading-xs"></span>
            <span className="loading loading-bars loading-sm"></span>
            <span className="loading loading-bars loading-md"></span>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }

    if (user) {
        return children
    }
    else {
        return <Navigate to='/Login' replace={true}></Navigate>
    }
};

PrivateRoute.propTypes = {
    children: PropTypes.node
}
export default PrivateRoute;