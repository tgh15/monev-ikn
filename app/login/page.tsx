'use client'

import { useState } from 'react'
import { Eye, EyeOff, Lock, Mail, User2 } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { login } from '@/lib/api/auth'
import { Formik } from 'formik'
import { Spinner } from '@/components/ui/spinner'

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const initialValues = { email: '', password: '' }

    const validate = (values: typeof initialValues) => {
        const errors: Partial<typeof initialValues> = {}

        if (!values.email) {
            errors.email = 'Required'
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Invalid email address'
        }

        if (!values.password) {
            errors.password = 'Required'
        } else if (values.password.length < 6) {
            errors.password = 'Password must be at least 6 characters'
        }

        return errors
    }

    const { mutate, isPending } = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            console.log(data);
            // toast.success("Login successful!", { position: "top-center" });
            window.location.href = `/admin`;
        },
        onError: (error) => {
            console.error(error);
            // toast.error(error?.message || "Login failed", { position: "top-center" });
        },
    });

    const handleLogin = async (values: typeof initialValues) => {
        mutate(values)
    }

    return (
        <div className="relative min-h-screen text-gray-800 w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md px-6">
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                            <User2 className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Selamat Datang</h1>
                        <p className="text-gray-600">Masuk ke akun Anda</p>
                    </div>

                    {/* Formik Form */}
                    <Formik
                        initialValues={initialValues}
                        validate={validate}
                        onSubmit={(values) => handleLogin(values)}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Email Input */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                                            placeholder="nama@email.com"
                                        />
                                    </div>
                                    {touched.email && errors.email && (
                                        <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                                    )}
                                </div>

                                {/* Password Input */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-blue-600 transition-colors"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5 text-gray-400" />
                                            ) : (
                                                <Eye className="h-5 w-5 text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                    {touched.password && errors.password && (
                                        <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full bg-gradient-to-r cursor-pointer from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200"
                                >
                                    {isPending ? (
                                        <Spinner className="mx-auto size-4" />
                                    ) : (
                                        'Masuk'
                                    )}
                                </button>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>

            {/* Animation Style */}
            <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
        </div>
    )
}
