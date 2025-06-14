import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const categories = ['Q&A', 'NOTICE', '자유'];

const BoardWrite = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Q&A');

  const handleSave = () => {
    Keyboard.dismiss(); // 키보드 닫기
    console.log('제목:', title);
    console.log('내용:', content);
    console.log('분류:', selectedCategory);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>study_name</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          {/* 제목 입력 */}
          <View style={styles.inputContainer}>
            <Text>제목</Text>
            <TextInput
              style={styles.titleInput}
              placeholder="제목을 입력하세요"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          {/* 분류 선택 */}
          <View style={styles.categoryContainer}>
            <Text>분류</Text>
            <View style={styles.categoryTabs}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryTab,
                    selectedCategory === cat && styles.activeCategoryTab,
                  ]}
                  onPress={() => setSelectedCategory(cat)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === cat && styles.activeCategoryText,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 내용 입력 */}
          <TextInput
            style={styles.contentInput}
            placeholder="내용을 입력하세요"
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
          />

          {/* 저장 버튼 */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>저장</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1 },
  headerContainer: {
    backgroundColor: '#0d2b40',
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  container: { flex: 1, padding: 16 },
  inputContainer: { marginVertical: 10 },
  titleInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginTop: 4,
  },
  categoryContainer: { marginVertical: 10 },
  categoryTabs: { flexDirection: 'row', marginTop: 4 },
  categoryTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginRight: 8,
  },
  activeCategoryTab: { backgroundColor: '#0d2b40' },
  categoryText: { color: '#000' },
  activeCategoryText: { color: '#fff' },
  contentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginTop: 10,
    minHeight: 200,
  },
  saveButton: {
    backgroundColor: '#0d2b40',
    paddingVertical: 20,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  saveButtonText: { color: '#fff', fontSize: 16 },
});

export default BoardWrite;
