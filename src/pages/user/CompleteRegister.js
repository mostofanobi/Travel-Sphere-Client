import React, { useEffect, useState } from 'react';
// react icons
import { BsPersonPlus } from 'react-icons/bs';

// react router
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../contexts/AuthProvider';

// cmponent
const CompleteRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { completeRegisterWithEmailLink, isLoading, user } = useAuthContext();
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (user && user.emailVerified) navigate(from);
    console.log(user);
  }, [user, navigate, from]);

  useEffect(() => {
    setMounted(true);
    setEmail(window.localStorage.getItem('emailForRegistration'));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // validation
    if (!email || !password) {
      toast.error('Email & password is required');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    completeRegisterWithEmailLink(name, password, navigate);
  };

  return (
    <section className="md:py-12 py-6 w-full mx-auto px-3 md:px-6">
      <div className="max-w-3xl md:h-[35rem] bg-white shadow-2xl rounded-xl md:grid md:grid-cols-5 mx-auto p-3 md:p-0">
        <div
          className={`${
            mounted
              ? 'transform translate-y-0 opacity-100'
              : 'transform translate-y-2 opacity-0'
          } md:col-span-2 md:m-3 rounded-xl bg-sky-500 bg-patterns2 shadow-lg shadow-sky-300 transition-all ease-in duration-300`}
        >
          <div className="text-white h-full flex flex-col justify-between">
            <div className="flex-1 flex md:gap-5 gap-2 flex-col justify-center md:m-4 m-3">
              <h3 className="font-semibold tracking-wide text-3xl">Sign Up</h3>
              <p className="mt-1 text-sm text-sky-100 max-w-sm">
                Sign up now to enjoy experiences shared by all travelers and
                share your experience!
              </p>
            </div>
            <div className="md:m-4 m-3 p-4 bg-sky-400 bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-60 rounded-xl flex flex-col gap-2 mt-4">
              <p className="text-sky-100">Have an account?</p>
              <Link to="/user/login" className="font-medium inline">
                Log In
              </Link>
            </div>
          </div>
        </div>
        <div
          className={`${
            mounted
              ? 'transform translate-y-0 opacity-100'
              : 'transform translate-y-2 opacity-0'
          } mt-5 md:mt-0 md:col-span-3 transition-all ease-in duration-300 delay-300`}
        >
          <div className="overflow-hidden h-full flex items-center">
            <div className="md:mr-4 md:px-10 py-5 flex-1 grid grid-cols-6 gap-4">
              {/* <div className=""> */}
              {/* email */}
              <form onSubmit={handleSubmit} className="col-span-6 space-y-4">
                {/* full name */}
                <div>
                  <label htmlFor="name" className="block text-md text-text">
                    Full name<span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      autoComplete="given-name"
                      placeholder="John Doe"
                      className="appearance-none block w-full px-3 py-2 border border-sky-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    />
                  </div>
                </div>
                {/* email input */}
                <div>
                  <label htmlFor="email" className="block text-md text-text">
                    Email address<span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      defaultValue={email}
                      disabled
                      required
                      autoComplete="email"
                      placeholder="example@mail.com"
                      className="appearance-none block w-full px-3 py-2 border border-sky-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    />
                  </div>
                </div>
                {/* password input */}
                <div>
                  <label htmlFor="password" className="block text-md text-text">
                    Password<span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="Password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-sky-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    />
                  </div>
                </div>
                {/* login button */}
                <div>
                  <button
                    type="submit"
                    disabled={!email || password.length < 6}
                    className="w-full disabled:opacity-90 disabled:cursor-not-allowed flex items-center gap-2 justify-center py-2 px-4 border border-transparent rounded-md shadow-md shadow-sky-300 text-sm font-normal text-white bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                  >
                    <>
                      <span>
                        {isLoading ? 'Loading...' : 'Complete Register'}
                      </span>{' '}
                      <BsPersonPlus className="text-xl" />
                    </>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompleteRegister;
