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

interface ScreenProps { onBack: () => void; onEvaluate: () => void }

const DefenseDetailsScreen: React.FC<ScreenProps> = ({ onBack, onEvaluate }) => {
  const defenseData = {
    studentName: 'Rakoto Jean',
    studentMatricule: 'MAT-2024-001',
    date: '20 Décembre 2024',
    time: '09:00',
    room: 'Salle A101',
    role: 'Président',
    thesisTitle: 'Système de gestion de soutenances en ligne pour l\'EMIT Fianarantsoa',
    director: 'Prof. Randriamanana',
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D1F4E" />
      <TopBar title="Détails soutenance" showBackButton onBackPress={onBack} showNotification />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Student Info Card */}
        <View style={styles.studentCard}>
          <View style={styles.studentAvatar}>
            <Text style={styles.studentAvatarText}>{defenseData.studentName.charAt(0)}</Text>
          </View>
          <View style={styles.studentInfo}>
            <Text style={styles.studentName}>{defenseData.studentName}</Text>
            <Text style={styles.studentMatricule}>{defenseData.studentMatricule}</Text>
          </View>
        </View>

        {/* Defense Info Card */}
        <View style={styles.defenseCard}>
          <Text style={styles.cardTitle}>Informations de soutenance</Text>
          
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Date</Text>
              <Text style={styles.infoValue}>{defenseData.date}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Heure</Text>
              <Text style={styles.infoValue}>{defenseData.time}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Salle</Text>
              <Text style={styles.infoValue}>{defenseData.room}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Rôle</Text>
              <View style={styles.roleBadge}>
                <Text style={styles.roleBadgeText}>{defenseData.role}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Thesis Card */}
        <View style={styles.thesisCard}>
          <Text style={styles.cardTitle}>Sujet de mémoire</Text>
          <Text style={styles.thesisTitle}>{defenseData.thesisTitle}</Text>
          <View style={styles.thesisMeta}>
            <Text style={styles.thesisLabel}>Directeur :</Text>
            <Text style={styles.thesisValue}>{defenseData.director}</Text>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity style={styles.evaluateButton} onPress={onEvaluate}>
          <Text style={styles.evaluateButtonText}>📝 Ouvrir le formulaire d'évaluation</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNav
        items={[
          { id: 'home', icon: '🏠', label: 'Accueil' },
          { id: 'students', icon: '🎓', label: 'Étudiants' },
          { id: 'history', icon: '📋', label: 'Historique' },
        ]}
        activeTab="students"
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
  studentCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 20,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  studentAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EAF4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  studentAvatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0D1F4E',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0D1F4E',
    marginBottom: 4,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  studentMatricule: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  defenseCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  thesisCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 24,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0D1F4E',
    marginBottom: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  roleBadge: {
    backgroundColor: '#EAF4FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  roleBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A4BA8',
    fontFamily: 'Inter-SemiBold',
  },
  thesisTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0D1F4E',
    lineHeight: 24,
    marginBottom: 16,
    fontFamily: 'Inter-SemiBold',
  },
  thesisMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  thesisLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  thesisValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0D1F4E',
    fontFamily: 'Inter-SemiBold',
  },
  evaluateButton: {
    backgroundColor: '#1A4BA8',
    borderRadius: 16,
    paddingVertical: 18,
    marginHorizontal: 20,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#1A4BA8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  evaluateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
});

export default DefenseDetailsScreen;
