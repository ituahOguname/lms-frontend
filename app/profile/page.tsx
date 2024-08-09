/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React, {Children, FC, useState} from 'react';
import { useSelector } from 'react-redux';
import ProfileForm from './profile-form';
import { Separator } from '@/components/ui/separator';

type Props = {}

const page:FC<Props> = (props) => {
  const {user} = useSelector((state:any) => state.auth)
  const [avatar, setAvatar] = useState(null);

  return (
    <div className="min-h-screen">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
          </p>
        </div>
        <Separator />
        <ProfileForm avatar={avatar} user={user}/>
      </div>
    </div>
  );
}

export default page