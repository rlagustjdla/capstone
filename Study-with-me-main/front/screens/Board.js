import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, Dimensions, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// 타입스크립트 타입 제거 및 더미 데이터 정의
const dummyData = [
  { id: '1', title: '첫 번째 게시글', createdAt: '2025-06-02 10:30', category: 'Q&A' },
  { id: '2', title: '두 번째 게시글', createdAt: '2025-06-02 12:15', category: 'NOTICE' },
  { id: '3', title: '세 번째 게시글', createdAt: '2025-06-02 14:45', category: '자유' },
  { id: '4', title: '네 번째 게시글', createdAt: '2025-06-03 09:00', category: 'Q&A' },
  { id: '5', title: '다섯 번째 게시글', createdAt: '2025-06-03 10:00', category: 'NOTICE' },
];

const Board = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('Q&A');

  const filteredData = dummyData.filter(item => item.category === selectedCategory);

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.id}</Text>
      <Text style={styles.tableCell}>{item.title}</Text>
      <Text style={styles.tableCell}>{item.createdAt}</Text>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>현재 작성된 게시글이 없습니다</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* 상단 study_name 헤더 */}
        <View style={styles.studyNameContainer}>
          <Text style={styles.studyName}>study_name</Text>
        </View>

        {/* 게시판 영역 */}
        <View style={styles.boardContainer}>
          <Text style={styles.boardTitle}>게시판</Text>

          {/* 탭 */}
          <View style={styles.tabsContainer}>
            {['NOTICE', 'Q&A', '자유'].map(cat => (
              <TouchableOpacity key={cat} onPress={() => setSelectedCategory(cat)} style={{ flex: 1 }}>
                <Text style={[styles.tab, selectedCategory === cat && styles.activeTab]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* 테이블 헤더 */}
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>NO</Text>
            <Text style={styles.tableHeaderText}>제목</Text>
            <Text style={styles.tableHeaderText}>작성시간</Text>
          </View>

          {/* 게시글 리스트 */}
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            ListEmptyComponent={renderEmpty}
            keyExtractor={(item) => item.id}
          />

          {/* 검색 & 글쓰기 */}
          <View style={styles.searchWriteContainer}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="SEARCH"
                placeholderTextColor="#888"
              />
              <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
            </View>
            <TouchableOpacity
              style={styles.writeButton}
              onPress={() => navigation.navigate('BoardWrite')}
            >
              <Text style={styles.writeButtonText}>글쓰기</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 뒤로가기 버튼 */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>뒤로가기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f5f5' },
  container: { flex: 1 },
  studyNameContainer: {
    backgroundColor: '#0d2b40',
    paddingVertical: 20,
    alignItems: 'center',
  },
  studyName: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  boardContainer: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 16,
    padding: 10,
    flex: 1,
  },
  boardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
  },
  tab: { fontSize: 16, color: '#888', textAlign: 'center' },
  activeTab: { fontWeight: 'bold', color: '#000' },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 10,
  },
  tableHeaderText: { fontSize: 14, fontWeight: 'bold', flex: 1, textAlign: 'center' },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginHorizontal: 10,
  },
  tableCell: { flex: 1, textAlign: 'center' },
  emptyContainer: { padding: 20, alignItems: 'center' },
  emptyText: { color: '#888', fontSize: 16 },
  searchWriteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 10,
    flex: 1,
    marginRight: 10,
  },
  searchInput: { flex: 1, height: 40, color: '#000' },
  searchIcon: { marginLeft: 5 },
  writeButton: {
    backgroundColor: '#0d2b40',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  writeButtonText: { color: '#fff', fontSize: 14 },
  backButton: {
    backgroundColor: '#0d2b40',
    paddingVertical: 20,
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  backButtonText: { color: '#fff', fontSize: 16 },
});

export default Board;







