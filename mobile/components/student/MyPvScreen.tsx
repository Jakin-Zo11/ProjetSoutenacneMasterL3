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

const MyPvScreen: React.FC = () => {
  const pvData = {
    isAvailable: true,
  };

  if (!pvData.isAvailable) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0D1F4E" />
        <TopBar title="PV de soutenance" showBackButton showNotification />
        
        <View style={styles.waitingContainer}>
          <Text style={styles.waitingIcon}>📄</Text>
          <Text style={styles.waitingTitle}>PV non disponible</Text>
          <Text style={styles.waitingSubtitle}>
            Le procès-verbal sera disponible après la clôture de la soutenance
          </Text>
        </View>

        <BottomNav
          items={[
            { id: 'home', icon: '🏠', label: 'Accueil' },
            { id: 'defense', icon: '📅', label: 'Soutenance' },
            { id: 'thesis', icon: '📄', label: 'Thèse' },
            { id: 'profile', icon: '👤', label: 'Profil' },
          ]}
          activeTab="defense"
          onTabChange={() => {}}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D1F4E" />
      <TopBar title="PV de soutenance" showBackButton showNotification />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* PV Info Card */}
        <View style={styles.pvCard}>
          <View style={styles.pvHeader}>
            <Text style={styles.emitTitle}>EMIT</Text>
            <Text style={styles.emitSubtitle}>École de Management et d'Innovation Technologique</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.pvSection}>
            <Text style={styles.pvTitle}>PROCÈS-VERBAL DE SOUTENANCE</Text>
            <Text style={styles.pvSubtitle}>Mémoire de fin d'études - Master 1</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.pvInfo}>
            <Text style={styles.pvLabel}>Étudiant</Text>
            <Text style={styles.pvValue}>Rakoto Jean</Text>
            <Text style={styles.pvMatricule}>MAT-2024-001</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.pvInfo}>
            <Text style={styles.pvLabel}>Note finale</Text>
            <Text style={styles.pvGrade}>16.5 / 20</Text>
            <Text style={styles.pvMention}>Mention : Très Bien</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.pvInfo}>
            <Text style={styles.pvLabel}>Décision</Text>
            <View style={[styles.decisionBadge, styles.admitted]}>
              <Text style={styles.decisionBadgeText}>✓ ADMIS</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.pvFooter}>
            <Text style={styles.pvFooterText}>Document officiel - Signé électroniquement</Text>
            <Text style={styles.pvFooterDate}>Généré le 20 Décembre 2024</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>📥 Télécharger PDF</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>📤 Partager</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNav
        items={[
          { id: 'home', icon: '🏠', label: 'Accueil' },
          { id: 'defense', icon: '📅', label: 'Soutenance' },
          { id: 'thesis', icon: '📄', label: 'Thèse' },
          { id: 'profile', icon: '👤', label: 'Profil' },
        ]}
        activeTab="defense"
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
  waitingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  waitingIcon: {
    fontSize: 64,
    marginBottom: 24,
  },
  waitingTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0D1F4E',
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  waitingSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  pvCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 20,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  pvHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  emitTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0D1F4E',
    fontFamily: 'PlusJakartaSans-ExtraBold',
    marginBottom: 4,
  },
  emitSubtitle: {
    fontSize: 14,
    color: '#1A4BA8',
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
  },
  divider: {
    height: 1,
    backgroundColor: '#EAF4FF',
    marginVertical: 16,
  },
  pvSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  pvTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0D1F4E',
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans-ExtraBold',
    marginBottom: 4,
  },
  pvSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  pvInfo: {
    marginBottom: 16,
  },
  pvLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
    fontFamily: 'Inter-SemiBold',
  },
  pvValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0D1F4E',
    fontFamily: 'PlusJakartaSans-Bold',
    marginBottom: 4,
  },
  pvMatricule: {
    fontSize: 14,
    color: '#1A4BA8',
    fontFamily: 'Inter-SemiBold',
  },
  pvGrade: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0D1F4E',
    fontFamily: 'JetBrainsMono-Bold',
    marginBottom: 4,
  },
  pvMention: {
    fontSize: 16,
    color: '#1A4BA8',
    fontFamily: 'Inter-SemiBold',
  },
  decisionBadge: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  admitted: {
    backgroundColor: '#10B981',
  },
  decisionBadgeText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  pvFooter: {
    alignItems: 'center',
  },
  pvFooterText: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  pvFooterDate: {
    fontSize: 10,
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#1A4BA8',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#1A4BA8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1A4BA8',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A4BA8',
    fontFamily: 'Inter-SemiBold',
  },
});

export default MyPvScreen;
