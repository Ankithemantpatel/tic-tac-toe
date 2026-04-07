import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { Game } from './src/components/Game';
import { ThemeProvider, useAppTheme } from './src/theme/ThemeContext';

function AppShell() {
  const { theme } = useAppTheme();

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <StatusBar style={theme.statusBarStyle} />
      <ErrorBoundary>
        <Game />
      </ErrorBoundary>
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
