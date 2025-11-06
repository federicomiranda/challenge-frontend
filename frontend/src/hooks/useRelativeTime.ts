import { useState, useEffect } from 'react';
import { formatRelativeTime } from '@/utils/formatters';

export function useRelativeTime(date: Date | null) {
  const [relativeTime, setRelativeTime] = useState<string>('');

  useEffect(() => {
    if (!date) {
      setRelativeTime('');
      return;
    }

    const updateTime = () => {
      setRelativeTime(formatRelativeTime(date));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [date]);

  return relativeTime;
}
