"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, signup, createMember } from "@/app/_lib/data-service";
import Link from "next/link";
import toast from "react-hot-toast";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      await login({ email, password });
      toast.success('Successfully logged in!');
      router.push('/members');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
      setEmail('');
      setPassword('');
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const user = await signup({ email, password });
      if (user.user) {
        await createMember({ fullName: 'New Member', email: user.user.email });
        toast.success('Account created successfully! You are now logged in.');
        router.push('/members');
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
      setEmail('');
      setPassword('');
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div className="flex flex-col gap-4 text-primary-950">
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="p-1 border-b-2 rounded focus:outline-none focus:border-primary-950 ease-in-out duration-300"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            className="p-1 border-b-2 rounded focus:outline-none focus:border-primary-950 ease-in-out duration-300"
          />
        </div>
        <div className="flex justify-between items-center gap-4">
          <button
            type="button"
            onClick={handleSignup}
            disabled={isLoading}
            className='text-sm uppercase bg-transparent border-2 border-accent-500 px-3 pt-2 pb-1 text-accent-500 rounded-lg hover:bg-accent-500 hover:text-white ease-in-out duration-300 w-full disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Sign up
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className='text-sm uppercase bg-accent-500 px-3 pt-2 pb-1 text-white rounded-lg hover:bg-accent-600 ease-in-out duration-300 w-full disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Log in
          </button>
        </div>
        <p className="text-sm text-primary-950">Forgot password? <Link href="/reset-password" className="text-accent-500 hover:text-accent-600 ease-in-out duration-300">Reset password</Link></p>
      </div>
    </form >
  );
}