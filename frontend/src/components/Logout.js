import React from 'react';
import {googleLogout} from '@react-oauth/google';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

function Logout({ setUser }) {

    const navigate = useNavigate();

    const onclick = () => {
        googleLogout();
        setUser(null);
        localStorage.setItem("login", null);
        navigate('/'); // Redirect the user to '/'
        console.log('Logout made successfully');
    }

    return (
        <div>
            <Button 
                variant='light'
                onClick={onclick}
            >Logout</Button>
        </div>
    );
}

export default Logout;