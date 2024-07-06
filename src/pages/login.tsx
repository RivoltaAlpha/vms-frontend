import { NavLink } from 'react-router-dom';
import loginPic from '../../public/images/Login-cuate.png'

export default function Login() {
    return (
        <div className="min-h-screen bg-white flex flex-col lg:flex-row items-center justify-center py-12 px-6 lg:px-8">
            <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-start lg:px-8">
                <img className="w-full h-auto object-cover lg:h-full" src={loginPic} alt="Welcome" />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
                <div className="mx-auto w-full  lg:w-[600px]">
                    <div>
                        <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome Back </h2>
                    </div>
                    <form className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <input
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className=" rounded w-full mb-5 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outlinefocus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>
                            <div>
                                <input
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded relative w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-1/2 lg:ml-[150px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white sm:ml-0 bg-red-500 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <div className="mt-6">
                        <div className="text-center">
                            <p className="mt-2 text-sm text-gray-600">
                                Don't have an account?{' '}
                                <NavLink to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Register
                                </NavLink>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
