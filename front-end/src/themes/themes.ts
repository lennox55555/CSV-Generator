import { ThemeType } from './theme.types';

export const themes: { [key: string]: ThemeType } = {
  casual: {
    'bs-body-bg': '#f8f7f7',
    'bs-body-color': '#f8f7f7',
    'bs-profile-dropdown-bg': '#ffffff',
    'bs-profile-dropdown-border-bg': '#f8f7f7',
    'bs-dropdown-row-hover-bg': '#f2f2f2',
    'bs-btn-primary-bg': '#007bff',
    'sidebar-bg': 'linear-gradient(90deg, hsl(338, 75%, 67%) 0%, hsl(251, 44%, 65%) 100%)',
    'bs-toggle-sidebar-open-bg': 'hsl(14, 91%, 54%)',
    'bs-toggle-sidebar-close-bg': '#ffffff',
    'bs-msg-bg': '#F8F9FA',
    'bs-msg-bar-bg': '#ffffff',
    'bs-textarea-color': 'black',
    'bs-default-btn-bg': '#e0dfdf',
    'bs-active-btn-bg': 'hsl(14, 91%, 54%)',
    'bs-msg-bubble-bg': 'linear-gradient(90deg, hsl(338, 75%, 67%) 0%, hsl(251, 44%, 65%) 100%)',
    'bs-msg-bubble-loading-bg': 'linear-gradient(90deg, hsl(338, 75%, 67%) 0%, hsl(251, 44%, 65%) 100%)',
    'bs-table-header-color': 'linear-gradient(90deg, hsl(338, 75%, 67%) 0%, hsl(251, 44%, 65%) 100%)',
    'bs-table-border-color': 'hsl(14, 91%, 54%)',
    'bs-table-button-color': 'hsl(14, 91%, 54%)',
    'bs-table-data-color': '#202124',
    'sidebar-text-color': '#ffffff',
    'sidebar-text-color-active': '#3A4D39',
    // Typography
    'bs-font-sans-serif': 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  },
  dark: {
    'bs-body-bg': '#212121',
    'bs-body-color': '#f8f9fa',
    'sidebar-bg': '#18191a',
    'bs-toggle-sidebar-open-bg': '#ffffff',
    'bs-toggle-sidebar-close-bg': '#ffffff',
    'bs-profile-dropdown-bg': '#2F2F2F',
    'bs-profile-dropdown-border-bg': '#4a4a4a',
    'bs-dropdown-row-hover-bg': '#4a4a4a',
    'bs-btn-primary-bg': '#6c757d',
    'bs-btn-primary-color': '#ffffff',
    'bs-link-hover-color': '#789',
    'bs-background-color': '#000000',
    'bs-msg-bg': '#212121',
    'bs-msg-bubble-bg': '#2F2F2F',
    'bs-msg-bubble-loading-bg': '#2F2F2F',
    'bs-msg-bar-bg': '#2F2F2F',
    'bs-textarea-color': '#ffffff',
    'bs-active-btn-bg': '#ffffff',
    'bs-table-header-color': '#2F2F2F',
    'bs-table-header-data-color' : '#ffffff',
    'bs-table-border-color': '#4a4a4a',
    'bs-table-button-color': '#ffffff',
    'bs-table-data-color': '#ffffff',
    'sidebar-text-color': '#ffffff',
    'sidebar-text-color-active': 'grey',
    // Typography
    'bs-font-sans-serif': 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  }
};