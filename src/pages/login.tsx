import { useState } from 'react';
import { useDispatch,  } from 'react-redux';
import { setUser } from '../features/users/userSlice';
import { useCreateUserMutation } from '../features/users/usersAPI';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import loginPic from './images/Login-cuate.png'
export const Login  = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [createUser, { isLoading }] = useCreateUserMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newUser = { email, password }; // Replace with actual login data
            const { response }: any = (await createUser(newUser)).data;
            dispatch(setUser(response));
            navigate('/user/dashboard'); // Redirect to dashboard after successful login
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col lg:flex-row items-center justify-center py-12 px-6 lg:px-8">
            <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-start lg:px-8">
                <img className="w-full h-auto object-cover lg:h-full" src={loginPic} alt="Welcome" />
            </div>    
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
                <div className="mx-auto w-full lg:w-[600px]">
                    <div>
                        <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome Back </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="rounded w-full mb-5 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>
                            <div>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                                disabled={isLoading}
                                className="group relative w-1/2 lg:ml-[150px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white sm:ml-0 bg-red-500 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
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
};

export default Login;
