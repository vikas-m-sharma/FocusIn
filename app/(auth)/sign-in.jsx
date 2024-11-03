import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import images from '../../constants/images';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [isSubmitting, setSubmitting] = useState(false);

  const submit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      // Handle sign-in logic here
    }, 2000);
  };

  return (
    <LinearGradient
      colors={['#1c1c1c', '#3533cd', '#000000']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <Image 
              source={images.logo}
              resizeMode='contain' 
              style={styles.logo} 
            />
            <Text style={styles.title}>
              Welcome Back!
            </Text>
            <Text style={styles.subtitle}>
              Login to your account
            </Text>

            {/* Centered input fields */}
            <View style={styles.inputContainer}>
              <FormField 
                title="Email"
                value={form.email}
                handleChangeText={(e) => setForm({ ...form, email: e })}
                otherStyles={styles.inputSpacing}
                keyboardType="email-address"
                icon="mail" // Add an icon for email
              />

              <FormField 
                title="Password"
                value={form.password}
                handleChangeText={(e) => setForm({ ...form, password: e })}
                otherStyles={styles.inputSpacing}
                secureTextEntry // Use secure text entry for password
                icon="lock" // Add an icon for password
              />
            </View>

            <CustomButton 
              title="Sign In"
              handlePress={submit}
              containerStyles={styles.buttonContainer} 
              isLoading={isSubmitting}
            />

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Don't have an account?
              </Text>
              <Link
                href="/sign-up"
                style={styles.signupLink}
              >
                Signup
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
    padding: 16,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    minHeight: '85vh',
  },
  logo: {
    width: 140, // Increase size of logo
    height: 140,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    color: '#f5f5f5',
    fontSize: 32, // Slightly larger font size
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Roboto', // Custom font (ensure it's linked properly)
  },
  subtitle: {
    color: '#aaa',
    fontSize: 18,
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%', // Full width for inputs container
    alignItems: 'center', // Center input fields horizontally
  },
  inputSpacing: {
    marginTop: 10,
    width: '100%', // Full width for inputs
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: '#2a2a2a', // Dark background for input fields
    borderColor: '#444', // Custom border color
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%', // Full width for button
    borderRadius: 25,
    backgroundColor: '#FFA500', // Changed to orange color
    paddingVertical: 15,
    elevation: 5, // Add elevation for shadow
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#f5f5f5',
  },
  signupLink: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3533cd',
    marginLeft: 5,
  },
});

export default SignIn;
