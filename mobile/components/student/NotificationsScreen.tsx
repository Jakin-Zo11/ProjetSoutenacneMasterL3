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

interface NotificationItemProps {
  type: 'reprogrammed' | 'cancelled' | 'info';
  title: string;
  timestamp: string;
  description: string;
  details?: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ type, title, timestamp, description, details }) => {
  const getBadgeColor = () => {
    switch (type) {
      case 'reprogrammed': return '#2D84E0';
      case 'cancelled': return '#EF4444';
      case 'info': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getBadgeText = () => {
    switch (type) {
      case 'reprogrammed': return 'Reprogrammée';
      case 'cancelled': return 'Annulée';
      case 'info': return 'Info';
      default: return 'Info';
    }
  };

  return (
    <View style={styles.notificationItem}>
      <View style={[styles.notificationDot, { backgroundColor: getBadgeColor() }]} />
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <View style={[styles.typeBadge, { backgroundColor: getBadgeColor() }]}>
            <Text style={styles.typeBadgeText}>{getBadgeText()}</Text>
          </View>
          <Text style={styles.timestamp}>{timestamp}</Text>
        </View>
        <Text style={styles.notificationTitle}>{title}</Text>
        <Text style={styles.notificationDescription}>{description}</Text>
        {details && (
          <View style={styles.detailsCard}>
            <Text style={styles.detailsText}>{details}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

interface ScreenProps { onBack: () => void; convocationReady: boolean; defenseCompleted?: boolean }

const NotificationsScreen: React.FC<ScreenProps> = ({ onBack, convocationReady, defenseCompleted = false }) => {
  const notifications = convocationReady ? [
    {
      type: 'info' as const,
      title: 'Convocation disponible',
      timestamp: 'À l\'instant',
      description: 'Votre convocation officielle et les détails de votre soutenance sont disponibles.',
      details: '20 Décembre 2024 à 09:00 · Salle A101',
    },
    ...(defenseCompleted ? [{
      type: 'info' as const,
      title: 'Résultat et PV disponibles',
      timestamp: 'À l\'instant',
      description: 'Votre PV de soutenance et votre résultat sont maintenant disponibles.',
    }] : []),
  ] : [];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D1F4E" />
      <TopBar title="Notifications" showBackButton onBackPress={onBack} showNotification />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.notificationsList}>
          {notifications.length ? notifications.map((notification, index) => (
            <NotificationItem key={index} {...notification} />
          )) : <Text style={styles.emptyText}>Aucune notification pour le moment. La convocation apparaîtra après la préparation de votre soutenance.</Text>}
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
  notificationsList: {
    padding: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  notificationDot: {
    width: 4,
    borderRadius: 2,
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  timestamp: {
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0D1F4E',
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
  },
  notificationDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
  },
  detailsCard: {
    backgroundColor: '#EAF4FF',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  detailsText: {
    fontSize: 13,
    color: '#1A4BA8',
    lineHeight: 18,
    fontFamily: 'Inter-Regular',
  },
  emptyText: {
    color: '#667085',
    fontSize: 14,
    lineHeight: 21,
    padding: 20,
    textAlign: 'center',
  },
});

export default NotificationsScreen;
