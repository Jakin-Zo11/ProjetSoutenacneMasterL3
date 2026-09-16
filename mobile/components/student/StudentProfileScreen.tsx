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

const StudentProfileScreen: React.FC = () => {
  const studentData = {
    initials: 'RJ',
    name: 'Rakoto Jean',
    filiere: 'Master 1 - Informatique',
    matricule: 'MAT-2024-001',
    email: 'rakoto.jean@emit.mg',
    phone: '+261 34 00 000 00',
    promotion: '2024-2025',
    department: 'Département Informatique',
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D1F4E" />
      <TopBar title="Mon profil" showBackButton showNotification />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarInitials}>{studentData.initials}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.studentName}>{studentData.name}</Text>
            <Text style={styles.studentFiliere}>{studentData.filiere}</Text>
            <View style={styles.studentBadge}>
              <Text style={styles.studentBadgeText}>Étudiant</Text>
            </View>
          </View>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Informations personnelles</Text>
          
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Matricule</Text>
              <Text style={styles.infoValue}>{studentData.matricule}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{studentData.email}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Téléphone</Text>
              <Text style={styles.infoValue}>{studentData.phone}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Promotion</Text>
              <Text style={styles.infoValue}>{studentData.promotion}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Département</Text>
              <Text style={styles.infoValue}>{studentData.department}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>✏️ Modifier mon profil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.logoutButton]}>
            <Text style={styles.logoutButtonText}>🚪 Déconnexion</Text>
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
        activeTab="profile"
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
  profileHeader: {
    backgroundColor: '#0D1F4E',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2D84E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarInitials: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  profileInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  studentFiliere: {
    fontSize: 14,
    color: '#2D84E0',
    marginBottom: 8,
    fontFamily: 'Inter-Regular',
  },
  studentBadge: {
    backgroundColor: '#2D84E0',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  studentBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: -24,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0D1F4E',
    marginBottom: 20,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  infoRow: {
    marginBottom: 16,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    fontFamily: 'Inter-Regular',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0D1F4E',
    fontFamily: 'Inter-SemiBold',
  },
  actionButtons: {
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1A4BA8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A4BA8',
    fontFamily: 'Inter-SemiBold',
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    borderColor: '#EF4444',
  },
  logoutButtonText: {
    color: '#FFFFFF',
  },
});

export default StudentProfileScreen;
