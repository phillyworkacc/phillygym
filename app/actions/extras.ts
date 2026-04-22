"use server"

export async function uploadImageToCloudinary (file: File): Promise<string | undefined> {
   try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      if (!cloudName) {
         console.log("process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME doesn't exist");
         return undefined;
      }

      if (file.size > 5_000_000) {
         throw new Error("File too large");
      }

      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", "PhillyGymUserProfilePicture");

      const res = await fetch(
         `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
         { method: "POST", body: form }
      );
      if (res.ok) {
         const data = await res.json();
         console.log(data.secure_url)
         return data.secure_url;
      } else return undefined;
   } catch (e) {
      return undefined;
   }
}