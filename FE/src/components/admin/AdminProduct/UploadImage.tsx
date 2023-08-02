import { useEffect, useState } from "react";
import { Upload, Modal, Image } from "antd";

import { AiOutlinePlus } from "react-icons/ai";

import { IImageProduct } from "../../../interface";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";

type UploadImageProps = {
  isEdit: boolean;
  listImage: IImageProduct[];
  handleImageChange: (newFileList: UploadFile[]) => void;
};

const UploadImage = ({
  isEdit,
  listImage,
  handleImageChange,
}: UploadImageProps) => {
  const [previewImage, setPreviewImage] = useState<string>("");
  const [previewTitle, setPreviewTitle] = useState<string>("");
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    const previewUrl = file.url || (file.preview as string);

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name ||
        (previewUrl && previewUrl.substring(previewUrl.lastIndexOf("/") + 1))
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    handleImageChange(newFileList);
  };

  const uploadButton = (
    <div>
      <AiOutlinePlus size={30} />
    </div>
  );

  useEffect(() => {
    const initialImage: UploadFile[] = listImage.map(
      (image: IImageProduct) => ({
        uid: image.uid,
        name: image.name.substring(image.name.lastIndexOf("/") + 1),
        status: "done",
        url: image.url,
      })
    );

    setFileList(initialImage);
  }, [listImage]);

  return (
    <>
      {isEdit ? (
        <>
          <Upload
            action="https://api.cloudinary.com/v1_1/project-alone/image/upload?upload_preset=upload-to-shop"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 12 ? null : uploadButton}
          </Upload>

          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </>
      ) : (
        <>
          {fileList.map((image) => (
            <Image key={image.uid} src={image.url} width={100} />
          ))}
        </>
      )}
    </>
  );
};

export default UploadImage;
