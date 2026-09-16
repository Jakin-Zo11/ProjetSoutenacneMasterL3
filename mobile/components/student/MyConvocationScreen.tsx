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

interface ScreenProps { onBack: () => void }

const MyConvocationScreen: React.FC<ScreenProps> = ({ onBack }) => {
  const convocationData = {
    studentName: 'Rakoto Jean',
    matricule: 'MAT-2024-001',
    thesisTitle: 'Système de gestion de soutenances en ligne pour l\'EMIT Fianarantsoa',
    director: 'Prof. Randriamanana',
    date: '20 Décembre 2024',
    time: '09:00',
    room: 'Salle A101',
    campus: 'Campus Principal',
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D1F4E" />
      <TopBar title="Ma convocation" showBackButton onBackPress={onBack} showNotification />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Convocation Document */}
        <View style={styles.convocationCard}>
          {/* Header */}
          <View style={styles.convocationHeader}>
            <Text style={styles.emitTitle}>EMIT</Text>
            <Text style={styles.emitSubtitle}>École de Management et d'Innovation Technologique</Text>
            <Text style={styles.emitLocation}>Fianarantsoa, Madagascar</Text>
          </View>

          <View style={styles.divider} />

          {/* Document Title */}
          <View style={styles.documentTitleSection}>
            <Text style={styles.documentTitle}>CONVocation</Text>
            <Text style={styles.documentSubtitle}>Soutenance de mémoire de fin d'études</Text>
          </View>

          <View style={styles.divider} />

          {/* Student Info */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Étudiant</Text>
            <Text style={styles.studentName}>{convocationData.studentName}</Text>
            <Text style={styles.studentMatricule}>{convocationData.matricule}</Text>
          </View>

          {/* Thesis Info */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Intitulé du mémoire</Text>
            <Text style={styles.thesisTitle}>{convocationData.thesisTitle}</Text>
          </View>

          {/* Director */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Directeur de mémoire</Text>
            <Text style={styles.directorName}>{convocationData.director}</Text>
          </View>

          <View style={styles.divider} />

          {/* Schedule */}
          <View style={styles.scheduleSection}>
            <View style={styles.scheduleItem}>
              <Text style={styles.scheduleLabel}>Date</Text>
              <Text style={styles.scheduleValue}>{convocationData.date}</Text>
            </View>
            <View style={styles.scheduleItem}>
              <Text style={styles.scheduleLabel}>Heure</Text>
              <Text style={styles.scheduleValue}>{convocationData.time}</Text>
            </View>
            <View style={styles.scheduleItem}>
              <Text style={styles.scheduleLabel}>Salle</Text>
              <Text style={styles.scheduleValue}>{convocationData.room}</Text>
            </View>
            <View style={styles.scheduleItem}>
              <Text style={styles.scheduleLabel}>Campus</Text>
              <Text style={styles.scheduleValue}>{convocationData.campus}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Signature */}
          <View style={styles.signatureSection}>
            <Text style={styles.signatureLabel}>Signature du Directeur</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureName}>{convocationData.director}</Text>
          </View>

          <View style={styles.divider} />

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Document officiel - EMIT Fianarantsoa</Text>
            <Text style={styles.footerDate}>Généré le 15 Décembre 2024</Text>
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
  convocationCard: {
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
  convocationHeader: {
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
    marginBottom: 4,
  },
  emitLocation: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  divider: {
    height: 1,
    backgroundColor: '#EAF4FF',
    marginVertical: 16,
  },
  documentTitleSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  documentTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0D1F4E',
    fontFamily: 'PlusJakartaSans-ExtraBold',
    marginBottom: 4,
  },
  documentSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  section: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
    fontFamily: 'Inter-SemiBold',
  },
  studentName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0D1F4E',
    fontFamily: 'PlusJakartaSans-Bold',
    marginBottom: 4,
  },
  studentMatricule: {
    fontSize: 14,
    color: '#1A4BA8',
    fontFamily: 'Inter-SemiBold',
  },
  thesisTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0D1F4E',
    lineHeight: 24,
    fontFamily: 'Inter-SemiBold',
  },
  directorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0D1F4E',
    fontFamily: 'Inter-SemiBold',
  },
  scheduleSection: {
    gap: 12,
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scheduleLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  scheduleValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0D1F4E',
    fontFamily: 'Inter-SemiBold',
  },
  signatureSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  signatureLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
    fontFamily: 'Inter-Regular',
  },
  signatureLine: {
    width: 200,
    height: 1,
    backgroundColor: '#0D1F4E',
    marginBottom: 8,
  },
  signatureName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0D1F4E',
    fontFamily: 'Inter-SemiBold',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  footerDate: {
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

export default MyConvocationScreen;
