import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import images from '../../constants/images';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router';

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [isSubmitting, setSubmitting] = useState(false);

  const submit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
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
              Sign Up to FocusIn
            </Text>

            {/* Centered input fields */}
            <View style={styles.inputContainer}>
              <FormField 
                title="Username"
                value={form.username}
                handleChangeText={(e) => setForm({ ...form, username: e })}
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
              title="Sign Up"
              handlePress={submit}
              containerStyles={styles.buttonContainer} 
              isLoading={isSubmitting}
              textStyle={styles.buttonText} // Add text style prop if your CustomButton supports it
            />

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Already have an account?
              </Text>
              <Link
                href="/sign-in"
                style={styles.signupLink}
              >
                Sign in
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
    justifyContent: 'center', // Center content vertically
    alignItems: 'center',     // Center content horizontally
    padding: 16,
  },
  container: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    color: '#f5f5f5',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 8,
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
    backgroundColor: '#FFFFFF', // Change to white
  },
  buttonText: {
    color: '#000000', // Change text color to black
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#FFA500',
  },
  signupLink: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFA500',
    marginLeft: 5,
  },
});

export default SignUp;