import styled from 'app/styles/styled';
import React from 'react';
import Modal from 'react-native-modal';
import Button from '../Button';
import {launchCamera, CameraOptions, launchImageLibrary} from 'react-native-image-picker';
import {UNDEFINE_FUNC} from 'app/utilities';

interface Props {
	onSuccess?: (url?: string) => void;
	onFailed?: (error?: any) => void;
	options?: CameraOptions;
}
const _options: CameraOptions = {
	mediaType: 'photo',
	maxWidth: 400,
	maxHeight: 400,
	includeBase64: true,
};
const url = 'https://api.cloudinary.com/v1_1/dtsv9j6yw/image/upload';

const UploadMedia = ({
	options = _options,
	onSuccess = UNDEFINE_FUNC,
	onFailed = UNDEFINE_FUNC,
}: Props) => {
	const openCamera = () => {
		launchCamera(options, (media) => {
			console.log(JSON.stringify(media));
		});
	};
	const openGallery = () => {
		launchImageLibrary(options, (media) => {
			if (media.didCancel) {
				return;
			}
			const [image] = media.assets || [];
			let base64Img = `data:image/jpg;base64,${image.base64}`;
			const formData = new FormData();

			formData.append('file', base64Img);
			formData.append('upload_preset', 'ml_default');
			fetch(url, {
				method: 'POST',
				body: formData,
			})
				.then(async (response) => {
					const data: Upload = await response.json();
					onSuccess(data?.url);
				})
				.catch(onFailed);
		});
	};
	return (
		<Modal animationIn={'bounceIn'} backdropOpacity={0.2} hasBackdrop isVisible={true}>
			<Container>
				<ImageFood source={require('images/food-upload.png')} />
				<Button onPress={openCamera} clean>
					Take Photo
				</Button>
				<Button onPress={openGallery} clean>
					Open Gallery
				</Button>
			</Container>
		</Modal>
	);
};
const ImageFood = styled.Image`
	width: 100%;
	resize-mode: contain;
`;
const Container = styled.View`
	padding-horizontal: 10px;
	background-color: white;
	padding-vertical: 30px;
	border-radius: ${({theme}) => theme.borderRadius};
`;

export default UploadMedia;
