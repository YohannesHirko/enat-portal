import React from 'react';

const LogIn = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[1fr_45%] h-screen">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="w-full max-w-xl p-12 bg-white shadow-md rounded-xl backdrop-blur-md">
          <div className="flex items-center gap-4">
            <h3 className="text-2xl font-semibold">Welcome</h3>
            <img src="/hand.png" alt="hand" width={30} height={30} />
          </div>
          <p className="text-gray-500">Please login here</p>
          <form className="flex flex-col gap-6 mt-8" onSubmit="submit">
            <div className="w-full">
              <h1 className="mb-2 text-sm text-gray-600">
                Email Address <span className="text-red-500">*</span>
              </h1>
              <input
                name="email"
                required
                type="email"
                className="w-full px-4 py-2 bg-gray-300 rounded focus:outline-none"
              />
            </div>
            <div className="w-full">
              <h1 className="mb-2 text-sm text-gray-600">
                Password <span className="text-red-500">*</span>
              </h1>
              <input
                name="password"
                type="password"
                required
                className="w-full px-4 py-2 bg-gray-300 rounded focus:outline-none"
              />
            </div>
            <button type="submit" className="w-full py-3 font-medium text-gray-400 transition duration-300 bg-black border rounded hover:bg-white hover:text-black hover:border-black">
              Login
            </button>
            <div className="flex justify-between w-full mt-4">
              <a href={`/sign-up`} className="font-medium text-black no-underline">
                Create an account
              </a>
              <a href={`/recover-password`} className="font-medium text-black no-underline">
                Recover your password
              </a>
            </div>
          </form>
        </div>
      </div>
      <div className="relative w-full h-full bg-center bg-no-repeat bg-cover bg-gradient-to-br from-cyan-600 to-green-500">
        <div className="absolute w-full h-full">
          <a href="/">
            <img
              src="/logo-white.svg"
              alt="Logo"
              height={23}
              width={250}
              className="mt-16 ml-16 w-1/3 min-w-[150px] z-10"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default LogIn;
