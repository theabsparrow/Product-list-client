import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    // console.log(user)
    // create user
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // update profile
    const updateUserProfile = (name, photo) => {

        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }

    // user login
    const userLogin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // google login
    const loginWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider);
    }

    const logout = () => {
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            const userEmail = currentUser?.email || user?.email
            const currentUserEmail = { email: userEmail };
            setUser(currentUser);
            setLoading(false);

            if (currentUser) {
                axios.post(`${import.meta.env.VITE_API_URL}/jwt`, currentUserEmail, { withCredentials: true })
                    .then(res => {
                        
                    })
            }
            else {
                axios.post(`${import.meta.env.VITE_API_URL}/logout`, currentUserEmail, {
                    withCredentials: true
                })
                    .then(res => {

                    })
            }
        });
        return () => {
            return unsubscribe()
        }
    }, [])

    const contextInfo = { loading, setLoading, createUser, updateUserProfile, userLogin, loginWithGoogle, logout, user, setUser }
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