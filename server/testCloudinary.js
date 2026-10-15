const cloudinary = require("./config/cloudinary");

(async () => {
  try {
    const result = await cloudinary.uploader.upload("./6.png", {
      folder: "test-folder",
    });
    console.log("Upload successful:", result);
  } catch (error) {
    console.error("Cloudinary error:", error);
  }
})();
