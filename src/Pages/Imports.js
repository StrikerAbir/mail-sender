import React, { useContext } from 'react';
import { AuthContext } from '../authProvider/AuthProvider';

const Imports = () => {
    const {user} = useContext(AuthContext)
    console.log(user);
    return (
        <div>
            imports
        </div>
    );
};

export default Imports;