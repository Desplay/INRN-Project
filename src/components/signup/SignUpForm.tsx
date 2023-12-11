import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { gql, useMutation } from '@apollo/client'

const signUpSchema = Yup.object().shape({
    username: Yup.string().required('Username or Email is required'),
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
})

const SignUpScreen = ({ navigation }: { navigation: any }) => {

    const [SignUp, { error }] = useMutation(
        gql`
            mutation SignUpInput($email: String!, $password: String!, $username: String!) {
            SignUp(
                UserSignUp: { email: $email, password: $password, username: $username }
            )
        }
        `,
        {
            onError: (err) => {
                if (err.message !== "Network request failed") {
                    Alert.alert('Error', err.message)
                }
            },
        });

    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <View style={styles.warpper}>
            <Formik
                initialValues={{ username: '', email: '', password: '' }}
                onSubmit={async (values) => {
                    await SignUp({
                        variables: {
                            email: values.email,
                            password: values.password,
                            username: values.username,
                        }
                    });
                    if (!error) {
                        navigation.navigate('ConfirmScreen', { email: values.email })
                    }
                }}
                validationSchema={signUpSchema}
                validateOnMount={true}
            >
                {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
                    <>
                        <View style={styles.inputField}>
                            <TextInput
                                style={{ color: 'white' }}
                                placeholder='Username or Email'
                                placeholderTextColor='gray'
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                            />
                        </View>
                        <View style={styles.inputField}>
                            <TextInput
                                style={{ color: 'white' }}
                                placeholder='Email'
                                placeholderTextColor='gray'
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                        </View>
                        <View style={[styles.passwordField, {
                            borderColor: confirmPassword !== values.password && confirmPassword !== '' ? 'red' : '#333'
                        }]}>
                            <TextInput
                                style={{ color: 'white' }}
                                secureTextEntry={true}
                                placeholder='Password'
                                placeholderTextColor='gray'
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                        </View>
                        <View style={[styles.passwordField, {
                            borderColor: confirmPassword !== values.password && confirmPassword !== '' ? 'red' : '#333'
                        }]}>
                            <TextInput
                                style={{ color: 'white' }}
                                secureTextEntry={true}
                                placeholder='Confirm Password'
                                placeholderTextColor='gray'
                                onChangeText={setConfirmPassword}
                                value={confirmPassword}
                            />
                        </View>
                        {isValid = confirmPassword === values.password && confirmPassword !== '' ? true : false}
                        <Button
                            disabled={!isValid}
                            style={styles.signInButton}
                            // @ts-ignore
                            onPress={handleSubmit}
                            title='Sign Up'
                        />
                    </>
                )}
            </Formik>
            <View style={styles.signUpContainer}>
                <Text style={{ color: 'gray' }}>Already have an account?</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('LoginScreen')}
                >
                    <Text style={styles.signUpButton}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    warpper: {
        marginTop: 80,
    },
    inputField: {
        borderRadius: 4,
        padding: 12,
        backgroundColor: '#333',
        marginBottom: 10,
        borderWidth: 1,
    },
    passwordField: {
        borderRadius: 4,
        padding: 12,
        backgroundColor: '#333',
        marginBottom: 10,
        borderWidth: 1,
    },
    signInButton: {
        backgroundColor: '#1774d1',
        padding: 15,
        borderRadius: 4,
        alignItems: 'center',
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },
    signUpButton: {
        marginLeft: 10,
        color: '#1774d1',
        fontWeight: 'bold',
    },
})

export default SignUpScreen