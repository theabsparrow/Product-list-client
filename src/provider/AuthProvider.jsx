import { createContext, useState } from "react";
import PropTypes from 'prop-types';

export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true)

    const contextInfo = {loading}
    return (
        <AuthContext.Provider value={contextInfo}>
            {children}
        </AuthContext.Provider>
    );
};


AuthProvider.propTypes = {
    children: PropTypes.node
}
export default AuthProvider;