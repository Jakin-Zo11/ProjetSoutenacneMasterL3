import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import TopBar from '../common/TopBar';
import BottomNav from '../common/BottomNav';

interface HistoryItemProps {
  studentName: string;
  date: string;
  role: string;
  grade: string;
  status: string;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ studentName, date, role, grade, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Soumis': return '#10B981';
      case 'Archivé': return '#6B7280';
      default: return '#6B7280';
    }
  };

  return (
    <View style={styles.historyItem}>
      <View style={styles.historyInfo}>
        <Text style={styles.studentName}>{studentName}</Text>
        <View style={styles.historyMeta}>
          <Text style={styles.historyRole}>{role}</Text>
          <Text style={styles.historyDate}>{date}</Text>
        </View>
      </View>
      <View style={styles.historyGrades}>
        <Text style={styles.historyGrade}>{grade}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.statusBadgeText}>{status}</Text>
        </View>
      </View>
    </View>
  );
};

const HistoryScreen: React.FC = () => {
  const historyData = [
    {
      studentName: 'Rasolofomanana Luc',
      date: '18 Déc 2024',
      role: 'Président',
      grade: '16.5/20',
      status: 'Soumis',
    },
    {
      studentName: 'Ravelonarivo Fara',
      date: '17 Déc 2024',
      role: 'Rapporteur',
      grade: '15.0/20',
      status: 'Soumis',
    },
    {
      studentName: 'Rakotoson Jean',
      date: '15 Déc 2024',
      role: 'Examinateur',
      grade: '14.5/20',
      status: 'Archivé',
    },
    {
      studentName: 'Rasoa Marie',
      date: '10 Déc 2024',
      role: 'Président',
      grade: '17.0/20',
      status: 'Archivé',
    },
    {
      studentName: 'Andriamanitra Paul',
      date: '08 Déc 2024',
      role: 'Rapporteur',
      grade: '16.0/20',
      status: 'Archivé',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D1F4E" />
      <TopBar title="Historique" showBackButton showNotification />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.historyList}>
          {historyData.map((item, index) => (
            <HistoryItem key={index} {...item} />
          ))}
        </View>
      </ScrollView>

      <BottomNav
        items={[
          { id: 'home', icon: '🏠', label: 'Accueil' },
          { id: 'students', icon: '🎓', label: 'Étudiants' },
          { id: 'history', icon: '📋', label: 'Historique' },
        ]}
        activeTab="history"
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
  historyList: {
    padding: 20,
    gap: 12,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  historyInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0D1F4E',
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
  },
  historyMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  historyRole: {
    fontSize: 12,
    color: '#1A4BA8',
    fontFamily: 'Inter-SemiBold',
  },
  historyDate: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  historyGrades: {
    alignItems: 'flex-end',
  },
  historyGrade: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0D1F4E',
    marginBottom: 4,
    fontFamily: 'JetBrainsMono-Bold',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
});

export default HistoryScreen;
