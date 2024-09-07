import Frame295 from '../assets/Frame295.png';
import Frame298 from '../assets/Frame298.png';
import { useNavigate } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc"

export default function SignIn({ onSignIn }) {

  const navigate = useNavigate();
  const handleSignup = (e) => {
    e.preventDefault();
    onSignIn();
    navigate('/dashboard');
  };


  return (
    <div className="flex flex-col h-screen lg:flex-row">
      {/* Left Section - Login Form */}
      <div className="flex flex-col items-center justify-center px-4 py-8 bg-white lg:w-1/2 md:px-6 lg:px-12">
        {/* Logo */}
        <div className="mb-6 lg:mb-8">
          <img src="/enatlogo.svg" alt="Logo" className="h-10 md:h-12" />
        </div>

        {/* Form */}
        <div className="w-[478px] px-8 border gap-6 border-gray-200 rounded-[10px] py-14 md:p-8">
          <div className="text-center gap-[5px]">
            <h2 className="mb-4 text-xl font-bold md:text-2xl">
              Welcome <span className="text-[#00E0D2]">Back</span>
            </h2>
            <p className="mb-6 text-sm font-normal text-gray-500 md:text-base">
              Please enter your details to log in
            </p>
          </div>

          <form onSubmit={handleSignup} className="">
            {/* Email Field */}
            <div className='mb-3'>
              <label htmlFor="email" className="sr-only">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Email Address"
                className="w-full px-[30px] py-2 text-sm border-[1px] border-gray-300 rounded-[40px] md:text-base"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="w-full px-[30px] py-2 text-sm border-[1px] border-gray-300 rounded-[40px] md:text-base"
              />
              <button type="button" className="absolute inset-y-0 right-0 px-3">
                <svg>
                  {/* Password eye icon */}
                </svg>
              </button>
            </div>

            {/* Remember & Forgot Password */}
            <div className="flex items-center justify-between px-2 mt-8">
              <div className="flex items-center space-x-2">
                <div className="relative inline-flex">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded-md bg shadow-custom-drop focus:outline-none"
                  />
                </div>
                <span className="text-black font-bold text-base">Remember</span>
                </div>
              <a href="#" className="text-xs text-[#00E0D2] font-normal md:text-sm">Forgot Password</a>
            </div>

            {/* Submit Button */}
            <button className="w-full py-3 px-[70px] mt-6 text-sm font-normal text-white rounded-[50px] bg-[#00E0D2] md:text-base md:py-4">
              CONTINUE
            </button>
          </form>

          {/* OR Divider */}
          <div className="">
            <div className="flex items-center mt-4 md:mt-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-2 text-xs text-gray-500 md:text-sm">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Social Login */}
            <div className="flex space-x-3 mt-2 md:mt-3">
              <button className="flex items-center justify-center w-full rounded-[60px] border-[1px] py-2 gap-3">
                <FcGoogle size={20} /> <span>Login with Google</span>
              </button>
              <button className="flex items-center justify-center w-full rounded-[60px] border-[1px] py-2 gap-3">
              <img src='/registration/facebook.png' alt='facebook' width={20} height={20} /> <span className='text-sm font-normal'>Login with Facebook</span>
              </button>
            </div>
          </div>

          {/* Sign Up */}
          <p className="mt-6 text-xs text-center text-black md:text-base font-normal">
            I don’t have an account? <a href="/sign-up" className="text-[#00E0D2]">Sign Up</a>
          </p>
        </div>
      </div>

      {/* Right Section - Graphic */}
      <div className="relative items-center justify-center hidden p-8 lg:flex lg:w-1/2 bg-gradient-to-br from-[#00E0D2] to-[#007A72]">
        {/* Add the background images */}
        <div
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${Frame295})` }}
        >
          {/* This div could hold a secondary image or similar */}
          <div
            className="absolute inset-0 bg-cover bg-no-repeat opacity-75"
            style={{ backgroundImage: `url(${Frame298})` }}
          ></div>
        </div>

        {/* Content box with overflow-hidden */}
        <div className="relative max-w-lg text-center bg-white bg-opacity-30 backdrop-blur-lg rounded-[20px] pt-10 px-10 overflow-hidden">
          <h2 className="mb-4 text-2xl font-bold text-white md:text-4xl">Welcome to our database 👋</h2>
          <p className="mb-6 text-xs text-white md:text-base">
            Find & Download Free Graphic Resources for Pie Chart. 100000+ Vectors, Stock Photos & PSD files. ✓ Free for commercial use ✓ High Quality Images.
          </p>
          <img src="/registration/salesman.png" alt="Illustration" className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
}
