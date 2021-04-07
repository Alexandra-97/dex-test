import { baseFetch } from "../baseFetch";

const API_URLS = {
  save: "/api/Image/SaveImage",
};

const saveImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return await baseFetch<FormData, string>({
    url: API_URLS.save,
    method: "POST",
    body: formData,
  });
};

export const imageRequests = { saveImage };
