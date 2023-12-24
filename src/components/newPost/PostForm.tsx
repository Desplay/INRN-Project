import { View, Text, Image, TextInput, Button, TouchableOpacity } from 'react-native'
import * as Yup from 'yup'
import { Formik } from 'formik'
import * as ImagePicker from 'expo-image-picker';
import { Divider } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import client, { uri } from '@utils/graphqlServices';
import { saveMyPosts } from '@features/myPostStore';

const PLANCEHOLDER_IMG = 'https://img.icons8.com/ios/500/ffffff/camera--v4.png'

const uploadPostSchema = Yup.object().shape({
	imageUrl: Yup.mixed(),
	fileName: Yup.string(),
	fileType: Yup.string(),
	fileBase64: Yup.string(),
	title: Yup.string().max(50, 'Title has reached the characters'),
	content: Yup.string().max(2200, 'Content has reached the characters').required('Content is required'),
})

const PostForm = ({ navigation }: { navigation: any }) => {
	const token = useSelector((state: any) => state.token).token;
	const myPosts = useSelector((state: any) => state.myPosts).posts;
	const dispatch = useDispatch();
	return (
		<Formik
			initialValues={{ title: '', content: '' }}
			onSubmit={async (values: any) => {
				const time = new Date()
				const Hour = time.toLocaleTimeString().split(":")[0] + ":" + time.toLocaleTimeString().split(":")[1]
				values.title = `Đăng vào lúc ${Hour} ${time.toLocaleDateString()}`
				const query = `mutation ($title: String!, $content: String!, $File: File) {
					createPost(PostInput: {
						title: $title
						content: $content
						File: $File
					}) {
						id
                  		title
                  		content
                  		imageUrl
				  		likesCount
                  		comments {
                  		  id
                  		  post_id
                  		  profile_id
                  		  reply_id
                  		  body
                  		  updated_at
                  		}
					}
				}`

				const formdata = new FormData();
				formdata.append('operations', JSON.stringify({
					query, variables: {
						title: values.title,
						content: values.content,
						File: {
							filename: values.fileName,
							filetype: values.fileType,
							base64: values.fileBase64,
						}
					}
				}));

				formdata.append('map', JSON.stringify({ 1: ['variables.Image'] }));
				const status = await fetch(uri, {
					method: 'POST',
					headers: {
						'Authorization': token,
						'apollo-require-preflight': 'true',
					},
					body: formdata,
				})
				const result = await status.json()
				if (result.data) {
					const newPost = result.data.createPost
					const newPosts = [...myPosts, newPost]
					dispatch(saveMyPosts(newPosts))
					navigation.navigate('HomeScreen')
					return
				}
				return
			}}
			validationSchema={uploadPostSchema}
			validateOnMount={true}
		>
			{({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
				<>
					<View style={{ flexDirection: 'column' }} >
						<View style={{ margin: 20, justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
							<View style={{ marginRight: 20 }}>
								<TouchableOpacity
									style={{
										borderRadius: 10,
										borderColor: values.imageUrl ? 'none' : 'white',
										borderWidth: values.imageUrl ? 0 : 5,
										paddingHorizontal: values.imageUrl ? 0 : 10,
									}}
									onPress={async () => {
										let result: any = await ImagePicker.launchImageLibraryAsync({
											mediaTypes: ImagePicker.MediaTypeOptions.All,
											aspect: [4, 3],
											quality: 1,
											base64: true,
										});
										if (!result.canceled) {
											handleChange('imageUrl')(result.assets[0].uri);
											handleChange('fileBase64')(result.assets[0].base64);
											handleChange('fileName')(result.assets[0].uri.split('/').pop());
											handleChange('fileType')(result.assets[0].type);
										}
									}}>
									<Image
										source={{ uri: values.imageUrl ? values.imageUrl : PLANCEHOLDER_IMG }}
										style={{
											width: values.imageUrl ? 300 : 150,
											height: values.imageUrl ? 300 : 150,
											borderRadius: values.imageUrl ? 10 : 0,
											resizeMode: 'cover',
										}}
									/>
								</TouchableOpacity>
							</View>
							<View style={{ marginTop: 30, width: 150, alignItems: 'center', justifyContent: 'center' }}>
								<TouchableOpacity
									style={{ marginTop: -30, display: values.imageUrl ? 'flex' : 'none' }}
									onPress={() => {
										handleChange('imageUrl')('');
									}}
								>
									<Text style={{ color: 'red', fontSize: 18, marginTop: 10 }}>Remove</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
					<Divider width={0.2} orientation='vertical' />
					<TextInput
						style={{ color: 'white', fontSize: 18, margin: 20 }}
						placeholder='Write a Content...'
						placeholderTextColor='gray'
						multiline
						numberOfLines={4}
						onChangeText={handleChange('content')}
						onBlur={handleBlur('content')}
						value={values.content}
					/>
					<Divider width={0.2} orientation='vertical' />
					<View style={{ margin: 20 }}>
						{/* @ts-ignore */}
						<Button title='Upload' disabled={!isValid} onPress={handleSubmit} />
					</View>
				</>
			)}
		</Formik >
	)
}

export default PostForm