import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';


function parseJsonString<T>(jsonString: string): T | null {
  try {
    console.log(jsonString);
    jsonString = jsonString.replace(/^```json|```$/g, '').trim();
    console.log(jsonString);
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error("Invalid JSON string:", error);
    return null;
  }
}

const compressAndConvertToBase64 = (file: File, maxWidth = 500, maxHeight = 500, maxFileSizeKB = 100) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(event) {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const scale = Math.min(maxWidth / img.width, maxHeight / img.height);
        const width = img.width * scale;
        const height = img.height * scale;

        canvas.width = width;
        canvas.height = height;

        ctx?.drawImage(img, 0, 0, width, height);

        let quality = 0.7;
        let compressedBase64 = canvas.toDataURL('image/jpeg', quality);

        while (compressedBase64.length > maxFileSizeKB * 1024 && quality > 0.1) {
          quality -= 0.1;
          compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        }

        resolve(compressedBase64);
      };
      img.onerror = function(error) {
        reject(error);
      };
    };
    reader.onerror = function(error) {
      reject(error);
    };
  });
};

export const useSubmitForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const submitForm = async (
    { pictures, bio, name, email }: { pictures: File[], bio: string, name: string, email: string },
    onSuccess: () => void,
    onError: (error: any) => void
  ) => {
    setLoading(true);
    const formData = new FormData();
    const base64Images: string[] = [];
    for (const picture of pictures) {
      try {
        const base64Compressed = await compressAndConvertToBase64(picture);
        base64Images.push(base64Compressed);
        formData.append('images', base64Compressed);
      } catch (error) {
        console.error('Error processing file:', picture, error);
      }
    }
    formData.append('bio', bio);
    formData.append('name', name);
    formData.append('email', email);

    try {
      const response = await axios.post('https://ymstlg2yd9.execute-api.us-east-1.amazonaws.com/prod/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data.feedback)
      // const parsedResponse = parseJsonString<FeedbackFree>(response.data.feedback);
      //console.log(parsedResponse?.ratings);
      console.log(response.data.feedback?.ratings)
      //localStorage.setItem('feedback', JSON.stringify(parsedResponse));
      localStorage.setItem('feedback', JSON.stringify(response.data.feedback));
      localStorage.setItem('feedback_id', response.data.feedback_id);
      localStorage.setItem('uploadedImages', JSON.stringify(base64Images));

      onSuccess();
    } catch (error) {
      console.error('Error submitting form', error);
      onError(error);
      router.push("/error")
    } finally {
      setLoading(false);
    }
  };

  return { loading, submitForm };
};
