import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { gql, useMutation } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'
import { saveToken } from '@features/tokenStore'
import dbServices from '@utils/dbServices'
import { Alert } from 'react-native'

const loginSchema = Yup.object().shape({
    username: Yup.string().required('Username or Email is required'),
    password: Yup.string().required('Password is required'),
})

const LoginForm = ({ navigation }: { navigation: any }) => {
    const dispatch = useDispatch();

    const [SignIn] = useMutation(
        gql`
            mutation SignInInput($email: String, $password: String!, $username: String) {
            SignIn(
                UserSignIn: { email: $email, password: $password, username: $username }
            ) {
                token
            }
        }
        `,
        {
            onError: (err) => {
                if (err.message !== "Network request failed") {
                    Alert.alert('Error', err.message)
                }
            },
            onCompleted: async (data) => {
                const token = data.SignIn.token
                dispatch(saveToken(token))
                await dbServices.updateData('localStorage', ['field', 'value'], ['token', token], 'field = "token"')
                if (navigation.getState().routes?.length !== 1)
                    navigation.goBack()
                else
                    navigation.navigate('BottomNavigation' as any)
            },
        });
    return (
        <View style={styles.warpper}>
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={(values) => {
                    SignIn({
                        variables: {
                            email: values.username.includes('@') ? values.username : '',
                            password: values.password,
                            username: values.username.includes('@') ? '' : values.username,
                        }
                    });
                }
                }
                validationSchema={loginSchema}
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
                                secureTextEntry={true}
                                placeholder='Password'
                                placeholderTextColor='gray'
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                        </View>
                        <Button
                            disabled={!isValid}
                            style={styles.signInButton}
                            // @ts-ignore
                            onPress={handleSubmit}
                            title='Sign In'
                        />
                    </>
                )}
            </Formik>
            <View style={styles.signUpContainer}>
                <Text style={{ color: 'gray' }}>Don't have an account?</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('SignUpScreen' as any)}
                >
                    <Text style={styles.signUpButton}>Sign Up</Text>
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
    }
})


export default LoginForm