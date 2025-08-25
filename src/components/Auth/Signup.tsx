import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your signup logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] px-6 py-12">
      <div className="max-w-md w-full bg-[#121827] rounded-xl shadow-xl p-10 space-y-8 animate-fadeInUp">
        <div className="text-center text-white">
          <h2 className="text-3xl font-extrabold tracking-tight mb-2">Create your Blockchain Account</h2>
          <p className="text-gray-400">Sign up to start your decentralized journey</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full rounded-lg bg-[#1e293b] border border-[#334155] px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ffc300] focus:border-[#ffc300] transition duration-300"
              />
            </div>
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full rounded-lg bg-[#1e293b] border border-[#334155] px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ffc300] focus:border-[#ffc300] transition duration-300"
              />
            </div>
            <div>
              <label htmlFor="confirm" className="sr-only">Confirm Password</label>
              <input
                id="confirm"
                type="password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Confirm Password"
                className="w-full rounded-lg bg-[#1e293b] border border-[#334155] px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ffc300] focus:border-[#ffc300] transition duration-300"
              />
            </div>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-6 bg-[#ffc300] text-gray-900 font-bold rounded-lg hover:bg-yellow-400 transition duration-300 shadow-lg shadow-[#ffc300]/50 transform hover:-translate-y-1"
          >
            Create Account
          </button>
        </form>
        <p className="text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-[#ffc300] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
