// src/constants/themes.js

// src/theme/theme.js

const theme = {
  colors: {
    // Primary colors
    primary: 'rgb(42, 72, 222)', // Vibrant blue (buttons, active states)
    primaryDark: '#2A48DE', // Darker shade for pressed states
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
    overlay: 'rgba(17, 24, 39, 0.5)',
    inputBackground: '#F3F3F3',
  },

  fonts: {
    OpenSans: {
      regular: 'OpenSans-Regular',
      medium: 'OpenSans-Medium',
      bold: 'OpenSans-Bold',
    },
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
  },

  radius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 24,
    full: 100,
  },

  shadow: {
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
  },

  Typography: {
    header: {
      fontSize: 28,
      fontFamily: 'OpenSans-Bold',
      lineHeight: 36,
    },
    title: {
      fontSize: 20,
      fontFamily: 'OpenSans-SemiBold',
      lineHeight: 28,
    },
    subtitle: {
      fontSize: 16,
      fontFamily: 'OpenSans-Medium',
      lineHeight: 24,
    },
    body: {
      fontSize: 14,
      fontFamily: 'OpenSans-Regular',
      lineHeight: 20,
    },
    caption: {
      fontSize: 12,
      fontFamily: 'OpenSans-Regular',
      lineHeight: 16,
    },
    button: {
      fontSize: 16,
      fontFamily: 'OpenSans-SemiBold',
      lineHeight: 24,
      textTransform: 'uppercase',
    },
  },
};

export default theme;
