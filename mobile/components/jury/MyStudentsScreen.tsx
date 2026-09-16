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

interface StudentCardProps {
  studentName: string;
  studentMatricule: string;
  date: string;
  role: string;
  status: string;
  onPress: () => void;
}

const StudentCard: React.FC<StudentCardProps> = ({ studentName, studentMatricule, date, role, status, onPress }) => {
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
    <TouchableOpacity onPress={onPress} style={styles.studentCard}>
      <View style={styles.studentAvatar}>
        <Text style={styles.studentAvatarText}>{studentName.charAt(0)}</Text>
      </View>
      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>{studentName}</Text>
        <Text style={styles.studentMatricule}>{studentMatricule}</Text>
        <View style={styles.studentMeta}>
          <Text style={styles.studentRole}>{role}</Text>
          <Text style={styles.studentDate}>{date}</Text>
        </View>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
        <Text style={[styles.statusBadgeText, { color: getStatusTextColor() }]}>{status}</Text>
      </View>
    </TouchableOpacity>
  );
};

const MyStudentsScreen: React.FC = () => {
  const students = [
    {
      studentName: 'Rakoto Jean',
      studentMatricule: 'MAT-2024-001',
      date: '20 Déc 2024',
      role: 'Président',
      status: 'À évaluer',
    },
    {
      studentName: 'Rasoa Marie',
      studentMatricule: 'MAT-2024-002',
      date: '21 Déc 2024',
      role: 'Rapporteur',
      status: 'À évaluer',
    },
    {
      studentName: 'Andriamanitra Paul',
      studentMatricule: 'MAT-2024-003',
      date: '22 Déc 2024',
      role: 'Examinateur',
      status: 'À évaluer',
    },
    {
      studentName: 'Rasolofomanana Luc',
      studentMatricule: 'MAT-2024-004',
      date: '18 Déc 2024',
      role: 'Président',
      status: 'Évalué',
    },
    {
      studentName: 'Ravelonarivo Fara',
      studentMatricule: 'MAT-2024-005',
      date: '17 Déc 2024',
      role: 'Rapporteur',
      status: 'Évalué',
    },
  ];

  const handleStudentPress = (studentName: string) => {
    console.log('Navigate to student details:', studentName);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D1F4E" />
      <TopBar title="Mes étudiants" showBackButton showNotification />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.studentsList}>
          {students.map((student, index) => (
            <StudentCard
              key={index}
              {...student}
              onPress={() => handleStudentPress(student.studentName)}
            />
          ))}
        </View>
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
  studentsList: {
    padding: 20,
    gap: 12,
  },
  studentCard: {
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
  studentAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EAF4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  studentAvatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0D1F4E',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0D1F4E',
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
  },
  studentMatricule: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
    fontFamily: 'Inter-Regular',
  },
  studentMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  studentRole: {
    fontSize: 12,
    color: '#1A4BA8',
    fontFamily: 'Inter-SemiBold',
  },
  studentDate: {
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

export default MyStudentsScreen;
