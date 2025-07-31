'use client'
import React, { useState } from "react";

const EditProfilePage = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [user, setUser] = useState<{ id: string; name: string; image: string } | null>(null);

  //get-user
  const fetchUser = async () => {
    const res = await fetch("/api/get-user");
    if (!res.ok) throw new Error("Failed to fetch user");
    const data = await res.json();
    setUser(data);
    return res.json();
  };
  // Upload image to Cloudinary
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url; // Cloudinary image URL
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = "";
      if (image) {
        imageUrl = await uploadImage(image); // get Cloudinary URL
      }

      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, image: imageUrl }),
      });

      if (!res.ok) throw new Error("Failed to update");

      const data = await res.json();
      console.log("Profile updated:", data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-24 flex justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Edit Profile</h1>
        <p className="text-gray-500 mb-6">
          Here you can edit your profile information.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-black w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder={user?.name || "Enter your name"}
            />
          </div>

          {/* Image Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setImage(file);
                if (file) setPreview(URL.createObjectURL(file));
              }}
              className="text-black w-full"
            />
          </div>

          {/* Preview */}
          {preview && (
            <div className="mt-2">
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 rounded-full border border-gray-300 object-cover"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
