import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

interface NavItem {
  id: string;
  icon: string;
  label: string;
}

interface BottomNavProps {
  items: NavItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ items, activeTab, onTabChange }) => {
  return (
    <View style={styles.container}>
      {items.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <TouchableOpacity
            key={item.id}
            onPress={() => onTabChange(item.id)}
            style={styles.navItem}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              <Text style={[styles.icon, isActive && styles.iconActive]}>{item.icon}</Text>
              {isActive && <View style={styles.activeIndicator} />}
            </View>
            <Text style={[styles.label, isActive && styles.labelActive]}>{item.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EAF4FF',
    paddingHorizontal: 8,
    paddingVertical: 8,
    paddingBottom: 16,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 4,
  },
  icon: {
    fontSize: 24,
    color: '#6B7280',
  },
  iconActive: {
    color: '#1A4BA8',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -4,
    left: '50%',
    transform: [{ translateX: -50 }],
    width: 20,
    height: 3,
    backgroundColor: '#2D84E0',
    borderRadius: 2,
  },
  label: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  labelActive: {
    color: '#1A4BA8',
    fontWeight: '600',
  },
});

export default BottomNav;
