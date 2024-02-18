import { ReactNode } from 'react';
import './EmployeeCard.scss';

interface EmployeeCardProps {
  label: string;
  value: ReactNode;
}

export default function EmployeeCard(props?: EmployeeCardProps) {
  return (
    <div className="employee-card px-4 py-8 rounded-md text-center">
      <div className="header">
        <h2 className="m-0">{props?.label}</h2>
      </div>
      <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <div className="content">
        <p className="text-3xl">{props?.value}</p>
      </div>
    </div>
  )
}
