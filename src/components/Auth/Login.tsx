import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full bg-[#121827] rounded-xl shadow-xl p-10 space-y-8 animate-fadeInUp">
        <div className="text-center text-white">
          <h2 className="text-3xl font-extrabold tracking-tight mb-2">Welcome Back</h2>
          <p className="text-gray-400">Login to your blockchain account</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full rounded-lg bg-[#1e293b] border border-[#334155] px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ffc300] focus:border-[#ffc300] transition duration-300"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="w-full rounded-lg bg-[#1e293b] border border-[#334155] px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ffc300] focus:border-[#ffc300] transition duration-300"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-400">
            <label className="flex items-center space-x-2 cursor-pointer select-none">
              <input type="checkbox" className="h-4 w-4 text-[#ffc300] bg-[#1e293b] border-gray-600 rounded focus:ring-[#ffc300]" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="hover:text-[#ffc300] transition">Forgot password?</Link>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-6 bg-[#ffc300] text-gray-900 font-bold rounded-lg hover:bg-yellow-400 transition duration-300 shadow-lg shadow-[#ffc300]/50 transform hover:-translate-y-1"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-gray-500 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#ffc300] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
