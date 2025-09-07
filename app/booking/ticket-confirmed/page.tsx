import React from 'react'
import { Suspense } from 'react'
import TicketPage from './ticketConfirmPage'

function SearchBarFallback() {
  return <>placeholder</>
}

const page = () => {
  return (
    <Suspense fallback={<SearchBarFallback />}>
    <TicketPage />
  </Suspense>
  )
}

export default page
