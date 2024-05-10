import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import HoverUserDetail from "../HoverUserDetail";

export default function HeaderButtons({ loggedin, status }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isHover, setIsHover] = useState(false)
    const userid = useSelector((state => (state.userData?.$id)))

    return (
        <div className="p-2 pr-4">
            {!status ? (loggedin ? (

                <Link to={'/signup'}><Button text="Sign up  " /></Link>
            ) : (
                <Link to={'login'}><Button text="Log in" /></Link>

            )) : null}
            {status &&
                (
                    <div className="w-12 pt- pr-2 transform hover:scale-125 duration-300 ease-in-out"
                        onMouseEnter={() => (setIsHover(true))}
                        onMouseLeave={() => (setIsHover(false))}
                    >
                        <img className="rounded-full bg-black w-12 h-10"
                            src="https://cdn.dribbble.com/users/2199928/screenshots/11532918/media/5a7273b592ea860e6d0ff2931ecab4f3.png?resize=400x300&vertical=center" alt="" />
                    </div>

                )}

            {isHover &&
                <div onMouseEnter={() => setIsHover(true)}
                     onMouseLeave={() => setIsHover(false)}>
                    <HoverUserDetail userid={userid} isHover={isHover} setIsHover={setIsHover} />
                </div>
            }
        </div>
    )
}