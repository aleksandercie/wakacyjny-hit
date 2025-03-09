import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const wrapperWidth = {
  xxs: '240px',
  xs: '280px',
  s: '320px',
  m: '480px',
  l: '720px',
  xl: '1080px',
  xxl: '1280px',
  xxxl: '1920px'
};
