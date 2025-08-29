// src/constants/themes.js

// Color Palette (extracted from book-nest-web-portal)
export const Colors = {
  // Primary colors
  primary: '#4A90E2', // Vibrant blue (buttons, active states)
  primaryDark: '#0d4e98ff', // Darker shade for pressed states
  primaryLight: '#a3c8f3ff', // Light shade for backgrounds

  // Neutral colors
  white: '#FFFFFF',
  background: '#FFFFFF', // Main background
  surface: '#F9FAFB', // Card backgrounds
  divider: '#E5E7EB', // Dividers and borders

  // Text colors
  textPrimary: '#111827', // Headlines and important text
  textSecondary: '#6B7280', // Body text and labels
  textTertiary: '#9CA3AF', // Placeholder text
  textInverse: '#FFFFFF', // Text on colored backgrounds

  // Status colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Additional colors
  overlay: 'rgba(17, 24, 39, 0.5)', // For modals and overlays
};

// Typography Scale
export const Typography = {
  header: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
    color: Colors.textPrimary,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    color: Colors.textPrimary,
  },
  body: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: Colors.textSecondary,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    color: Colors.textTertiary,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    color: Colors.textInverse,
    textTransform: 'uppercase',
  },
};

// Spacing System (8pt grid)
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

// Border Radius
export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 24,
  full: 100,
};

// Shadows (platform specific)
export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

// Export a default theme object
const Theme = {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  Shadows,
};

export default Theme;
