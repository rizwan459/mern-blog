import { Alert, Button, FileInput, TextInput, Select } from "flowbite-react";
import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function CreatePost() {
  const [postImageFile, setPostImageFile] = useState(null);
  const [imageUloadProgress, setImageUploadProgress] = useState(null);
  const [imageUloadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const handleUploadImage = () => {
    try {
      if (!postImageFile) {
        setImageUploadError("Please select image.");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "_" + postImageFile.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, postImageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Error uploading image.");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadError(null);
            setImageUploadProgress(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Error uploading image..");
      setImageUploadProgress(null);
    }
  };
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form action="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
          />
          <Select name="" id="">
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScricpt</option>
            <option value="reactjs">React.Js</option>
            <option value="nextreactjs">Next.Js</option>
          </Select>
        </div>
        <div className=" mb-4 mt-4 flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setPostImageFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageUloadProgress}
          >
            {imageUloadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUloadProgress}
                  text={`${imageUloadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageUloadError && (
          <Alert className="mt-5" color="failure">
            {imageUloadError}
          </Alert>
        )}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full-h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write something.."
          className="h-72 mb-12 mt-5"
          required
        />
        <Button type="submit" gradientDuoTone="purpleToPink" className="w-full">
          Publish
        </Button>
      </form>
    </div>
  );
}
