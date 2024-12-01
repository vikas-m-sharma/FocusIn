

import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import images from '../../constants/images';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { useRouter } from 'expo-router';
import { Link } from 'expo-router';
import axios from "axios";

const SignUp = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();

  const submit = async () => {
    setSubmitting(true);
    try {
      const response = await axios.post('http://192.168.0.107:5001/api/users/register', {
        name: form.name,
        email: form.email,
        password: form.password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 201) { // Check for successful creation
        router.push('/timetable');
      } else {
        alert(response.data.message || 'Registration failed!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred, please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <Image source={images.logo} resizeMode="contain" style={styles.logo} />
            <Text style={styles.title}>Sign Up your Account</Text> 

            <View style={styles.inputContainer}>
              <FormField
                title="Name"
                value={form.name}
                handleChangeText={(e) => setForm({ ...form, name: e })}
                otherStyles={styles.inputSpacing}
              />
              <FormField
                title="Email"
                value={form.email}
                handleChangeText={(e) => setForm({ ...form, email: e })}
                otherStyles={styles.inputSpacing}
                keyboardType="email-address"
              />
              <FormField
                title="Password"
                value={form.password}
                handleChangeText={(e) => setForm({ ...form, password: e })}
                otherStyles={styles.inputSpacing}
              />
            </View>

            <CustomButton
              title="Register"
              handlePress={submit}
              containerStyles={styles.buttonContainer}
              isLoading={isSubmitting}
              textStyle={styles.buttonText}
            />

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account ?</Text>
              <Link href="/sign-in" style={styles.signupLink}>
                Login
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  container: {
    flex: 1, // Take up the full height
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    width: '100%',
    paddingHorizontal: 20,
  },
  logo: {
    width: 500,
    height: 200,
    marginBottom: 20,
  },
  title: {
    color: '#f5f5f5',
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 10,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop:'5%'
  },
  inputSpacing: {
    marginTop: 0,
    width: '90%',
    paddingVertical: 12,
    borderRadius: 25,
  },
  buttonContainer: {
    marginTop: 0,
    width: '90%',
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
  },
  buttonText: {
    color: '#000000',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: { 
    fontSize: 17,
    color: '#d3d3d3',
    marginRight: 5, 
    fontWeight:"800"
  },
  signupLink: {
    fontSize: 17,
    fontWeight: '900',
    color: '#d3d3d3',
    marginLeft: 5,
  },
});


export default SignUp;