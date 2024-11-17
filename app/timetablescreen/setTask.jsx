import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const SetTask = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [days, setDays] = useState([]);
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [mode, setMode] = useState('Normal'); // Options: "Normal" or "Alarm"
  const [showTimePicker, setShowTimePicker] = useState({ isStart: false, visible: false });

  const toggleDay = (day) => {
    setDays((prevDays) =>
      prevDays.includes(day) ? prevDays.filter((d) => d !== day) : [...prevDays, day]
    );
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker({ ...showTimePicker, visible: false });
    if (selectedTime) {
      showTimePicker.isStart ? setStartTime(selectedTime) : setEndTime(selectedTime);
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
        startTime: startTime?.toISOString(),
        endTime: endTime?.toISOString(),
        days,
        notificationEnabled,
        mode,
      };

      const response = await fetch('http://192.168.31.70/api/tasks/create', {
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
      <TextInput
        style={styles.input}
        placeholder="Enter Task Name"
        value={taskName}
        onChangeText={setTaskName}
      />

      {/* Description */}
      <TextInput
        style={styles.input}
        placeholder="Enter Description (Optional)"
        value={description}
        onChangeText={setDescription}
      />

      {/* Days Selection */}
      <View style={styles.daysContainer}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayButton,
              days.includes(index) && styles.selectedDayButton,
            ]}
            onPress={() => toggleDay(index)}
          >
            <Text style={[
              styles.dayText,
              days.includes(index) && styles.selectedDayText,
            ]}>{day}</Text>
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
            START: {startTime ? startTime.toLocaleTimeString() : 'Set Time'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.timeButton}
          onPress={() => setShowTimePicker({ isStart: false, visible: true })}
        >
          <Text style={styles.timeButtonText}>
            END: {endTime ? endTime.toLocaleTimeString() : 'Set Time'}
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
          <Text style={[
            styles.optionText,
            notificationEnabled && styles.selectedOptionText,
          ]}>ENABLE NOTIFICATION</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.optionButton,
            mode === 'Alarm' && styles.selectedOptionButton,
          ]}
          onPress={() => setMode(mode === 'Normal' ? 'Alarm' : 'Normal')}
        >
          <Text style={[
            styles.optionText,
            mode === 'Alarm' && styles.selectedOptionText,
          ]}>{mode.toUpperCase()}</Text>
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
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#81d4fa', // Light and simple background color
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#007BFF',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  selectedDayButton: {
    backgroundColor: '#007BFF',
  },
  dayText: {
    fontSize: 16,
    color: '#007BFF',
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
    marginHorizontal: 5,
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  timeButtonText: {
    fontSize: 16,
    color: '#333', // Darker text for visibility
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  optionButton: {
    flex: 1,
    marginHorizontal: 5,
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  selectedOptionButton: {
    backgroundColor: '#007BFF',
  },
  optionText: {
    fontSize: 14,
    color: '#007BFF',
  },
  selectedOptionText: {
    color: '#fff',
  },
  saveButton: {
    marginTop: 20,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007BFF',
  },
  saveButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SetTask;
