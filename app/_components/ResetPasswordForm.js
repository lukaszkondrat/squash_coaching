"use client";

import { useState } from "react";
import { useResetPassword } from "@/app/_hooks/useResetPassword";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ResetPasswordForm() {
  const { resetPassword, isPending } = useResetPassword();
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  async function handleResetPassword(e) {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    resetPassword(email, {
      onSuccess: () => {
        setEmailSent(true);
      }
    });
  }

  if (emailSent) {
    return (
      <div className="flex flex-col gap-4 text-primary-950 text-center">
        <div className="mb-2">
          <h2 className="text-xl font-semibold mb-2">Check Your Email</h2>
          <p className="text-sm text-primary-700">
            We&apos;ve sent a password reset link to <strong>{email}</strong>.
            Click the link in the email to reset your password.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => {
              setEmailSent(false);
              setEmail("");
            }}
            className='text-sm uppercase bg-transparent border-2 border-accent-500 px-3 pt-2 pb-1 text-accent-500 rounded-lg hover:bg-accent-500 hover:text-white ease-in-out duration-300 w-full'
          >
            Send Another Email
          </button>
          <Link
            href="/login"
            className='text-sm uppercase bg-accent-500 px-3 pt-2 pb-1 text-white rounded-lg hover:bg-accent-600 ease-in-out duration-300 w-full text-center'
          >
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleResetPassword}>
      <div className="flex flex-col gap-4 text-primary-950">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Reset your password</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
            className="p-2 border-b-2 rounded focus:outline-none focus:border-primary-950 ease-in-out duration-300"
            placeholder="Enter your email"
          />
        </div>
        <div className="flex flex-col gap-2">
          <button
            type="submit"
            disabled={isPending}
            className='text-sm uppercase bg-accent-500 px-3 py-2 text-white rounded-lg hover:bg-accent-600 ease-in-out duration-300 w-full disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isPending ? 'Sending...' : 'Send Reset Email'}
          </button>
          <Link
            href="/login"
            className='text-sm uppercase bg-transparent border-2 border-accent-500 px-3 pt-2 pb-1 text-accent-500 rounded-lg hover:bg-accent-500 hover:text-white ease-in-out duration-300 w-full text-center'
          >
            Back to Login
          </Link>
        </div>
      </div>
    </form>
  );
} 