import React from 'react'
import { Suspense } from 'react'
import ConfirmationPage from './confirmationPage'

function SearchBarFallback() {
  return <>placeholder</>
}

const page = () => {
  return (
    <Suspense fallback={<SearchBarFallback />}>
    <ConfirmationPage />
  </Suspense>
  )
}

export default page