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

interface ShortcutCardProps {
  icon: string;
  title: string;
  onPress: () => void;
}

const ShortcutCard: React.FC<ShortcutCardProps> = ({ icon, title, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.shortcutCard}>
    <View style={styles.shortcutIcon}>
      <Text style={styles.shortcutIconText}>{icon}</Text>
    </View>
    <Text style={styles.shortcutTitle}>{title}</Text>
  </TouchableOpacity>
);

const StudentHomeScreen: React.FC = () => {
  const studentData = {
    name: 'Rakoto Jean',
    matricule: 'MAT-2024-001',
    daysUntilDefense: 5,
    defenseDate: '20 Déc 2024',
    defenseTime: '09:00',
    defenseRoom: 'Salle A101',
    defenseStatus: 'Confirmée',
  };

  const shortcuts = [
    { icon: '📅', title: 'Ma soutenance' },
    { icon: '📄', title: 'Ma convocation' },
    { icon: '📚', title: 'Mon sujet de thèse' },
    { icon: '📊', title: 'Mon résultat' },
    { icon: '📝', title: 'PV de soutenance' },
    { icon: '🔔', title: 'Notifications' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D1F4E" />
      <TopBar title="EMIT" showNotification />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.studentName}>{studentData.name}</Text>
              <Text style={styles.studentMatricule}>{studentData.matricule}</Text>
            </View>
            <View style={styles.defenseBadge}>
              <Text style={styles.defenseBadgeText}>Soutenance dans {studentData.daysUntilDefense} jours</Text>
            </View>
          </View>
        </View>

        {/* Defense Info Card */}
        <View style={styles.defenseCard}>
          <View style={styles.defenseInfoRow}>
            <View style={styles.defenseInfoItem}>
              <Text style={styles.defenseInfoLabel}>Date</Text>
              <Text style={styles.defenseInfoValue}>{studentData.defenseDate}</Text>
            </View>
            <View style={styles.defenseInfoItem}>
              <Text style={styles.defenseInfoLabel}>Heure</Text>
              <Text style={styles.defenseInfoValue}>{studentData.defenseTime}</Text>
            </View>
          </View>
          <View style={styles.defenseInfoRow}>
            <View style={styles.defenseInfoItem}>
              <Text style={styles.defenseInfoLabel}>Salle</Text>
              <Text style={styles.defenseInfoValue}>{studentData.defenseRoom}</Text>
            </View>
            <View style={styles.defenseInfoItem}>
              <Text style={styles.defenseInfoLabel}>Statut</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>{studentData.defenseStatus}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Notification Banner (if needed) */}
        {/* <View style={styles.notificationBanner}>
          <Text style={styles.notificationBannerText}>⚠️ Votre soutenance a été reprogrammée</Text>
        </View> */}

        {/* Shortcuts */}
        <View style={styles.shortcutsSection}>
          <Text style={styles.sectionTitle}>Raccourcis</Text>
          <View style={styles.shortcutsGrid}>
            {shortcuts.map((shortcut, index) => (
              <ShortcutCard key={index} {...shortcut} onPress={() => {}} />
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
        onTabChange={() => {}}
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
});

export default StudentHomeScreen;
