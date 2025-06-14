import React, { useState, useRef } from 'react';
import { Dimensions, View, Text, StyleSheet, TouchableOpacity, ScrollView, PanResponder, Animated, Image } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';

// 달력 한국어 설정
LocaleConfig.locales['ko'] = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘'
};
LocaleConfig.defaultLocale = 'ko';

const Studyroommain = ({ navigation }) => {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const fakeSchedules = {
    '2025-06-01': [{ id: 1, title: '스터디 회의', location: '도서관', start: '10:00', end: '12:00' }],
    '2025-06-03': [{ id: 2, title: '발표 연습', location: '스터디룸', start: '14:00', end: '16:00' }]
  };
  const selectedSchedules = fakeSchedules[selectedDate] || [];
  const fakeFiles = ['file_title1', 'file_title2', 'file_title3'];

  const fakePosts = [
    { id: 1, title: '자격증 시험 관련~~~', content: '다들 자격증 시험 준비하시나요?' },
    { id: 2, title: '다음 모임 일정', content: '다음 스터디 모임은 언제가 좋을까요?' },
    { id: 3, title: '스터디 자료 업로드', content: '자료 업로드했습니다. 참고하세요!' },
  ];

  // 채팅 버튼 위치 설정 (초기값)
  const initialX = Dimensions.get('window').width - 76;
  const initialY = Dimensions.get('window').height - 160;
  const [pan] = useState(new Animated.ValueXY({ x: initialX, y: initialY }));
  const lastOffset = useRef({ x: initialX, y: initialY }).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      pan.setValue({
        x: lastOffset.x + gestureState.dx,
        y: lastOffset.y + gestureState.dy
      });
    },
    onPanResponderRelease: (e, gestureState) => {
      lastOffset.x += gestureState.dx;
      lastOffset.y += gestureState.dy;
    }
  });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f5f6f7' }} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        {/* 헤더 */}
        <View style={styles.header}>
          <Text style={styles.title}>study_name</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => navigation.navigate('ScheduleAdd')}>
              <Image source={require('../assets/calendaradd.png')} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }}>
              <Ionicons name="menu-outline" size={24} color="white" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 달력 */}
        <Calendar
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: '#00adf5' },
            '2025-06-01': { marked: true },
            '2025-06-03': { marked: true }
          }}
          style={styles.calendar}
          theme={{ selectedDayBackgroundColor: '#00adf5', todayTextColor: '#00adf5' }}
          monthFormat={'yyyy년 M월'}
        />

        {/* 자료 공유 */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>자료 공유</Text>
          <TouchableOpacity onPress={() => navigation.navigate('FileShare')}>
            <Text style={styles.moreText}>+ MORE</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bigBox}>
          <ScrollView style={styles.fileList} nestedScrollEnabled={true}>
            {fakeFiles.map((file, idx) => (
              <View key={idx} style={styles.fileItem}>
                <Text>{file}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* 게시판 섹션 */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>게시판</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Board')}>
            <Text style={styles.moreText}>+ MORE</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bigBox}>
          <ScrollView style={styles.fileList} nestedScrollEnabled={true}>
            {fakePosts.map((post) => (
              <View key={post.id} style={styles.fileItem}>
                <Text style={{ fontWeight: 'bold' }}>{post.title}</Text>
                <Text>{post.content}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* 일정 */}
        <View style={styles.scheduleBox}>
          {selectedSchedules.length === 0 ? (
            <>
              <Ionicons name="calendar-outline" size={30} color="#777" />
              <Text style={styles.scheduleText}>일정이 없습니다</Text>
              <TouchableOpacity onPress={() => navigation.navigate('ScheduleAdd')} style={styles.addScheduleButton}>
                <Text style={styles.addScheduleText}>+ 일정 등록하기</Text>
              </TouchableOpacity>
            </>
          ) : (
            selectedSchedules.map((sch) => (
              <View key={sch.id} style={styles.scheduleCard}>
                <Text style={styles.scheduleTitle}>{sch.title}</Text>
                <Text>{`${sch.start}~${sch.end} (${sch.location})`}</Text>
              </View>
            ))
          )}
        </View>

        {/* 하단 네비게이션 */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navButton}>
            <Ionicons name="pie-chart-outline" size={24} color="white" />
            <Text style={styles.navText}>출석</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Ionicons name="calendar-outline" size={24} color="white" />
            <Text style={styles.navText}>시간표</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Ionicons name="home-outline" size={24} color="white" />
            <Text style={styles.navText}>홈</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Ionicons name="search-outline" size={24} color="white" />
            <Text style={styles.navText}>검색</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Ionicons name="location-outline" size={24} color="white" />
            <Text style={styles.navText}>장소 추천</Text>
          </TouchableOpacity>
        </View>

        {/* 드래그 가능한 채팅 버튼 */}
        <Animated.View style={[styles.chatButton, pan.getLayout()]} {...panResponder.panHandlers}>
          <Ionicons name="chatbubble-ellipses-outline" size={28} color="white" />
        </Animated.View>
      </View>
    </ScrollView>
  );
};

export default Studyroommain;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6f7', paddingTop: 35 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#001f3f', paddingHorizontal: 16, paddingVertical: 10 },
  title: { color: 'white', fontSize: 18 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  calendar: { margin: 10, borderRadius: 10 },
  bigBox: { height: 180, backgroundColor: 'white', borderRadius: 10, marginHorizontal: 10, marginBottom: 10, padding: 10 },
  fileList: { flex: 1 },
  fileItem: { backgroundColor: '#f7f7f7', padding: 10, marginBottom: 5, borderRadius: 5 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 16, marginTop: 10 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold' },
  moreText: { color: '#00adf5', fontWeight: 'bold' },
  scheduleBox: { backgroundColor: 'white', margin: 10, borderRadius: 10, padding: 10, alignItems: 'center' },
  scheduleCard: { marginBottom: 10, padding: 5, backgroundColor: '#e0f7ff', borderRadius: 5, width: '100%' },
  scheduleTitle: { fontWeight: 'bold', fontSize: 14 },
  scheduleText: { color: '#555', fontSize: 13 },
  addScheduleButton: { marginTop: 10, backgroundColor: '#00adf5', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 5 },
  addScheduleText: { color: 'white', fontWeight: 'bold' },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#001f3f', paddingVertical: 16, height: 80 },
  navButton: { alignItems: 'center' },
  navText: { color: 'white', fontSize: 12, marginTop: 2 },
  chatButton: { position: 'absolute', width: 56, height: 56, borderRadius: 28, backgroundColor: '#00adf5', justifyContent: 'center', alignItems: 'center', elevation: 5 }
});
