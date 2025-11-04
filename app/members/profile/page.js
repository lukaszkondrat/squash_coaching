'use client'

import { useAuthContext } from "@/app/_components/AuthProvider";
import { useUpdateMember } from "@/app/_hooks/useUpdateMember";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { member } = useAuthContext()
  const { updateMember, isLoading } = useUpdateMember()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    setFullName(member?.fullName)
    setEmail(member?.email)
  }, [member])

  async function handleSubmit(e) {
    e.preventDefault()
    updateMember({ email: member.email, updatedMember: { fullName } })
  }

  return <div className="max-w-2xl mx-auto justify-start">
    <h2 className="font-semibold text-xl text-accent-500 mb-4">
      Update your profile
    </h2>
    <p className="text-lg mb-8 text-primary-200">
      Your name and email address are used to identify you in the system.
    </p>
    <form className="bg-primary-800 py-6 px-8 text-md flex gap-6 flex-col rounded-lg" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label>Full name</label>
        <input
          type="text"
          name="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="px-4 py-2 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>
      <div className="space-y-2">
        <label>Email address</label>
        <input
          type="email"
          name="email"
          value={email}
          disabled={true}
          className="px-4 py-2 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
        <p className="text-sm text-primary-200">To change your email address, please contact us at <span className="text-accent-500">singaporesquashcoach@gmail.com</span></p>
      </div>
      <div className="flex justify-end items-center gap-6">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-block text-md bg-accent-600 px-4 py-2 text-primary-950 font-semibold hover:bg-accent-500 ease-in-out duration-300 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
        >
          {isLoading ? 'Updating...' : 'Update'}
        </button>
      </div>
    </form>
  </div>
}