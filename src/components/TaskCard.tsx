// src/components/TaskCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface TaskData {
  _id: string;
  type: string;
  detail: string;
  reward: number;
  status: string;
}

interface TaskCardProps {
  task: TaskData;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.type}>{task.type}</Text>
        <Text style={styles.reward}>¥ {task.reward.toFixed(2)}</Text>
      </View>
      <Text style={styles.detail} numberOfLines={3}>{task.detail}</Text>
       <View style={styles.footer}>
        <Text style={styles.status}>{task.status}</Text>
        <Text style={styles.user}>发布者: 暂无</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 12,
        marginHorizontal: 16,
        marginVertical: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    type: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2980b9',
    },
    reward: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#e67e22',
    },
    detail: {
        fontSize: 14,
        color: '#34495e',
        lineHeight: 20,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        paddingTop: 8,
    },
    status: {
        fontSize: 12,
        color: '#27ae60',
    },
    user: {
        fontSize: 12,
        color: '#888',
    }
});

export default TaskCard;