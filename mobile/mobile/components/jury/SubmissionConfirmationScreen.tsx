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

const SubmissionConfirmationScreen: React.FC = () => {
  const evaluationData = {
    finalGrade: 14.8,
    decision: 'Admis',
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D1F4E" />
      <TopBar title="Confirmation" showBackButton />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Success Icon */}
        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <Text style={styles.successIconText}>✓</Text>
          </View>
          <Text style={styles.successTitle}>Évaluation soumise avec succès</Text>
          <Text style={styles.successSubtitle}>
            Votre évaluation a été enregistrée et transmise à l'administration
          </Text>
        </View>

        {/* Final Grade Card */}
        <View style={styles.gradeCard}>
          <Text style={styles.cardTitle}>Moyenne finale</Text>
          <View style={styles.gradeDisplay}>
            <Text style={styles.gradeValue}>{evaluationData.finalGrade}</Text>
            <Text style={styles.gradeMax}>/20</Text>
          </View>
          
          <View style={[styles.decisionBadge, styles.admitted]}>
            <Text style={styles.decisionBadgeText}>✓ {evaluationData.decision}</Text>
          </View>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Informations</Text>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Date de soumission</Text>
            <Text style={styles.infoValue}>20 Décembre 2024 à 10:30</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Statut</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>Soumis</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Prochaines étapes</Text>
            <Text style={styles.infoDescription}>
              L'évaluation sera consolidée avec les autres membres du jury pour déterminer la note finale et la mention.
            </Text>
          </View>
        </View>

        {/* Back Button */}
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>← Retour à la liste des étudiants</Text>
        </TouchableOpacity>
      </ScrollView>
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
  successContainer: {
    alignItems: 'center',
    padding: 40,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  successIconText: {
    fontSize: 40,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0D1F4E',
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  successSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  gradeCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 20,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
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
  gradeDisplay: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 24,
  },
  gradeValue: {
    fontSize: 64,
    fontWeight: '800',
    color: '#0D1F4E',
    fontFamily: 'JetBrainsMono-Bold',
  },
  gradeMax: {
    fontSize: 24,
    color: '#6B7280',
    marginLeft: 4,
    fontFamily: 'JetBrainsMono-Regular',
  },
  decisionBadge: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
  },
  admitted: {
    backgroundColor: '#10B981',
  },
  decisionBadgeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  infoCard: {
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
  infoItem: {
    marginBottom: 20,
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
  infoDescription: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
  },
  statusBadge: {
    backgroundColor: '#EAF4FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A4BA8',
    fontFamily: 'Inter-SemiBold',
  },
  backButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 18,
    marginHorizontal: 20,
    marginBottom: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1A4BA8',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A4BA8',
    fontFamily: 'Inter-SemiBold',
  },
});

export default SubmissionConfirmationScreen;
