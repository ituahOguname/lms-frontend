import React, {FC} from 'react';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  className?: string;
}

const PageTitle:FC<Props> = ({title, className}) => {
  return (
    <h1 className={cn('text-2xl font-semibold', className)}>{title}</h1>
  )
}

export default PageTitle