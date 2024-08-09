"use client"
import React, {FC, useState}  from 'react';
import { Separator } from '@/components/ui/separator';
import ChangePasswordForm from './change-passsword-form';



type Props = {}

const ChangePassword: FC<Props> = ({}) => {
  

  return (
    <div className="min-h-screen">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Change Password</h3>
          <p className="text-sm text-muted-foreground">
            Update your password.
          </p>
        </div>
        <Separator />
        <ChangePasswordForm/>
      </div>
    </div>
  )
}

export default ChangePassword;