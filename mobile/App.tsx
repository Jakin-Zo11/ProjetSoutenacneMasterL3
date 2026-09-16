import React, { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import StudentHomeScreen from './components/student/StudentHomeScreen';
import JuryHomeScreen from './components/jury/JuryHomeScreen';
import StudentLoginScreen from './components/student/StudentLoginScreen';
import JuryLoginScreen from './components/jury/JuryLoginScreen';

type MobileScreen = 'select' | 'student-login' | 'jury-login' | 'student' | 'jury';

export default function App() {
  const [screen, setScreen] = useState<MobileScreen>('select');

  if (screen === 'student-login') {
    return <StudentLoginScreen onSuccess={() => setScreen('student')} />;
  }

  if (screen === 'jury-login') {
    return <JuryLoginScreen onSuccess={() => setScreen('jury')} />;
  }

  if (screen === 'student') {
    return <StudentHomeScreen />;
  }

  if (screen === 'jury') {
    return <JuryHomeScreen />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0D1F4E" />
      <View style={styles.container}>
        <View style={styles.brandMark}>
          <Text style={styles.brandMarkText}>EM</Text>
        </View>
        <Text style={styles.brand}>EMIT</Text>
        <Text style={styles.title}>Espace soutenances</Text>
        <Text style={styles.subtitle}>
          Choisissez votre espace pour accéder aux informations de soutenance.
        </Text>

        <View style={styles.options}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Accéder à l'espace étudiant"
            onPress={() => setScreen('student-login')}
            style={({ pressed }) => [styles.option, pressed && styles.optionPressed]}
          >
            <Text style={styles.optionIcon}>🎓</Text>
            <View style={styles.optionCopy}>
              <Text style={styles.optionTitle}>Espace étudiant</Text>
              <Text style={styles.optionDescription}>
                Convocation, soutenance, sujet et résultats
              </Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Accéder à l'espace jury"
            onPress={() => setScreen('jury-login')}
            style={({ pressed }) => [styles.option, pressed && styles.optionPressed]}
          >
            <Text style={styles.optionIcon}>📋</Text>
            <View style={styles.optionCopy}>
              <Text style={styles.optionTitle}>Espace jury</Text>
              <Text style={styles.optionDescription}>
                Soutenances assignées et évaluations
              </Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        </View>

        <Text style={styles.footer}>EMIT Fianarantsoa · 2026</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0D1F4E',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  brandMark: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#2D84E0',
    borderRadius: 22,
    height: 88,
    justifyContent: 'center',
    width: 88,
  },
  brandMarkText: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
  },
  brand: {
    color: '#95C5F2',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 4,
    marginTop: 18,
    textAlign: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: '#C9D9EA',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 12,
    textAlign: 'center',
  },
  options: {
    gap: 14,
    marginTop: 34,
  },
  option: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    flexDirection: 'row',
    padding: 18,
  },
  optionPressed: {
    opacity: 0.8,
  },
  optionIcon: {
    fontSize: 28,
    marginRight: 14,
  },
  optionCopy: {
    flex: 1,
  },
  optionTitle: {
    color: '#0D1F4E',
    fontSize: 17,
    fontWeight: '800',
  },
  optionDescription: {
    color: '#667085',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },
  arrow: {
    color: '#2D84E0',
    fontSize: 30,
    marginLeft: 8,
  },
  footer: {
    color: '#8EADD0',
    fontSize: 12,
    marginTop: 40,
    textAlign: 'center',
  },
});
