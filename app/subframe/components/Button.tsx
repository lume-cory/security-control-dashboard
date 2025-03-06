import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import { IconName } from '@fortawesome/fontawesome-svg-core';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'brand-primary' | 'brand-secondary' | 'ghost';
  size?: 'default' | 'small' | 'large';
  icon?: IconName;
  children: ReactNode;
  className?: string;
} 