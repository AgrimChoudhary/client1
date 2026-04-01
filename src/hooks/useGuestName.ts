import { useMemo } from 'react';

export function useGuestName(): string {
  return useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('guest') || 'Guest';
  }, []);
}
