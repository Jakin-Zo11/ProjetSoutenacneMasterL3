import React, { useEffect, useState } from 'react';
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
import JuryLoginScreen from './components/jury/JuryLoginScreen';
import MyConvocationScreen from './components/student/MyConvocationScreen';
import MyDefenseScreen from './components/student/MyDefenseScreen';
import MyPvScreen from './components/student/MyPvScreen';
import MyResultScreen from './components/student/MyResultScreen';
import MyThesisScreen from './components/student/MyThesisScreen';
import NotificationsScreen from './components/student/NotificationsScreen';
import StudentProfileScreen from './components/student/StudentProfileScreen';
import StudentLoginScreen, { StudentProfile } from './components/student/StudentLoginScreen';
import StudentThemeScreen from './components/student/StudentThemeScreen';
import DefenseDetailsScreen from './components/jury/DefenseDetailsScreen';
import HistoryScreen from './components/jury/HistoryScreen';
import MyStudentsScreen from './components/jury/MyStudentsScreen';
import EvaluationFormScreen from './components/jury/EvaluationFormScreen';

type MobileScreen =
  | 'select' | 'student-access' | 'student-theme' | 'jury-login' | 'student' | 'jury'
  | 'student-defense' | 'student-convocation' | 'student-thesis'
  | 'student-result' | 'student-pv' | 'student-notifications' | 'student-profile'
  | 'jury-defense' | 'jury-history' | 'jury-students' | 'jury-evaluation';

export default function App() {
  const [screen, setScreen] = useState<MobileScreen>('select');
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [themeSubmitted, setThemeSubmitted] = useState(false);
  const [submittedTheme, setSubmittedTheme] = useState('');
  const [convocationReady, setConvocationReady] = useState(false);

  useEffect(() => {
    if (!themeSubmitted) {
      setConvocationReady(false);
      return;
    }
    const timer = setTimeout(() => setConvocationReady(true), 15000);
    return () => clearTimeout(timer);
  }, [themeSubmitted]);

  if (screen === 'student-access') {
    return <StudentLoginScreen onSuccess={(profile) => { setStudent(profile); setScreen('student'); }} onBack={() => setScreen('select')} />;
  }

  if (screen === 'jury-login') {
    return <JuryLoginScreen onSuccess={() => setScreen('jury')} onBack={() => setScreen('select')} />;
  }

  if (screen === 'student-theme') {
    return <StudentThemeScreen onBack={() => setScreen('student')} onSubmit={(theme) => { setSubmittedTheme(theme); setThemeSubmitted(true); setScreen('student'); }} />;
  }

  if (screen === 'jury') {
    return <JuryHomeScreen onNavigate={(nextScreen) => setScreen(nextScreen as MobileScreen)} onExit={() => setScreen('select')} />;
  }

  const goToStudentHome = () => setScreen('student');
  const goToJuryHome = () => setScreen('jury');

  if (screen === 'student-defense') return <MyDefenseScreen onBack={goToStudentHome} />;
  if (screen === 'student-convocation') return <MyConvocationScreen onBack={goToStudentHome} />;
  if (screen === 'student-thesis') return <MyThesisScreen submittedTheme={submittedTheme} onBack={goToStudentHome} />;
  if (screen === 'student-result') return <MyResultScreen onBack={goToStudentHome} />;
  if (screen === 'student-pv') return <MyPvScreen onBack={goToStudentHome} />;
  if (screen === 'student-notifications') return <NotificationsScreen convocationReady={convocationReady} onBack={goToStudentHome} />;
  if (screen === 'student-profile') return <StudentProfileScreen onBack={goToStudentHome} />;
  if (screen === 'jury-defense') return <DefenseDetailsScreen onBack={goToJuryHome} onEvaluate={() => setScreen('jury-evaluation')} />;
  if (screen === 'jury-history') return <HistoryScreen onBack={goToJuryHome} />;
  if (screen === 'jury-students') return <MyStudentsScreen onBack={goToJuryHome} />;
  if (screen === 'jury-evaluation') return <EvaluationFormScreen onBack={goToJuryHome} />;

  if (screen === 'student') {
    if (!student) {
      return <StudentLoginScreen onSuccess={(profile) => { setStudent(profile); setScreen('student'); }} onBack={() => setScreen('select')} />;
    }
    return <StudentHomeScreen student={student} themeSubmitted={themeSubmitted} convocationReady={convocationReady} onNavigate={(nextScreen) => setScreen(nextScreen as MobileScreen)} onOpenTheme={() => setScreen('student-theme')} onExit={() => { setStudent(null); setThemeSubmitted(false); setSubmittedTheme(''); setScreen('select'); }} />;
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
            onPress={() => setScreen('student-access')}
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
