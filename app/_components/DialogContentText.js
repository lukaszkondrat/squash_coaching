import { useAuthContext } from "@/app/_components/AuthProvider"

export default function DialogContentText({ selectedRange, sessionType, location, setSessionType, setLocation, handleConfirmBooking, setIsDialogOpen }) {
  const { member } = useAuthContext()

  return (
    <>
      <p className={`uppercase text-xl text-primary-900 mb-2`}>New session - {member ? <span className="font-semibold">{member?.fullName}</span> : ''}</p>
      <div className='flex flex-col items-center gap-2'>
        <p className='text-sm text-primary-600'>Please check and make sure all the details are correct before confirming your booking.</p>
        <div className='flex flex-col gap-2 mt-4'>
          <p className='text-xl font-semibold text-primary-900'>{new Date(selectedRange.start).toISOString().slice(0, 10)}, {new Date(selectedRange.start).toISOString().slice(11, 16)} - {new Date(selectedRange.end).toISOString().slice(11, 16)}</p>
          <div className='flex gap-2 items-center justify-between'>
            <p className='text-lg text-primary-900'>Duration: </p>
            <p className='text-lg text-primary-900 w-1/2'>{Math.round((new Date(selectedRange.end) - new Date(selectedRange.start)) / 3600000)} hour(s)</p>
          </div>
          <div className='flex gap-2 items-center justify-between'>
            <label className='text-lg text-primary-900'>Session:</label>
            <select value={sessionType} onChange={(e) => setSessionType(e.target.value)} className='px-3 py-2 text-primary-900 w-1/2 rounded-lg' name="session-type" id="session-type">
              <option value="private">Private</option>
              <option value="group">Group</option>
            </select>
          </div>
          <div className='flex gap-2 items-center justify-between'>
            <label className='text-lg text-primary-900'>Location:</label>
            <select value={location} onChange={(e) => setLocation(e.target.value)} className='px-3 py-2 text-primary-900 w-1/2 rounded-lg' name="location" id="location">
              <option value="kallang">Kallang</option>
              <option value="burghley">Burghley</option>
            </select>
          </div>
        </div>
        <p className='text-sm text-primary-600 mt-4'>Please note that this is only a coach&apos;s availability check - the final confirmation of the booking will be subject to the availability of the courts at your selected location and will be confirmed by the coach.</p>
      </div>
      <div className='flex justify-end gap-4 mt-8'>
        <button onClick={() => setIsDialogOpen(false)} className='text-md font-semibold uppercase border-2 border-transparent px-3 pt-2 pb-1 text-primary-950 rounded-lg hover:border-accent-950 ease-in-out duration-300'>Cancel</button>
        <button onClick={handleConfirmBooking} className='text-md font-semibold uppercase bg-accent-500 px-3 pt-2 pb-1 text-white rounded-lg hover:bg-accent-600 ease-in-out duration-300'>Confirm</button>
      </div>
    </>
  )
}