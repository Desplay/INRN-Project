import { View, Text, TextInput, Button, TouchableOpacity, Image } from 'react-native'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Divider } from 'react-native-elements'
import { useState } from 'react'

const validationSchema = Yup.object().shape({
    body: Yup.string().required().min(1).label('Comment'),
})

const CreateComment = ({ navigation }: { navigation: any }) => {
    const [height, setHeight] = useState(0);
    return (
        <>
            <Divider width={0.25} style={{ backgroundColor: '#bdbdbd' }} />
            <Formik
                initialValues={{ body: '' }}
                onSubmit={(values, { resetForm }) => {
                    console.log(values)
                    { resetForm }
                }}
                validationSchema={validationSchema}
            >
                {({ handleChange, handleSubmit, setFieldTouched, values, resetForm }) => (
                    <>
                        <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                            <TextInput
                                style={{
                                    height: Math.max(50, height),
                                    width: '95%',
                                    paddingLeft: 20,
                                    margin: 20,
                                    color: '#fff',
                                    fontSize: 16,
                                    backgroundColor: '#212121',
                                    borderRadius: 25,
                                }}
                                placeholder="Comment here..."
                                multiline
                                numberOfLines={4}
                                placeholderTextColor={'#bdbdbd'}
                                onChangeText={handleChange('body')}
                                onBlur={() => setFieldTouched('body')}
                                onContentSizeChange={(event) =>
                                    setHeight(event.nativeEvent.contentSize.height)
                                }
                                value={values.body}
                            />
                            <TouchableOpacity onPress={() => {
                                handleSubmit()
                                resetForm()
                            }} style={{
                                position: 'absolute',
                                paddingRight: 30,
                            }}>
                                <Image source={{ uri: "https://img.icons8.com/fluency-systems-regular/1000/bdbdbd/sent--v1.png" }} style={{ height: 30, width: 30, display: values.body ? 'flex' : 'none' }} />
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik >
        </>
    )
}

export default CreateComment