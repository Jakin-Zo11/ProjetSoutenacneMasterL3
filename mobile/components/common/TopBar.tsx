import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface TopBarProps {
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  showNotification?: boolean;
  onNotificationPress?: () => void;
}

const TopBar: React.FC<TopBarProps> = ({
  title,
  showBackButton = false,
  onBackPress,
  showNotification = true,
  onNotificationPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        {showBackButton ? (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
        ) : (
          <Image
            source={require('../../assets/images/emit-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        )}
        {title && <Text style={styles.title}>{title}</Text>}
      </View>
      {showNotification && (
        <TouchableOpacity onPress={onNotificationPress} style={styles.notificationButton}>
          <Text style={styles.notificationIcon}>🔔</Text>
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0D1F4E',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 36,
    height: 36,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  notificationButton: {
    padding: 8,
    position: 'relative',
  },
  notificationIcon: {
    fontSize: 20,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    backgroundColor: '#FF4444',
    borderRadius: 4,
  },
});

export default TopBar;
