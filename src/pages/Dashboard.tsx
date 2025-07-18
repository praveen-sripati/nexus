import { ThemeToggle } from '@/components/ThemeToggle';
import { type FC } from 'react';

export const Dashboard: FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <ThemeToggle />
      </div>
    </div>
  );
};
