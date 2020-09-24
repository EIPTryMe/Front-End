import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import { wrapper, dropzone } from "./UploadImageComponent.module.scss";

const UploadImageComponent = (props) => {
	const fileInput = useRef(null);
	const [image, setImage] = useState(null);
	const [previewUrl, setPreviewUrl] = useState("");

	const handleOnDragOver = (event) => {
		event.preventDefault();
	};
	const handleOnDrop = (event) => {
		//prevent the browser from opening the image
		event.preventDefault();
		event.stopPropagation();
		//let's grab the image file
		let imageFile = event.dataTransfer.files[0];

		console.log(imageFile);
	};

	const handleFile = (file) => {
		//you can carry out any file validations here...
		setImage(file);
		setPreviewUrl(URL.createObjectURL(file));
	};

	return (
		<div className={wrapper}>
			<div
				className={dropzone}
				onDragOver={handleOnDragOver}
				onDrop={handleOnDrop}
				onClick={() => fileInput.current.click()}
			>
				<p className="text-center">
					Cliquez pour sélectionner ou glissez-déposez une image ici....
				</p>
				<input
					type="file"
					accept="image/*"
					ref={fileInput}
					hidden
					onChange={(e) => handleFile(e.target.files[0])}
					value=""
				/>
			</div>
			{previewUrl && (
				<>
					<p>Image sélectionné:</p>
					<img src={previewUrl} alt="" />
				</>
			)}
		</div>
	);
};

UploadImageComponent.propTypes = {};

export default UploadImageComponent;
