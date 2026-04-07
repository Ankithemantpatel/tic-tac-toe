export type ThemeMode = 'light' | 'dark';

export type AppTheme = {
  mode: ThemeMode;
  background: string;
  textPrimary: string;
  textSecondary: string;
  textLabel: string;
  textBody: string;
  /** Cells */
  cellBg: string;
  cellBorder: string;
  cellWinningBg: string;
  cellWinningBorder: string;
  cellEmphasisBg: string;
  cellEmphasisBorder: string;
  mark: string;
  /** Turn indicator chips */
  turnChipBg: string;
  turnChipActiveBg: string;
  turnChipActiveBorder: string;
  turnChipText: string;
  turnChipTextActive: string;
  turnChipShadow: string;
  /** Generic picker chips */
  chipBg: string;
  chipText: string;
  markChipActiveBg: string;
  markChipActiveBorder: string;
  markChipTextActive: string;
  difficultyChipActiveBg: string;
  difficultyChipActiveBorder: string;
  difficultyChipTextActive: string;
  /** Primary actions */
  restartBg: string;
  restartText: string;
  themeToggleBg: string;
  themeToggleBorder: string;
  themeToggleText: string;
  themeToggleActiveBg: string;
  themeToggleActiveText: string;
  /** Win line */
  winningLine: string;
  winningLineShadow: string;
  /** Error boundary */
  errorBg: string;
  errorTitle: string;
  errorDetail: string;
  errorHint: string;
  errorButton: string;
  errorButtonText: string;
  statusBarStyle: 'light' | 'dark';
};

const light: AppTheme = {
  mode: 'light',
  background: '#f8fafc',
  textPrimary: '#0f172a',
  textSecondary: '#64748b',
  textLabel: '#334155',
  textBody: '#475569',
  cellBg: '#f0f4f8',
  cellBorder: '#c5d0dc',
  cellWinningBg: '#ecfdf5',
  cellWinningBorder: '#34d399',
  cellEmphasisBg: '#f0fdfa',
  cellEmphasisBorder: '#0d9488',
  mark: '#1e293b',
  turnChipBg: '#e2e8f0',
  turnChipActiveBg: '#ccfbf1',
  turnChipActiveBorder: '#0d9488',
  turnChipText: '#64748b',
  turnChipTextActive: '#0f766e',
  turnChipShadow: '#0f172a',
  chipBg: '#e2e8f0',
  chipText: '#334155',
  markChipActiveBg: '#0d9488',
  markChipActiveBorder: '#0f766e',
  markChipTextActive: '#ffffff',
  difficultyChipActiveBg: '#2563eb',
  difficultyChipActiveBorder: '#1d4ed8',
  difficultyChipTextActive: '#ffffff',
  restartBg: '#1e293b',
  restartText: '#f8fafc',
  themeToggleBg: '#e2e8f0',
  themeToggleBorder: '#cbd5e1',
  themeToggleText: '#334155',
  themeToggleActiveBg: '#0f172a',
  themeToggleActiveText: '#fafafa',
  winningLine: '#10b981',
  winningLineShadow: '#059669',
  errorBg: '#f8fafc',
  errorTitle: '#0f172a',
  errorDetail: '#b91c1c',
  errorHint: '#64748b',
  errorButton: '#0d9488',
  errorButtonText: '#ffffff',
  statusBarStyle: 'dark',
};

const dark: AppTheme = {
  mode: 'dark',
  background: '#000000',
  textPrimary: '#fafafa',
  textSecondary: '#a1a1aa',
  textLabel: '#d4d4d8',
  textBody: '#a1a1aa',
  cellBg: '#18181b',
  cellBorder: '#3f3f46',
  cellWinningBg: '#052e16',
  cellWinningBorder: '#22c55e',
  cellEmphasisBg: '#042f2e',
  cellEmphasisBorder: '#2dd4bf',
  mark: '#fafafa',
  turnChipBg: '#27272a',
  turnChipActiveBg: '#134e4a',
  turnChipActiveBorder: '#2dd4bf',
  turnChipText: '#a1a1aa',
  turnChipTextActive: '#5eead4',
  turnChipShadow: '#000000',
  chipBg: '#27272a',
  chipText: '#d4d4d8',
  markChipActiveBg: '#0f766e',
  markChipActiveBorder: '#14b8a6',
  markChipTextActive: '#ffffff',
  difficultyChipActiveBg: '#1d4ed8',
  difficultyChipActiveBorder: '#3b82f6',
  difficultyChipTextActive: '#ffffff',
  restartBg: '#fafafa',
  restartText: '#0a0a0a',
  themeToggleBg: '#27272a',
  themeToggleBorder: '#3f3f46',
  themeToggleText: '#e4e4e7',
  themeToggleActiveBg: '#fafafa',
  themeToggleActiveText: '#0a0a0a',
  winningLine: '#34d399',
  winningLineShadow: '#10b981',
  errorBg: '#0a0a0a',
  errorTitle: '#fafafa',
  errorDetail: '#f87171',
  errorHint: '#a1a1aa',
  errorButton: '#14b8a6',
  errorButtonText: '#042f2e',
  statusBarStyle: 'light',
};

export function getTheme(mode: ThemeMode): AppTheme {
  return mode === 'dark' ? dark : light;
}
