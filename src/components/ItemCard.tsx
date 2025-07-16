// src/components/ItemCard.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// 定义组件期望接收的数据类型
export interface ItemData {
  _id: string;
  name: string;
  price: number;
  // 以后可以加上 user, image 等字段
}

interface ItemCardProps {
  item: ItemData;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <View style={styles.card}>
      {/* 临时的图片占位符 */}
      <View style={styles.imagePlaceholder} />
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.price}>¥ {item.price.toFixed(2)}</Text>
        {/* 以后可以加入用户信息 */}
        <Text style={styles.user}>发布者: 暂无</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    margin: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  imagePlaceholder: {
    width: '100%',
    height: 120,
    backgroundColor: '#e0e0e0',
  },
  infoContainer: {
    padding: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  user: {
    fontSize: 12,
    color: '#888',
    marginTop: 6,
  }
});

export default ItemCard;