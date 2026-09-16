import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import TopBar from '../common/TopBar';
import BottomNav from '../common/BottomNav';
import { StudentProfile } from './StudentLoginScreen';

interface ShortcutCardProps {
  icon: string;
  title: string;
  locked?: boolean;
  onPress: () => void;
}

interface StudentHomeScreenProps {
  student: StudentProfile;
  themeSubmitted: boolean;
  convocationReady: boolean;
  onNavigate: (screen: string) => void;
  onOpenTheme: () => void;
  onExit: () => void;
}

const ShortcutCard: React.FC<ShortcutCardProps> = ({ icon, title, locked, onPress }) => (
  <TouchableOpacity onPress={onPress} disabled={locked} style={[styles.shortcutCard, locked && styles.shortcutCardLocked]}>
    <View style={styles.shortcutIcon}>
      <Text style={styles.shortcutIconText}>{icon}</Text>
    </View>
    <Text style={styles.shortcutTitle}>{title}</Text>
    {locked ? <Text style={styles.lockedText}>Après soutenance</Text> : null}
  </TouchableOpacity>
);

const StudentHomeScreen: React.FC<StudentHomeScreenProps> = ({ student, themeSubmitted, convocationReady, onNavigate, onOpenTheme, onExit }) => {

  const shortcuts = [
    { icon: '📅', title: 'Ma soutenance', screen: 'student-defense', locked: !convocationReady },
    { icon: '📄', title: 'Ma convocation', screen: 'student-convocation', locked: !convocationReady },
    { icon: '📚', title: 'Mon sujet de thèse', screen: 'student-thesis' },
    { icon: '📊', title: 'Mon résultat', screen: 'student-result', locked: true },
    { icon: '📝', title: 'PV de soutenance', screen: 'student-pv', locked: true },
    { icon: '🔔', title: 'Notifications', screen: 'student-notifications', locked: true },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D1F4E" />
      <TopBar title="EMIT" showBackButton onBackPress={onExit} showNotification={convocationReady} onNotificationPress={() => onNavigate('student-notifications')} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.studentName}>{student.name}</Text>
              <Text style={styles.studentMatricule}>{student.matricule}</Text>
            </View>
            <View style={styles.defenseBadge}>
              <Text style={styles.defenseBadgeText}>{convocationReady ? 'Convocation disponible' : 'En attente de convocation'}</Text>
            </View>
          </View>
        </View>

        {/* Defense Info Card */}
        <View style={styles.defenseCard}>
          <View style={styles.defenseInfoRow}>
            <View style={styles.defenseInfoItem}>
              <Text style={styles.defenseInfoLabel}>Date</Text>
                <Text style={styles.defenseInfoValue}>{convocationReady ? '20 Décembre 2024' : 'À venir'}</Text>
            </View>
            <View style={styles.defenseInfoItem}>
              <Text style={styles.defenseInfoLabel}>Heure</Text>
                <Text style={styles.defenseInfoValue}>{convocationReady ? '09:00' : 'À définir'}</Text>
            </View>
          </View>
          <View style={styles.defenseInfoRow}>
            <View style={styles.defenseInfoItem}>
              <Text style={styles.defenseInfoLabel}>Salle</Text>
                <Text style={styles.defenseInfoValue}>{convocationReady ? 'Salle A101' : 'À définir'}</Text>
            </View>
            <View style={styles.defenseInfoItem}>
              <Text style={styles.defenseInfoLabel}>Statut</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>{convocationReady ? 'Confirmée' : 'Convocation attendue'}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.profileCard}>
          <Text style={styles.cardTitle}>Mon parcours</Text>
          <Text style={styles.profileName}>{student.name}</Text>
          <Text style={styles.profileMeta}>{student.email} · {student.status}</Text>
          <Text style={styles.profileValue}>{student.formation}</Text>
          <Text style={styles.profileMeta}>{student.promotion}</Text>
        </View>

        <View style={styles.themeCard}>
          <Text style={styles.cardTitle}>{themeSubmitted ? 'Thème validé' : 'Action requise'}</Text>
          <Text style={styles.themeDescription}>{themeSubmitted ? 'Votre thème est validé. La convocation sera disponible dans quelques instants.' : 'Vous devez renseigner votre thème de stage ou mémoire.'}</Text>
          {!themeSubmitted ? <TouchableOpacity style={styles.themeButton} onPress={onOpenTheme}><Text style={styles.themeButtonText}>Renseigner mon thème</Text></TouchableOpacity> : null}
        </View>

        {/* Notification Banner (if needed) */}
        {/* <View style={styles.notificationBanner}>
          <Text style={styles.notificationBannerText}>⚠️ Votre soutenance a été reprogrammée</Text>
        </View> */}

        {/* Shortcuts */}
        <View style={styles.shortcutsSection}>
          <Text style={styles.sectionTitle}>Raccourcis</Text>
          <View style={styles.shortcutsGrid}>
            {shortcuts.map((shortcut) => (
              <ShortcutCard key={shortcut.screen} {...shortcut} onPress={() => { if (!shortcut.locked) onNavigate(shortcut.screen); }} />
            ))}
          </View>
        </View>
      </ScrollView>

      <BottomNav
        items={[
          { id: 'home', icon: '🏠', label: 'Accueil' },
          { id: 'defense', icon: '📅', label: 'Soutenance' },
          { id: 'thesis', icon: '📄', label: 'Thèse' },
          { id: 'profile', icon: '👤', label: 'Profil' },
        ]}
        activeTab="home"
        onTabChange={(tab) => onNavigate(tab === 'defense' ? 'student-defense' : tab === 'thesis' ? 'student-thesis' : 'student-profile')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF4FF',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#0D1F4E',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  studentName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'PlusJakartaSans-Bold',
    marginBottom: 4,
  },
  studentMatricule: {
    fontSize: 14,
    color: '#2D84E0',
    fontFamily: 'Inter-Regular',
  },
  defenseBadge: {
    backgroundColor: '#2D84E0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  defenseBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  defenseCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -24,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 16,
    padding: 20,
  },
  themeCard: {
    backgroundColor: '#FFF8E8',
    borderColor: '#F2D18A',
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 20,
    marginTop: 16,
    padding: 20,
  },
  cardTitle: {
    color: '#0D1F4E',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  profileName: {
    color: '#0D1F4E',
    fontSize: 18,
    fontWeight: '700',
  },
  profileValue: {
    color: '#1A4BA8',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 14,
  },
  profileMeta: {
    color: '#667085',
    fontSize: 12,
    marginTop: 4,
  },
  themeDescription: {
    color: '#6B4E16',
    fontSize: 13,
    lineHeight: 19,
  },
  themeButton: {
    alignItems: 'center',
    backgroundColor: '#E5B45F',
    borderRadius: 10,
    marginTop: 14,
    paddingVertical: 12,
  },
  themeButtonText: {
    color: '#0D1F4E',
    fontSize: 13,
    fontWeight: '700',
  },
  defenseInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  defenseInfoItem: {
    flex: 1,
  },
  defenseInfoLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    fontFamily: 'Inter-Regular',
  },
  defenseInfoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0D1F4E',
    fontFamily: 'Inter-SemiBold',
  },
  statusBadge: {
    backgroundColor: '#EAF4FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A4BA8',
    fontFamily: 'Inter-SemiBold',
  },
  notificationBanner: {
    backgroundColor: '#FEF3C7',
    marginHorizontal: 20,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  notificationBannerText: {
    fontSize: 14,
    color: '#92400E',
    fontFamily: 'Inter-Regular',
  },
  shortcutsSection: {
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0D1F4E',
    marginBottom: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  shortcutsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  shortcutCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  shortcutCardLocked: {
    opacity: 0.48,
  },
  shortcutIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#EAF4FF',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  shortcutIconText: {
    fontSize: 24,
  },
  shortcutTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0D1F4E',
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
  },
  lockedText: {
    color: '#667085',
    fontSize: 10,
    marginTop: 5,
    textAlign: 'center',
  },
});

export default StudentHomeScreen;
