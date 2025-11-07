import { useRelativeTime } from '@/hooks/useRelativeTime';

interface LastUpdatedIndicatorProps {
  date: Date | null;
}

export function LastUpdatedIndicator({ date }: LastUpdatedIndicatorProps) {
  const relativeTime = useRelativeTime(date);

  if (!date) return null;

  return (
    <p className="text-sm text-gray-500">
      Última actualización: <span className="font-medium">{relativeTime}</span>
    </p>
  );
}
