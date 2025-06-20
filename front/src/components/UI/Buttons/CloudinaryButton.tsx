"use client";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

interface CloudinaryUploadButtonProps {
  onUploadSuccess: (url: string) => void;
  buttonText?: string;
}

const CloudinaryButton: React.FC<CloudinaryUploadButtonProps> = ({
  onUploadSuccess,
  buttonText = "Subir imagen",
}) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleUpload = () => {
    const widget = (window as any).cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        sources: ["local", "url", "camera"],
        multiple: false,
        cropping: true,
        maxFileSize: 2000000,
        resourceType: "image",
      },
      (error: any, result: any) => {
        if (!error && result.event === "success") {
          onUploadSuccess(result.info.secure_url);
          toast.success("Imagen cargada correctamente");
        }
      }
    );
    widget.open();
  };

  return (
    <button
      type="button"
      className="bg-primary text-white px-4 py-2 rounded hover:bg-[#0d0d0d]"
      onClick={handleUpload}
    >
      {buttonText}
    </button>
  );
};

export default CloudinaryButton;
