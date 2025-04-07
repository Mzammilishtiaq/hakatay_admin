import  { ReactNode } from 'react';
import {Card} from '@mui/material'


export interface CustomCardProps{
  children:ReactNode,
  styleClass:string
}
function CustomCard({children,styleClass}:CustomCardProps) {
  return (
    <Card variant="elevation" className={`flex flex-col  rounded-lg shadow gap-3  ${styleClass}`}>
      {children}
    </Card>
  )
}

export default CustomCard
