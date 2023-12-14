import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'
import { saveToken } from '@features/tokenStore'
import dbServices from '@utils/dbServices'
import { Alert } from 'react-native'
import { useEffect } from 'react'
const loginSchema = Yup.object().shape({
    username: Yup.string().required('Username or Email is required'),
    password: Yup.string().required('Password is required'),
})

const LoginForm = ({ navigation }: { navigation: any }) => {

    const token = useSelector((state: any) => state.token).token

    useEffect(() => {
        if (token) {
            navigation.navigate('HomeScreen' as any)
        }
    }, [token])

    useEffect(() => {
        const getToken = async () => {
            const token = await dbServices.getData('localStorage', ['field', 'value'], 'field = "token"')
            const profile_id = await dbServices.getData('localStorage', ['field', 'value'], 'field = "profile_id"')
            if (token[0].value !== '' && profile_id[0].value !== '') {
                dispatch(saveToken({ token: token[0].value, profile_id: profile_id[0].value }))
            }
        }
        getToken()
    }, [])

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
            onCompleted: async (token) => {
                const Newtoken = token.SignIn.token
                dispatch(saveToken({ token: Newtoken }))
                await dbServices.updateData('localStorage', ['field', 'value'], ['token', Newtoken], 'field = "token"')
                navigation.navigate('HomeScreen' as any, { reload: true})
            },
        });

    return (
        <View style={styles.warpper}>
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={async (values) => {
                    await SignIn({
                        variables: {
                            email: values.username.includes('@') ? values.username : '',
                            password: values.password,
                            username: values.username.includes('@') ? '' : values.username,
                        }
                    });
                    values.password = ''
                    values.username = ''
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