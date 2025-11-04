'use client'

import { useState, useEffect } from 'react'
import { useAuthContext } from '@/app/_components/AuthProvider'
import { useGetMemberBookings } from '@/app/_hooks/useGetMemberBookings'
import { useUpdateMember } from '@/app/_hooks/useUpdateMember'
import Image from 'next/image'
import paynow from '@/public/paynow.jpeg'

const formatDate = (booking) => {
  const startDate = new Date(booking.startDate);
  const endDate = new Date(booking.endDate);
  const formattedDate = startDate.toISOString().slice(0, 10);
  const formattedTime = startDate.toISOString().slice(11, 16);
  const endTime = endDate.toISOString().slice(11, 16);

  return `${formattedDate}, ${formattedTime}-${endTime}`
}

export default function MembersPage() {
  const { member } = useAuthContext()
  const { bookings } = useGetMemberBookings(member?.id)
  const [memberUpcomingBookings, setMemberUpcomingBookings] = useState([])
  const { updateMember } = useUpdateMember()

  useEffect(() => {
    const activeUntilDate = member?.activeUntil ? new Date(member.activeUntil) : null;
    if (activeUntilDate && activeUntilDate < new Date() && member?.membershipActive) {
      updateMember({ email: member.email, updatedMember: { membershipActive: false } })
    }
  }, [member?.activeUntil, member?.membershipActive])

  useEffect(() => {
    if (bookings) {
      setMemberUpcomingBookings(bookings)
    }
  }, [bookings])

  if (!member) {
    return <div className='flex flex-col justify-center items-center h-full gap-2'>
      <p className='text-2xl font-medium'>Member not found.</p>
      <p className="text-xl">Your member profile could not be loaded. Please contact <span className="text-accent-500 hover:text-accent-600 ease-in-out duration-300">singaporesquashcoach@gmail.com</span></p>
    </div>
  }

  return <>
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-medium">
        Hi there, <span className="text-primary-50">{member.fullName}</span>
      </h1>
    </div>
    <div className="flex gap-8">
      <div className="flex flex-col gap-4 w-3/5 mt-2">
        <div className="space-y-4">
          <div className="text-xl">
            <div className="flex flex-col md:flex-row gap-2 justify-between">
              <span>Your monthly pass status: </span>
              <span className={`${member.membershipActive ? 'text-green-500' : 'text-red-500'} font-semibold uppercase`}>{member.membershipActive ? 'Active' : 'Inactive'}</span>
            </div>
          </div>
          {member.membershipActive
            ?
            <>
              <div className="text-xl">
                <div className="flex flex-col md:flex-row gap-2 justify-between">
                  <span>Your monthly pass expires on: </span>
                  <span className="text-primary-50 font-semibold">{member.activeUntil?.slice(0, 10) || 'N/A'}</span>
                </div>
              </div>
              <div className="text-xl">
                <div className="flex flex-col md:flex-row gap-2 justify-between">
                  <span>Sessions included in the monthly pass remaining: </span>
                  <span className="text-primary-50 font-semibold">{member.sessionsLeft}</span>
                </div>
              </div>
              <div className="text-xl">
                <div className="flex flex-col gap-2">
                  <span>Next booked session(s): </span>
                  {memberUpcomingBookings?.map((booking, index) => {
                    return (
                      <span key={index} className="text-primary-50 font-semibold text-right">
                        {formatDate(booking)}
                      </span>
                    );
                  })}
                  {memberUpcomingBookings?.length > 0 && <span className="bg-primary-800 p-2 mt-2 rounded-md text-sm text-primary-50 text-left">
                    If you wish to cancel any of your upcoming sessions (not later than 24 hours before the session), please contact us at <span className="text-accent-500 hover:text-accent-600 ease-in-out duration-300">+65 8095 3490</span>
                  </span>}
                </div>
              </div>
            </>
            : <div className="text-xl">
              <div className="flex gap-2 justify-between">
                <span>Activate your monthly pass: </span>
                <Image src={paynow} className='mt-2' placeholder="blur" width={160} height={160} alt="A PayNow QR code to activate your membership" />
              </div>
            </div>}
        </div>
      </div>
    </div>
  </>
}