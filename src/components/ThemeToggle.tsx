import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../theme/ThemeContext';

export function ThemeToggle() {
  const { mode, theme, setMode } = useAppTheme();

  return (
    <View style={styles.wrap}>
      <Text style={[styles.label, { color: theme.textLabel }]}>Appearance</Text>
      <View
        style={[
          styles.segGroup,
          {
            backgroundColor: theme.themeToggleBg,
            borderColor: theme.themeToggleBorder,
          },
        ]}
        accessibilityRole="radiogroup"
        accessibilityLabel="Color theme"
      >
        {(['light', 'dark'] as const).map((m) => {
          const active = mode === m;
          const label = m === 'light' ? 'Light' : 'Dark';
          return (
            <Pressable
              key={m}
              onPress={() => setMode(m)}
              hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
              style={({ pressed }) => [
                styles.seg,
                active && {
                  backgroundColor: theme.themeToggleActiveBg,
                },
                pressed && styles.segPressed,
              ]}
              accessibilityRole="radio"
              accessibilityState={{ checked: active, selected: active }}
              accessibilityLabel={`${label} theme`}
            >
              <Text
                style={[
                  styles.segText,
                  { color: theme.themeToggleText },
                  active && { color: theme.themeToggleActiveText },
                ]}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  segGroup: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    borderRadius: 12,
    borderWidth: 2,
    padding: 4,
  },
  seg: {
    flex: 1,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  segPressed: {
    opacity: 0.88,
  },
  segText: {
    fontSize: 15,
    fontWeight: '700',
  },
});
