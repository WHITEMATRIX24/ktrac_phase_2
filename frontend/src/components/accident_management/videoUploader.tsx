import { useState, useRef } from 'react';
import { Camera } from 'lucide-react';

export default function VideoUploader() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(Array.from(e.dataTransfer.files));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    handleFiles(Array.from(e.target.files));
  };

  const handleFiles = async (files: File[]) => {
  const videoFiles = files.filter((file) => file.type.startsWith("video/"));
  if (videoFiles.length === 0) {
    alert("Please upload a valid video file.");
    return;
  }

  setUploading(true);
  try {
    const formData = new FormData();

    // Append each file with the key 'files'
    for (const file of videoFiles) {
      formData.append("files", file);
    }

    // Optional: add reference number
    const referenceNumber = "ACC123";
    for (let pair of formData.entries()) {
  console.log("form field:", pair[0], pair[1]);
}


    const res = await fetch(`/api/storage/uploadVideo?reference_numner=${referenceNumber}`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");

    const result = await res.json();
    console.log("Uploaded files:", result);
    alert("Upload successful!");
  } catch (err) {
    console.error("Upload failed:", err);
    alert("Upload failed");
  }
  setUploading(false);
};

  return (
    <div
      className={`flex-1 border-2 m-[16px] ${isDragging ? "border-blue-500 bg-blue-50" : "border-dashed border-gray-300"} rounded-lg p-6 mb-4 flex flex-col items-center justify-center cursor-pointer`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        accept="video/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />
      <div className="text-center">
        <div className="bg-gray-100 p-3 rounded-full inline-block mb-3">
          <Camera className="w-6 h-6 text-gray-500" />
        </div>
        <p className="text-sm font-medium text-gray-700">
          {isDragging ? "Drop video here" : "Click or drag video to upload"}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Upload accident scene videos <br />
          <span className="text-[10px]">അപകട സ്ഥലത്തിന്റെ വീഡിയോ അപ്‌ലോഡ് ചെയ്യുക</span>
        </p>
        {uploading && <p className="text-blue-500 mt-2">Uploading...</p>}
      </div>
    </div>
  );
}
