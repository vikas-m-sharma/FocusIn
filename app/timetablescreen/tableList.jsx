





import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TableList = () => {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  // Fetch tasks from AsyncStorage
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem('tasks');
        if (savedTasks) {
          setTasks(JSON.parse(savedTasks));
        }
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    };

    loadTasks();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Schedule</Text>

      {/* Create Task Button */}
      <Pressable
        onPress={() => router.push('/timeTableScreen/setTask')}
        style={({ pressed }) => [
          styles.createButton,
          { opacity: pressed ? 0.8 : 1 },
        ]}
      >
        <Text style={styles.buttonText}>Create Task</Text>
      </Pressable>

      {/* Display the list of tasks */}
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.taskContainer}>
            {/* Time Display */}
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{item.startTime}</Text>
            </View>

            {/* Task Name */}
            <Text style={styles.taskTitle}>{item.taskName}</Text>

            {/* Days */}
            <Text style={styles.taskDays}>
              {item.days.length > 0 ? item.days.join(', ') : 'Not scheduled'}
            </Text>

            {/* Task Description */}
            {item.description && <Text style={styles.taskDescription}>{item.description}</Text>}
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.taskList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#F4F5F7', // Apple-like soft background color
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#333', // Dark text for clarity
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  createButton: {
    marginTop: 20,
    backgroundColor: '#007BFF', // Professional blue color for button
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 50, // Rounded edges for modern look
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4, // Light shadow for floating effect
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  taskList: {
    marginTop: 20,
  },
  taskContainer: {
    backgroundColor: '#fff', // White background for each task
    padding: 20,
    marginVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D1D1D6', // Apple-style light border
    elevation: 4, // Soft shadow for depth
  },
  timeContainer: {
    backgroundColor: '#007AFF', // Apple-style blue for time container
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  timeText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff', // White text for contrast
  },
  taskTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333', // Dark text for clarity
    marginBottom: 8,
  },
  taskDescription: {
    fontSize: 14,
    color: '#777', // Slightly lighter color for description
    marginTop: 6,
  },
  taskDays: {
    fontSize: 16,
    color: '#999', // Light gray color for day text
    marginTop: 4,
  },
});

export default TableList;
