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

interface EvaluationItemProps {
  studentName: string;
  studentMatricule: string;
  role: string;
  date: string;
  room: string;
  status: string;
}

interface JuryHomeScreenProps {
  onNavigate: (screen: string) => void;
  onExit: () => void;
}

const EvaluationItem: React.FC<EvaluationItemProps & { onPress: () => void }> = ({ studentName, studentMatricule, role, date, room, status, onPress }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'À évaluer': return '#EAF4FF';
      case 'Évalué': return '#0D1F4E';
      default: return '#EAF4FF';
    }
  };

  const getStatusTextColor = () => {
    switch (status) {
      case 'À évaluer': return '#1A4BA8';
      case 'Évalué': return '#FFFFFF';
      default: return '#1A4BA8';
    }
  };

  return (
    <TouchableOpacity style={styles.evaluationItem} onPress={onPress}>
      <View style={styles.evaluationAvatar}>
        <Text style={styles.evaluationAvatarText}>{studentName.charAt(0)}</Text>
      </View>
      <View style={styles.evaluationInfo}>
        <Text style={styles.evaluationStudentName}>{studentName}</Text>
        <Text style={styles.evaluationMatricule}>{studentMatricule}</Text>
        <View style={styles.evaluationMeta}>
          <Text style={styles.evaluationRole}>{role}</Text>
          <Text style={styles.evaluationDate}>{date}</Text>
          <Text style={styles.evaluationRoom}>{room}</Text>
        </View>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
        <Text style={[styles.statusBadgeText, { color: getStatusTextColor() }]}>{status}</Text>
      </View>
    </TouchableOpacity>
  );
};

const JuryHomeScreen: React.FC<JuryHomeScreenProps> = ({ onNavigate, onExit }) => {
  const juryData = {
    name: 'Prof. Randriamanana',
    grade: 'Maître de Conférences',
    establishment: 'EMIT Fianarantsoa',
    stats: {
      assigned: 8,
      toEvaluate: 3,
      completed: 5,
    },
  };

  const upcomingEvaluations = [
    {
      studentName: 'Rakoto Jean',
      studentMatricule: 'MAT-2024-001',
      role: 'Président',
      date: '20 Déc 2024',
      room: 'Salle A101',
      status: 'À évaluer',
    },
    {
      studentName: 'Rasoa Marie',
      studentMatricule: 'MAT-2024-002',
      role: 'Rapporteur',
      date: '21 Déc 2024',
      room: 'Salle B203',
      status: 'À évaluer',
    },
    {
      studentName: 'Andriamanitra Paul',
      studentMatricule: 'MAT-2024-003',
      role: 'Examinateur',
      date: '22 Déc 2024',
      room: 'Salle C305',
      status: 'À évaluer',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D1F4E" />
      <TopBar title="EMIT" showBackButton onBackPress={onExit} showNotification />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.juryName}>{juryData.name}</Text>
            <Text style={styles.juryGrade}>{juryData.grade}</Text>
            <Text style={styles.juryEstablishment}>{juryData.establishment}</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{juryData.stats.assigned}</Text>
            <Text style={styles.statLabel}>Jury assignés</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{juryData.stats.toEvaluate}</Text>
            <Text style={styles.statLabel}>À évaluer</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{juryData.stats.completed}</Text>
            <Text style={styles.statLabel}>Terminées</Text>
          </View>
        </View>

        {/* Upcoming Evaluations */}
        <View style={styles.evaluationsSection}>
          <Text style={styles.sectionTitle}>Prochaines évaluations</Text>
          <View style={styles.evaluationsList}>
            {upcomingEvaluations.map((evaluation, index) => (
              <EvaluationItem key={index} {...evaluation} onPress={() => onNavigate('jury-defense')} />
            ))}
          </View>
        </View>
      </ScrollView>

      <BottomNav
        items={[
          { id: 'home', icon: '🏠', label: 'Accueil' },
          { id: 'students', icon: '🎓', label: 'Étudiants' },
          { id: 'history', icon: '📋', label: 'Historique' },
        ]}
        activeTab="home"
        onTabChange={(tab) => onNavigate(tab === 'students' ? 'jury-students' : 'jury-history')}
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
  juryName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  juryGrade: {
    fontSize: 16,
    color: '#2D84E0',
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
  },
  juryEstablishment: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: -24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0D1F4E',
    marginBottom: 4,
    fontFamily: 'JetBrainsMono-Bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  evaluationsSection: {
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
  evaluationsList: {
    gap: 12,
  },
  evaluationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  evaluationAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EAF4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  evaluationAvatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0D1F4E',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  evaluationInfo: {
    flex: 1,
  },
  evaluationStudentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0D1F4E',
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
  },
  evaluationMatricule: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
    fontFamily: 'Inter-Regular',
  },
  evaluationMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  evaluationRole: {
    fontSize: 12,
    color: '#1A4BA8',
    fontFamily: 'Inter-SemiBold',
  },
  evaluationDate: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  evaluationRoom: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
});

export default JuryHomeScreen;
