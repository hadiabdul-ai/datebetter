"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useSubmitForm } from '@/hooks/useSubmitForm';
import ReCaptcha from '@/components/re-captcha';

export default function StepOne() {
  const router = useRouter();
  const [pictures, setPictures] = useState<File[]>([]);
  const [bio, setBio] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const { loading, submitForm } = useSubmitForm();
  const [progress, setProgress] = useState<number>(0);
  const [success, setSuccess] = useState<boolean>(false);
  const [formVisible, setFormVisible] = useState(true);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (pictures.length + files.length > 10) {
      alert('You can only upload a maximum of 10 pictures.');
      return;
    }
    
    setPictures(prevPictures => [...prevPictures, ...files]);
    const urls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(prevUrls => [...prevUrls, ...urls]);
  };

  const handleBioChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setBio(event.target.value);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      handleSubmit(event as unknown as FormEvent);
    }
  };

  const removePicture = (index: number) => {
    setPictures(prevPictures => prevPictures.filter((_, i) => i !== index));
    setPreviewUrls(prevUrls => prevUrls.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (success) {
      setFormVisible(false);
      // Add a small delay before redirecting
      const timer = setTimeout(() => {
        router.push('/feedback-free');
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [success, router]);
  
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!recaptchaToken) {
      alert('Please complete the reCAPTCHA');
      return;
    }

    let percentage = 0;
    const interval = setInterval(() => {
      percentage += 1;
      setProgress(percentage);
      if (percentage >= 100) {
        clearInterval(interval);
      }
    }, 120);
  
    try {
      await submitForm(
        { pictures, bio, name, email, recaptchaToken },
        () => {
          clearInterval(interval);
          setProgress(100);
          // Don't set success immediately, wait for the progress to reach 100%
          setTimeout(() => setSuccess(true), 150);
          setSuccess(true);
        },
        (error) => {
          console.error('Error submitting form 1', error);
          clearInterval(interval);
        }
      );
    } catch (error) {
      console.error('Error submitting form 2', error);
      clearInterval(interval);
    }
  };

  return (
    <>
      {loading && (
        <div className={`fixed inset-0 flex flex-col items-center justify-center bg-white z-50 transition-opacity duration-300 ${formVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
            <div className="loader h-24 w-24 mb-6 border-4 border-gray-100 rounded-full animate-spin border-t-gray-800"></div>
            <p className="text-2xl">Analyzing your profile...</p>
            <p className="text-2xl">{progress}%</p>
          </div>
        </div>
      )}
      <div className="max-w-3xl mx-auto text-center pb-12">
        <h3 className="h3 font-cabinet-grotesk">Upload your 📸 Pictures and ✍🏼 Bio</h3>
      </div>
      <div className={`transition-opacity duration-300 ${formVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap mb-4">
              <div className="w-full relative">
                <label className="block text-gray-700 text-lg font-medium" htmlFor="pictures">
                  Pictures (max 10)
                </label>
                <div className="flex items-center justify-center w-full h-28 border rounded-md border-gray-200 cursor-pointer bg-white hover:bg-gray-100 relative">
                  <input id="dropzone-file" type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} multiple />
                  <div className="flex flex-col items-center justify-center w-full h-full">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>

                  </div>
                </div>
                {previewUrls.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-4 justify-center items-center">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative w-20 h-20">
                        <img src={url} alt={`Preview ${index}`} className="w-full h-full object-contain rounded" />
                        <button type="button" onClick={() => removePicture(index)} className="leading-tight absolute top-0 right-0 px-1 bg-black bg-opacity-40 text-white rounded-full hover:bg-rose-600">
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>  
            <div className="flex flex-wrap mb-4">
              <div className="w-full">
                <label className="block text-gray-700 text-lg font-medium mb-1" htmlFor="bio">
                  Bio
                </label>
                <textarea id="bio" className="form-textarea w-full text-gray-800 border rounded p-2 h-24" value={bio} onChange={handleBioChange} onKeyDown={handleKeyPress} required></textarea>
              </div>
            </div>
            <div className="flex flex-wrap mb-4">
              <div className="w-full">
                <label className="block text-gray-700 text-lg font-medium mb-1" htmlFor="name">
                  Name
                </label>
                <input id="name" type="text" className="form-input w-full text-gray-800 border rounded p-2" value={name} onChange={handleNameChange} required />
              </div>
            </div>
            <div className="flex flex-wrap mb-4">
              <div className="w-full">
                <label className="block text-gray-700 text-lg font-medium mb-1" htmlFor="email">
                  Email
                </label>
                <input id="email" type="email" className="form-input w-full text-gray-800 border rounded p-2" value={email} onChange={handleEmailChange} required />
              </div>
            </div>
            <div className="max-w-xs mx-auto sm:flex justify-center mt-2">
              <ReCaptcha onVerify={setRecaptchaToken} />
            </div>
            <div className="max-w-xs mx-auto sm:flex justify-center mt-4">
              <button type="submit" className="btn text-white bg-gray-800 hover:bg-gray-600 border-2 hover:bg-transparent hover:text-gray-800 hover:border-gray-800 w-full shadow-sm" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
