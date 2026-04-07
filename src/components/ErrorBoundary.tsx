import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../theme/ThemeContext';

type Props = {
  children: ReactNode;
};

type State = {
  error: Error | null;
};

type FallbackProps = {
  error: Error;
  onReset: () => void;
};

function ErrorFallback({ error, onReset }: FallbackProps) {
  const { theme } = useAppTheme();

  return (
    <View style={[styles.wrap, { backgroundColor: theme.errorBg }]}>
      <Text style={[styles.title, { color: theme.errorTitle }]}>
        Something went wrong
      </Text>
      <Text style={[styles.detail, { color: theme.errorDetail }]}>
        {error.message}
      </Text>
      <Text style={[styles.hint, { color: theme.errorHint }]}>
        Check the Metro terminal for a full stack trace.
      </Text>
      <Pressable
        onPress={onReset}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: theme.errorButton },
          pressed && styles.buttonPressed,
        ]}
        accessibilityRole="button"
        accessibilityLabel="Try again"
      >
        <Text style={[styles.buttonLabel, { color: theme.errorButtonText }]}>
          Try again
        </Text>
      </Pressable>
    </View>
  );
}

/**
 * Catches render errors, logs message + stack + component stack to Metro,
 * and shows a minimal recovery UI.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error(
      '[ErrorBoundary]',
      error.message,
      error.stack ?? '(no stack)',
      '\nComponent stack:',
      info.componentStack
    );
  }

  private reset = (): void => {
    this.setState({ error: null });
  };

  render(): ReactNode {
    if (this.state.error) {
      return (
        <ErrorFallback error={this.state.error} onReset={this.reset} />
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  detail: {
    fontSize: 15,
    marginBottom: 8,
  },
  hint: {
    fontSize: 14,
    marginBottom: 20,
  },
  button: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  buttonPressed: {
    opacity: 0.88,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
});
