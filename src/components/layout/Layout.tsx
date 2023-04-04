import { useEffect, useState } from 'react'
import { Outlet } from "react-router-dom";
import Header from './header/Header';
import { useAppSelector } from '../../store';
import authService from '../../services/auth.service';
import Loader from '../sharedComponents/Loader';

function Layout() {
    const { isLoading } = useAppSelector((state) => state.auth);
    return (
        <>
            {isLoading ?
               <Loader loaderState={isLoading} /> :
                <><Header/><Outlet /></>
                 } 
        </>

    )
}

export default Layout;