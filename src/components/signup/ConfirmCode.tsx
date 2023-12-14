import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native'
import { gql, useMutation } from '@apollo/client'
import { Alert } from 'react-native'
import { useState } from 'react'



const ConfirmCode = ({ navigation, item }: { navigation: any, item: any }) => {
    const email = item.email;
    const [code, setCode] = useState('');

    const [verifyAccount] = useMutation(
        gql`mutation verifyAccount($OTPCode: String!, $email: String!) {
            verifyAccount(OTPCode: $OTPCode, email: $email)
        }`,
        {
            
            onError: (err) => {
                if (err.message !== "Network request failed") {
                    Alert.alert('Error', err.message)
                }
            },
            onCompleted: async (data) => {
                navigation.navigate('LoginScreen')
            },
        }
    )

    return (
        <View>
            <Text style={{ color: '#fff', fontSize: 20, marginBottom: 20 }}>Confirm Account: {email}</Text>
            <TextInput
                style={styles.inputField}
                onChangeText={setCode}
                value={code}
                placeholder="Code"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Button
                title="Confirm"
                onPress={() => {
                    verifyAccount({
                        variables: {
                            OTPCode: code,
                            email: item.email
                        }
                    })
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputField: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 20,
        borderRadius: 5,
    },
})

export default ConfirmCode