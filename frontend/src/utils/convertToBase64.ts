type FileWithBase64 = {
  base64: string;
  name: string;
  type: string;
};

export function fileToBase64(file: File): Promise<FileWithBase64> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      resolve({
        base64: reader.result as string,
        name: file.name,
        type: file.type,
      });
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}

export async function multipleFilesToBase64(
  files: FileList | File[]
): Promise<{ content: string }[]> {
  const fileArray = Array.from(files);

  const readFile = (file: File): Promise<{ content: string }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve({ content: reader.result as string });
      };

      reader.onerror = (err) => reject(err);

      reader.readAsDataURL(file);
    });
  };

  return await Promise.all(fileArray.map(readFile));
}
