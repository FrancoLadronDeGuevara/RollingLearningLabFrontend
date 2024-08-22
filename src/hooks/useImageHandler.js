import { useState } from "react";
import axios from "axios";
import useSweetAlert from "./useAlert";

const useImageHandler = (initialImage = null) => {
  const [previewImage, setPreviewImage] = useState(initialImage);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { autoCloseAlert } = useSweetAlert();

  const preset_key = import.meta.env.VITE_CLOUDINARY_PRESET;
  const cloudname = import.meta.env.VITE_CLOUDINARY_NAME;

  const handleReadImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (!file.type.startsWith("image/")) {
      return autoCloseAlert("Archivo no válido", "error");
    }

    reader.onload = (e) => {
      const image = e.target.result;
      setPreviewImage(image);
    };

    reader.readAsDataURL(file);
  };

  const handleUploadImage = async (uploadedImage, folderName) => {
    let imageUrl = null;
    const formData = new FormData();

    formData.append("file", uploadedImage);
    formData.append("upload_preset", preset_key);
    formData.append("folder", folderName);

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudname}/upload`,
        formData
      );
      imageUrl = response.data.secure_url;
    } catch (err) {
      console.log(err);
      setError("Error al cargar la imagen");
    } finally {
      setIsLoading(false);
    }

    return imageUrl;
  };

  return {
    previewImage,
    handleReadImage,
    handleUploadImage,
    isLoading,
    error,
    setPreviewImage,
  };
};

export default useImageHandler;
