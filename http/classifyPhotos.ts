import axios from "axios";

export const classifyPhotos = async (formData: FormData) => {
  const response = await axios.post("http://localhost:8000/uploads_image", formData, {responseType: "arraybuffer", headers: {'Access-Control-Expose-Headers': 'Content-Disposition'}});
  return response;
}