import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from 'react-native';
import TopBar from '../common/TopBar';

interface CriterionProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

const Criterion: React.FC<CriterionProps> = ({ label, value, onChange }) => {
  return (
    <View style={styles.criterionContainer}>
      <View style={styles.criterionHeader}>
        <Text style={styles.criterionLabel}>{label}</Text>
        <View style={styles.criterionValue}>
          <Text style={styles.criterionValueText}>{value}</Text>
          <Text style={styles.criterionMax}>/20</Text>
        </View>
      </View>
      <View style={styles.sliderContainer}>
        <TouchableOpacity
          style={styles.sliderTrack}
          onPress={() => onChange(Math.max(0, value - 1))}
        >
          <View style={[styles.sliderFill, { width: `${(value / 20) * 100}%` }]} />
        </TouchableOpacity>
        <View style={styles.sliderControls}>
          <TouchableOpacity onPress={() => onChange(Math.max(0, value - 1))} style={styles.sliderButton}>
            <Text style={styles.sliderButtonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onChange(Math.min(20, value + 1))} style={styles.sliderButton}>
            <Text style={styles.sliderButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const EvaluationFormScreen: React.FC = () => {
  const [criteria, setCriteria] = useState({
    scientificQuality: 15,
    methodology: 14,
    presentation: 16,
    subjectMastery: 15,
    writtenReport: 14,
  });

  const [remarks, setRemarks] = useState('');
  const [decision, setDecision] = useState<'admis' | 'ajourne' | 'felicitations' | 'reserve'>('admis');

  const calculateAverage = () => {
    const values = Object.values(criteria);
    const sum = values.reduce((a, b) => a + b, 0);
    return (sum / values.length).toFixed(1);
  };

  const handleCriterionChange = (criterion: keyof typeof criteria, value: number) => {
    setCriteria(prev => ({ ...prev, [criterion]: value }));
  };

  const handleSubmit = () => {
    console.log('Evaluation submitted:', { criteria, remarks, decision });
  };

  const decisionOptions = [
    { value: 'admis', label: 'Admis' },
    { value: 'ajourne', label: 'Ajourné' },
    { value: 'felicitations', label: 'Félicitations' },
    { value: 'reserve', label: 'Réservé' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D1F4E" />
      <TopBar title="Formulaire d'évaluation" showBackButton />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Average Display */}
        <View style={styles.averageCard}>
          <Text style={styles.averageLabel}>Moyenne calculée</Text>
          <View style={styles.averageDisplay}>
            <Text style={styles.averageValue}>{calculateAverage()}</Text>
            <Text style={styles.averageMax}>/20</Text>
          </View>
        </View>

        {/* Criteria */}
        <View style={styles.criteriaCard}>
          <Text style={styles.cardTitle}>Critères d'évaluation</Text>
          
          <Criterion
            label="Qualité scientifique"
            value={criteria.scientificQuality}
            onChange={(value) => handleCriterionChange('scientificQuality', value)}
          />
          
          <Criterion
            label="Méthodologie"
            value={criteria.methodology}
            onChange={(value) => handleCriterionChange('methodology', value)}
          />
          
          <Criterion
            label="Présentation orale"
            value={criteria.presentation}
            onChange={(value) => handleCriterionChange('presentation', value)}
          />
          
          <Criterion
            label="Maîtrise du sujet"
            value={criteria.subjectMastery}
            onChange={(value) => handleCriterionChange('subjectMastery', value)}
          />
          
          <Criterion
            label="Rapport écrit"
            value={criteria.writtenReport}
            onChange={(value) => handleCriterionChange('writtenReport', value)}
          />
        </View>

        {/* Remarks */}
        <View style={styles.remarksCard}>
          <Text style={styles.cardTitle}>Remarques et commentaires</Text>
          <TextInput
            style={styles.remarksInput}
            value={remarks}
            onChangeText={setRemarks}
            placeholder="Saisissez vos remarques..."
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Decision Grid */}
        <View style={styles.decisionCard}>
          <Text style={styles.cardTitle}>Avis du jury</Text>
          <View style={styles.decisionGrid}>
            {decisionOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[styles.decisionOption, decision === option.value && styles.decisionOptionSelected]}
                onPress={() => setDecision(option.value as any)}
              >
                <Text style={[styles.decisionOptionText, decision === option.value && styles.decisionOptionTextSelected]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Soumettre l'évaluation</Text>
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
  averageCard: {
    backgroundColor: '#0D1F4E',
    margin: 20,
    marginTop: 20,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  averageLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
    fontFamily: 'Inter-Regular',
  },
  averageDisplay: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  averageValue: {
    fontSize: 48,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'JetBrainsMono-Bold',
  },
  averageMax: {
    fontSize: 24,
    color: '#2D84E0',
    marginLeft: 4,
    fontFamily: 'JetBrainsMono-Regular',
  },
  criteriaCard: {
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
  remarksCard: {
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
  decisionCard: {
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
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0D1F4E',
    marginBottom: 20,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  criterionContainer: {
    marginBottom: 20,
  },
  criterionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  criterionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0D1F4E',
    fontFamily: 'Inter-SemiBold',
  },
  criterionValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  criterionValueText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0D1F4E',
    fontFamily: 'JetBrainsMono-Bold',
  },
  criterionMax: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 2,
    fontFamily: 'JetBrainsMono-Regular',
  },
  sliderContainer: {
    gap: 8,
  },
  sliderTrack: {
    height: 8,
    backgroundColor: '#EAF4FF',
    borderRadius: 4,
    overflow: 'hidden',
  },
  sliderFill: {
    height: '100%',
    backgroundColor: '#1A4BA8',
    borderRadius: 4,
  },
  sliderControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EAF4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0D1F4E',
    fontFamily: 'JetBrainsMono-Bold',
  },
  remarksInput: {
    backgroundColor: '#EAF4FF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: '#0D1F4E',
    fontFamily: 'Inter-Regular',
    minHeight: 100,
  },
  decisionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  decisionOption: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#EAF4FF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  decisionOptionSelected: {
    backgroundColor: '#1A4BA8',
    borderColor: '#1A4BA8',
  },
  decisionOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0D1F4E',
    fontFamily: 'Inter-SemiBold',
  },
  decisionOptionTextSelected: {
    color: '#FFFFFF',
  },
  submitButton: {
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
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
});

export default EvaluationFormScreen;
