import { View, Text, TextInput, Button, TouchableOpacity, Image } from 'react-native'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Divider } from 'react-native-elements'
import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'
import { commentPost } from '@features/postStore'

const validationSchema = Yup.object().shape({
    body: Yup.string().required().min(1).label('Comment'),
})

const CreateComment = ({ navigation, postId }: { navigation: any, postId: any }) => {

    const token = useSelector((state: any) => state.token).token
    const dispatch = useDispatch()

    const [height, setHeight] = useState(0);

    const [CreateComment] = useMutation(
        gql`
            mutation CreateComment($PostId: String!, $body: String!) {
                commentInPost(Comment: { 
                    PostId: $PostId, 
                    body: $body 
                    }) 
            }`, { context: { headers: { authorization: token } } }
    )

    return (
        <>
            <Divider width={0.25} style={{ backgroundColor: '#bdbdbd' }} />
            <Formik
                initialValues={{ body: '' }}
                onSubmit={async (values, { resetForm }) => {
                    await CreateComment({ variables: { PostId: postId, body: values.body } })
                    dispatch(commentPost({ postId: postId, comment: { body: values.body } }))
                    resetForm()
                }}
                validationSchema={validationSchema}
            >
                {({ handleChange, handleSubmit, setFieldTouched, values, resetForm }) => (
                    <>
                        <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                            <TextInput
                                style={{
                                    height: Math.max(40, height),
                                    width: '95%',
                                    paddingLeft: 20,
                                    margin: 10,
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