"use client";

import React, { useState, ChangeEvent, FormEvent, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function ContactUs() {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      handleSubmit(event as unknown as FormEvent);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    console.log(JSON.stringify({ name, email, message }))
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://ymstlg2yd9.execute-api.us-east-1.amazonaws.com/prod/contact-us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          router.push('/');
        }, 3000);
      } else {
        console.error('Error submitting form');
      }
    } catch (error) {
      console.error('Error submitting form', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='pt-20'>
      <div className="max-w-3xl mx-auto text-center pb-12">
        <h3 className="h3 font-cabinet-grotesk">Contact Us</h3>
      </div>
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap mb-4">
            <div className="w-full">
              <label className="block text-gray-700 text-lg font-medium mb-1" htmlFor="name">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                className="form-input w-full text-gray-800 border rounded p-2"
                value={name}
                onChange={handleNameChange}
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap mb-4">
            <div className="w-full">
              <label className="block text-gray-700 text-lg font-medium mb-1" htmlFor="email">
                Your Email
              </label>
              <input
                id="email"
                type="email"
                className="form-input w-full text-gray-800 border rounded p-2"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap mb-4">
            <div className="w-full">
              <label className="block text-gray-700 text-lg font-medium mb-1" htmlFor="message">
                Message / Feedback
              </label>
              <textarea
                id="message"
                className="form-textarea w-full text-gray-800 border rounded p-2 h-24"
                value={message}
                onChange={handleMessageChange}
                onKeyDown={handleKeyPress}
                required
              ></textarea>
            </div>
          </div>
          {success && 
          <div className="p-4 mt-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
            Thank you for your message! We will get back to you soon.
          </div>}

          <div className="max-w-xs mx-auto sm:flex justify-center mt-6">
            <button
              type="submit"
              className="btn text-white bg-gray-800 hover:bg-gray-600 border-2 hover:bg-transparent hover:text-gray-800 hover:border-gray-800 w-full shadow-sm"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
        
      </div>
    </div>
  );
}
