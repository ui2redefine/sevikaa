import {
  Home,
  ChefHat,
  Baby,
  HeartHandshake,
  Stethoscope,
  ClipboardList,
  Users,
  UserCheck,
  type LucideIcon,
} from 'lucide-react';
import type { ServiceSlug } from '@/config/site.config';

/** Slug → lucide icon, used by ServiceCard (home) and the services page. */
export const SERVICE_ICONS: Record<ServiceSlug, LucideIcon> = {
  'house-maid': Home,
  cook: ChefHat,
  babysitter: Baby,
  'elder-care': HeartHandshake,
  'patient-care': Stethoscope,
};

/** How-It-Works step number → lucide icon. */
export const HOW_IT_WORKS_ICONS: Record<number, LucideIcon> = {
  1: ClipboardList,
  2: Users,
  3: UserCheck,
};

/** Slug → photo (portrait, ~5:6). */
export const SERVICE_IMAGES: Partial<Record<ServiceSlug, string>> = {
  'house-maid': '/services/house-maid.jpg',
  cook: '/services/cook.jpg',
  babysitter: '/services/babysitter.jpg',
  'elder-care': '/services/elder-care.jpg',
  'patient-care': '/services/patient-care.jpg',
};
