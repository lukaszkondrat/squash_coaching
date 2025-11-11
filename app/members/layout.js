'use client'

import SideNavigation from "@/app/_components/SideNavigation";
import { useAuthContext } from "@/app/_components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const { user, loading, error } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const checkIsMobile = () => {
      const isPortraitMobile = window.innerWidth <= 768 && window.innerHeight > window.innerWidth;
      setIsMobile(isPortraitMobile);
    };

    checkIsMobile();
    const handleOrientationChange = () => {
      setTimeout(checkIsMobile, 100);
    };
    window.addEventListener('resize', checkIsMobile);
    window.addEventListener('orientationchange', handleOrientationChange);
    return () => {
      window.removeEventListener('resize', checkIsMobile);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-full gap-2">
        <p className="text-2xl font-medium">Authentication Error</p>
        <p className="text-xl">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-sm uppercase bg-accent-500 px-3 py-2 text-white rounded-lg hover:bg-accent-600 ease-in-out duration-300"
        >
          Retry
        </button>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="flex flex-col justify-center items-center text-center h-full gap-2">
        <p className="text-xl font-medium">Please use a large screen or rotate your device to landscape mode to enjoy the best experience on this page</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
      <SideNavigation />
      <div className="py-1">{children}</div>
    </div>
  );
}