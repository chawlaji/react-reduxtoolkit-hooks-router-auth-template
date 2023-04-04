// import { useAuth } from '../../../util/AuthProvider';
import {
    useNavigate
} from "react-router-dom";
import './Header.css';
import { FunctionComponent } from 'react';
import { useAppDispatch, useAppSelector } from "../../../store";
import { logout } from "../../../slices/auth.slice";
import { Button } from "@mui/material";

const Header: FunctionComponent = () => {
    let navigate = useNavigate();
    const { isLoggedIn, user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    return (
        <nav className="navbar">
            <div className="logo">
                <a href="#">kanun.ai</a>
            </div>
            <div className="buttons">
                {isLoggedIn ?
                    <>
                        <p> Welcome {user?.username}</p>
                        <Button variant="contained" onClick={() => {
                            dispatch(logout())
                                .unwrap()
                                .then(() => {
                                    navigate("/");
                                })
                                .catch(() => {

                                });
                        }}>Logout</Button>
                    </>
                    :
                    <>
                        <Button variant="contained" onClick={() => navigate("/login")}> Login</Button>
                        <Button variant="contained" onClick={() => navigate("/signup")}>Sign Up</Button>
                    </>
                }
            </div>
        </nav>
    )
};

export default Header;