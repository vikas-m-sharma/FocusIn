// app/auth/_layout.jsx
import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux'; // Import the Provider
import store from '../redux/store'; // Import your Redux store


const AuthLayout = () => {
  return (
    <Provider store={store}>  {/* Wrap the Stack inside Provider */}
      <Stack>
        {/* Define the screen routes here */}
        <Stack.Screen
          name="sign-in"  // This is the route name, you don't need to pass the 'component' here
          options={{
            headerShown: false,  // Hide the header for this screen
          }}
        />
        <Stack.Screen
          name="sign-up"  // This is the route name, you don't need to pass the 'component' here
          options={{
            headerShown: false,  // Hide the header for this screen
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </Provider>
  );
};

export default AuthLayout;




// import React from 'react';
// import { Stack } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import { Provider } from 'react-redux'; // Import the Provider
// import store from '../redux/store'; // Import your Redux store
// import SignIn from './sign-in'; // Importing SignIn component
// import SignUp from './sign-up'


// const AuthLayout = () => {
//   return (
//     <Provider store={store}>  {/* Wrap the Stack inside Provider */}
//       <Stack>
//         {/* This tells the stack to use the SignIn component for the "sign-in" route */}
//         <Stack.Screen
//           name="sign-in"
//           component={SignIn}  // Assign the SignIn component to this screen
//           options={{
//             headerShown: false,  // Hide the header
//           }}
//         />
        
//         {/* This tells the stack to use the SignUp component for the "sign-up" route */}
//         <Stack.Screen
//           name="sign-up"
//           component={SignUp}  // Assign the SignUp component to this screen
//           options={{
//             headerShown: false,  // Hide the header
//           }}
//         />
//       </Stack>
//       <StatusBar backgroundColor="#161622" style="light" />
//     </Provider>
//   );
// };

// export default AuthLayout;




// import React from 'react'
// import {Stack} from "expo-router"
// import { StatusBar } from 'expo-status-bar'

// const AuthLayout = () => {
//   return (
//     <>
//     <Stack>
//       <Stack.Screen
//       name="sign-in"
//       options={{
//         headerShown:false
//       }}
//       />
//       <Stack.Screen
//       name="sign-up"
//       options={{
//         headerShown:false
//       }}
//       />
//     </Stack>
//     <StatusBar backgroundColor="#161622" style="light"  />

//     </>
//   )
// }

// export default AuthLayout