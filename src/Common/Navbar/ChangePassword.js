import React, { useState } from 'react'
import CreatePassword from '../../FunctionalComponents/LoginPage/LoginPageLayout/CreatePassword';
import { TextField } from '@mui/material';
import MainLayout from '../Dashboard/MainLayout';

export default function ChangePassword() {

    const [isRight, setIsRight] = useState(false);
    const [pass, setPass] = useState('')
    const handlePasswordChange = (e) => {
        console.log(e.target.value)
        setPass(e.target.value)
    }

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        console.log(pass)
        if (pass == 1234) {
            console.log("first")
            setIsRight(true)
        }
    }
    // z-[-1000]
    return (

<> 

<MainLayout  navbarHeaderContent={"Create New Password"} >
<div style={{ backgroundColor: "#0060B5" }} className='flex-col flex  items-center justify-center h-full'>
 {/* {(isRight) && */}
 <div className="bg-white p-10  rounded-md" style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)' }}>
                     <CreatePassword setIsLogin={true}/>
                </div>
                </div>
</MainLayout>

       
            {/* } */}
            {/* {(!isRight) && */}
            {/* <h1 className='text-white font-bold text-xl'>Reset Your Password</h1>
                <form onSubmit={handlePasswordSubmit} type="submit" className="bg-white p-5 scale-90 rounded-md">
                    <TextField
                        id="password"
                        type="password"
                        value={pass}
                        label="Enter Old Password"
                        variant="standard"
                        onChange={handlePasswordChange}
                        sx={{ width: '250px' }}
                    />
                </form> */}
            {/* } */}

           {/* </> */}

        {/* </div> */}
        </>
    )
}
