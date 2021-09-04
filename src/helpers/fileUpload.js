const fileUpload = async (file) => {
  const cloudUrl = "https://api.cloudinary.com/v1_1/m2a/image/upload";
  const formData = new FormData();
  formData.append("upload_preset", "block-master");
  formData.append("file", file);

  try {
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });

    if (resp.ok) {
      const cloudResp = await resp.json();
      return cloudResp.secure_url;
    } else {
      throw await resp.json();
    }
  } catch (error) {
    throw error;
  }
};

export { fileUpload };
