import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import { logout } from "../reduxstore/reducer/authSlice";
import authService from "../service/auth";
import { useNavigate } from "react-router-dom";

export default function HoverUserDetail({userid, isHover, setIsHover}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutCall = async () => {
        setIsHover(false);
        await authService.logout(userid);
        dispatch(logout());
        navigate('/')
    }
    const userData = useSelector((state) => (state.userData))
    return (
        <div className="absolute top-10 right-10 z-50 p-4">
            <div
                className="py-8 px-8 max-w-sm mx-auto border border-gray-200 bg-gray-200 rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
                <img className="block mx-auto h-24  rounded-full sm:mx-0 sm:shrink-0" src="https://tailwindcss.com/img/erin-lindford.jpg" alt="Woman's Face"></img>
                <div className="text-center space-y-2 sm:text-left">
                    <div className="space-y-0.5">
                        <p className="text-lg text-black font-semibold">
                            {userData.name}
                        </p>
                        <p className="text-slate-500 font-medium">
                            Product Engineer
                        </p>
                    </div>
                    <div className="flex space-x-2">
                    <Button text="Profile" />
                    <Button callback={logoutCall} text="Logout" />
                    </div>
                </div>
            </div>
        </div>
    )
}