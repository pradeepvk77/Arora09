import { useState, useRef } from "react";
import InputField from "../component/InputField";
import { useDispatch } from "react-redux";
import { login } from "../reduxStore/reducer/authSlice";
import authService from "../service/auth";

import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newForm = {
      email: emailRef.current.value,
      name: nameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      setError(null);
      setLoading(true);
      await authService.createAccount(newForm);
      const userData = await authService.getCurrentUser();
      dispatch(login(userData));
      setLoading(false);
      navigate("/home");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-4/5  lg:w-1/3 mt-8 p-6 mb-10 bg-gray-500 border border-gray-300 border-opacity-40 bg-opacity-40 rounded-lg shadow-lg shadow-blue-600">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {/* re using the input component */}
        <InputField
          label={"Full Name"}
          type={"text"}
          placeholder="Mohan Lal"
          ref={nameRef}
        />
        <InputField
          label={"Email"}
          type={"email"}
          placeholder="mohan@gmail.com"
          ref={emailRef}
        />
        <InputField
          label={"Password"}
          type={"password"}
          placeholder="*********"
          ref={passwordRef}
        />
        <div className="flex">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Sign Up
          </button>
          <div className="loading">
            {loading ? <span className="spinner"></span> : null}
          </div>
        </div>
      </form>
      <p className="mt-2">
        {`don't`} have account{" "}
        <Link to={"/login"} className="ml-2 underline">
          Login
        </Link>
      </p>
      {error ? <p className="text-red-500">!!!{error}</p> : null}
    </div>
    </div>
  );
}

export default Signup;
