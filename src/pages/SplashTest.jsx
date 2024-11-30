/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { login } from "../reduxStore/reducer/authSlice";
import authService from "../service/auth";

function Splash() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUser = async () => {
    const data = await authService.getCurrentUser(); //getting current user data
    if (data) {
      dispatch(login(data));
      navigate("/home");
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  //button function
  const singInButton = () => {
    navigate("login");
  };

  return (
    <div className="h-full mb-6 pb-1">
      <div className="container pt-2   mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
          <h1 className="my-4 text-4xl  text-white opacity-75 font-bold leading-tight text-center md:text-left">
            Unlock<span> </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
              endless possibilities and vision</span>explore now!</h1>
          <p className="leading-normal text-2xl mb-8 text-center md:text-left text-gray-400">
            Through the digital corridors of the internet, where thoughts meet pixels
          </p>

          <form className="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-blue-300 py-2 font-bold mb-2"
                htmlFor="emailAddress"
              >
                Sign in by pass-key
              </label>
              <input
                className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                id="emailAddress"
                type="text"
                placeholder="Pass-key"
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                type="button"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>

        <div className="w-full xl:w-3/5 p-12 overflow-hidden">
          <img
            className="mx-auto w-full hidden xl:block md:w-4/5 transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-6"
            src="https://www.tailwindtoolbox.com/templates/profile-card.png"
          />
          <div className="flex items-center justify-end pt-4">
            <button
              onClick={singInButton}
              className="bg-gradient-to-l from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
              type="button"
            >
              Lets start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Splash;
