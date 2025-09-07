import React from 'react'
import { Suspense } from 'react'
import PaymentPage from './paymentPage'

function SearchBarFallback() {
  return <>placeholder</>
}

const page = () => {
  return (
    <Suspense fallback={<SearchBarFallback />}>
    <PaymentPage />
  </Suspense>
  )
}

export default page