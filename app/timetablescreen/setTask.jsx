





import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';

const SetTask = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [days, setDays] = useState([]);
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [mode, setMode] = useState('Normal');
  const [showTimePicker, setShowTimePicker] = useState({ isStart: false, visible: false });

  const router = useRouter();

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const toggleDay = (dayIndex) => {
    const dayName = dayNames[dayIndex];
    setDays((prevDays) =>
      prevDays.includes(dayName)
        ? prevDays.filter((day) => day !== dayName)
        : [...prevDays, dayName]
    );
  };

  // Helper function to format time in "1:00 PM" format
  const formatTime = (time) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return time ? new Date(time).toLocaleTimeString([], options) : 'Set Time';
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker({ ...showTimePicker, visible: false });
    if (selectedTime) {
      const formattedTime = new Date(selectedTime);
      if (showTimePicker.isStart) {
        setStartTime(formattedTime);
      } else {
        setEndTime(formattedTime);
      }
    }
  };

  const handleSaveTask = async () => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');
      if (!authToken) {
        Alert.alert('Error', 'User is not authenticated');
        return;
      }

      const taskData = {
        taskName,
        description,
        startTime: startTime ? startTime.toISOString() : null,
        endTime: endTime ? endTime.toISOString() : null,
        days,
        notificationEnabled,
        mode,
      };

      const response = await fetch('http://192.168.0.107:5001/api/tasks/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(taskData),
      });

      const data = await response.json();
      if (data.success) {
        Alert.alert('Success', 'Task created successfully');
         // Save the task to AsyncStorage (for local display)
      const savedTasks = await AsyncStorage.getItem('tasks');
      const tasks = savedTasks ? JSON.parse(savedTasks) : [];
      tasks.push(taskData);
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      

        router.push('timeTableScreen/tableList');
      } else {
        Alert.alert('Error', data.message || 'Task creation failed');
      }
    } catch (error) {
      console.error('Error creating task:', error.message);
      Alert.alert('Error', 'An error occurred while creating the task.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Set Task</Text>

      {/* Task Name */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter your task name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Task Name"
          value={taskName}
          onChangeText={setTaskName}
        />
      </View>

      {/* Description */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter your description</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Description (Optional)"
          value={description}
          onChangeText={setDescription}
        />
      </View>

      {/* Days Selection */}
      <View style={styles.daysContainer}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayButton,
              days.includes(dayNames[index]) && styles.selectedDayButton,
            ]}
            onPress={() => toggleDay(index)}
          >
            <Text
              style={[
                styles.dayText,
                days.includes(dayNames[index]) && styles.selectedDayText,
              ]}
            >
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Time Pickers */}
      <View style={styles.timeContainer}>
        <TouchableOpacity
          style={styles.timeButton}
          onPress={() => setShowTimePicker({ isStart: true, visible: true })}
        >
          <Text style={styles.timeButtonText}>
            Start: {formatTime(startTime)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.timeButton}
          onPress={() => setShowTimePicker({ isStart: false, visible: true })}
        >
          <Text style={styles.timeButtonText}>
            End: {formatTime(endTime)}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notification and Mode Selection */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.optionButton,
            notificationEnabled && styles.selectedOptionButton,
          ]}
          onPress={() => setNotificationEnabled(!notificationEnabled)}
        >
          <Text
            style={[
              styles.optionText,
              notificationEnabled && styles.selectedOptionText,
            ]}
          >
            Enable Notification
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionButton, mode === 'Alarm' && styles.selectedOptionButton]}
          onPress={() => setMode(mode === 'Normal' ? 'Alarm' : 'Normal')}
        >
          <Text
            style={[styles.optionText, mode === 'Alarm' && styles.selectedOptionText]}
          >
            {mode.toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Save Task Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveTask}>
        <Text style={styles.saveButtonText}>Save Task</Text>
      </TouchableOpacity>

      {/* Time Picker Modal */}
      {showTimePicker.visible && (
        <DateTimePicker
          mode="time"
          value={new Date()}
          is24Hour={true}
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#2E3A59',
    textAlign: 'center',
    marginBottom: 50,
  },
  inputContainer: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1c1c50',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: '#C4C4C4',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dayButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#C4C4C4',
    marginHorizontal: 5,
  },
  selectedDayButton: {
    backgroundColor: '#2E3A59',
    borderColor: '#2E3A59',
  },
  dayText: {
    fontSize: 16,
    color: '#333',
  },
  selectedDayText: {
    color: '#fff',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  timeButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C4C4C4',
    marginHorizontal: 5,
    backgroundColor: '#fff',
  },
  timeButtonText: {
    fontSize: 16,
    color: '#333',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C4C4C4',
    marginHorizontal: 5,
    backgroundColor: '#fff',
  },
  selectedOptionButton: {
    backgroundColor: '#2E3A59',
    borderColor: '#2E3A59',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#2E3A59',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
});

export default SetTask;







