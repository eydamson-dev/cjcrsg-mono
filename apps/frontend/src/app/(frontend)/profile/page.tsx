"use client"

import { Button } from '@/components/ui/button'
import React from 'react'
import { logoutAction } from '@/app/(frontend)/actions/auth'

export default function Profile() {
  return (
    <>
      <div> Profile</div>
      <Button onClick={async () => {
        await logoutAction()
      }}>Logout</Button>
    </>
  )
}

