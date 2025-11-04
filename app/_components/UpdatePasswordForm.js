"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updatePassword, getCurrentSession, signOut } from "@/app/_lib/data-service";
import Link from "next/link";
import toast from "react-hot-toast";

export default function UpdatePasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasValidSession, setHasValidSession] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  useEffect(() => {
    async function checkSession() {
      try {
        const session = await getCurrentSession();
        if (session?.user) {
          setHasValidSession(true);
        } else {
          toast.error('Invalid or expired reset link. Please request a new one.');
          router.push('/reset-password');
        }
      } catch (error) {
        console.error('Session check error:', error);
        toast.error('Invalid or expired reset link. Please request a new one.');
        router.push('/reset-password');
      } finally {
        setIsCheckingSession(false);
      }
    }

    checkSession();
  }, [router]);

  useEffect(() => {
    const handleBeforeUnload = async () => {
      if (hasValidSession && !isLoading && !passwordUpdated) {
        try {
          await signOut();
        } catch (error) {
          console.error('Error signing out on page leave:', error);
        }
      }
    };

    const handleRouteChange = async () => {
      if (hasValidSession && !isLoading && !passwordUpdated) {
        try {
          await signOut();
        } catch (error) {
          console.error('Error signing out on route change:', error);
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    const cleanup = () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      handleRouteChange();
    };

    return cleanup;
  }, [hasValidSession, isLoading, passwordUpdated]);

  async function handleUpdatePassword(e) {
    e.preventDefault();
    if (!password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    try {
      await updatePassword(password);
      setPasswordUpdated(true);
      await signOut();
      toast.success('Password updated successfully! Please log in with your new password.');
      router.push('/login');
    } catch (error) {
      console.error('Update password error:', error);
      toast.error('Failed to update password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  if (isCheckingSession) {
    return (
      <div className="flex flex-col gap-4 text-primary-950 text-center">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Verifying...</h2>
          <p className="text-sm text-primary-700">
            Please wait while we verify your reset link.
          </p>
        </div>
      </div>
    );
  }

  if (!hasValidSession) {
    return (
      <div className="flex flex-col gap-4 text-primary-950 text-center">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Invalid Link</h2>
          <p className="text-sm text-primary-700">
            This reset link is invalid or has expired.
          </p>
        </div>
        <Link
          href="/reset-password"
          className='text-sm uppercase bg-accent-500 px-3 pt-2 pb-1 text-white rounded-lg hover:bg-accent-600 ease-in-out duration-300 w-full text-center'
        >
          Request New Reset Link
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleUpdatePassword}>
      <div className="flex flex-col gap-4 text-primary-950 ">
        <div className="flex flex-col gap-4">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            className="p-1 border-b-2 rounded focus:outline-none focus:border-primary-950 ease-in-out duration-300"
            placeholder="Enter new password"
            minLength={6}
          />
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
            className="p-1 border-b-2 rounded focus:outline-none focus:border-primary-950 ease-in-out duration-300"
            placeholder="Confirm new password"
            minLength={6}
          />
        </div>
        <div className="flex flex-col gap-2">
          <button
            type="submit"
            disabled={isLoading}
            className='text-sm uppercase bg-accent-500 px-3 pt-2 pb-1 text-white rounded-lg hover:bg-accent-600 ease-in-out duration-300 w-full disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isLoading ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </div>
    </form>
  );
} 