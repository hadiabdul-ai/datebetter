"use client";

import React, { useState, useRef, useEffect } from 'react';
import { FeedbackFree } from '@/interfaces/feedback-free';
import RatingCircle from '@/components/ui/rating-circle';
import EmbeddedCheckoutForm from '@/components/ui/embedded-checkout';
import Modal from '@/components/ui/modal';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import StripelogoBlack from '@/public/images/Powered by Stripe - black.svg'
import StripelogoPurple from '@/public/images/Powered by Stripe - blurple.svg'



export default function Feedback() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [feedback, setFeedback] = useState<FeedbackFree | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const handleOpenCouponModal = () => setIsCouponModalOpen(true);
  const handleCloseCouponModal = () => setIsCouponModalOpen(false);

  const handleCouponCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleCouponSubmit();
    }
  };


  useEffect(() => {
    const feedbackObject = localStorage.getItem('feedback');
    const storedImages = localStorage.getItem('uploadedImages');
    
    if (feedbackObject) {
      const feedbackData: FeedbackFree = JSON.parse(feedbackObject);
      setFeedback(feedbackData);

      if (storedImages) {
        setUploadedImages(JSON.parse(storedImages));
      }
    }

      if (isCouponModalOpen && inputRef.current) {
        inputRef.current.focus();
      }
  }, [isCouponModalOpen]);


  const handleCouponSubmit = async () => {
    const feedback_id = localStorage.getItem('feedback_id');
    router.push(`/feedback-premium?coupon_code=${couponCode}&feedback_id=${feedback_id}`)
  };

  const renderFeedback = (data: any) => {
    if (typeof data === 'string') {
      return data
        .replace(/####\s*(.*?)\n/g, '<h4 class="h4 text-lg font-bold mt-2">$1</h4>')
        .replace(/###\s*(.*?)\n/g, '<h3 class="h3 text-xl font-bold mt-3">$1</h3>')
        .replace(/##\s*(.*?)\n/g, '<h2 class="h2 text-2xl font-bold mt-4">$1</h2>')
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
        .replace(/\n/g, '<br>');
    }

    if (typeof data === 'object' && !Array.isArray(data)) {
      return Object.entries(data).map(([key, value]) => (
        <div key={key}>
          <h2 className="h2 text-2xl font-bold mt-4">{key}</h2>
          <div dangerouslySetInnerHTML={{ __html: renderFeedback(value) }} />
        </div>
      ));
    }

    if (Array.isArray(data)) {
      return data.map((item, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: renderFeedback(item) }} />
      ));
    }

    return '';
  };


  if (!feedback) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
        <div className="loader h-24 w-24 mb-6 border-4 border-gray-100 rounded-full animate-spin border-t-gray-800"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto text-center pb-12">
      <div className="bg-white shadow-md rounded-lg p-6" id="feedback-content">
        <div className='mb-6'>
          <h2 className="text-3xl font-bold mb-6">Ratings</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-left mb-6" data-aos="fade-up" data-aos-delay="200">
            <div>
              <h4 className="text-xl text-center font-bold">📸 Photography</h4>
              <RatingCircle rating={feedback.ratings.photography} />
            </div>
            <div>
              <h4 className="text-xl text-center font-bold">🎩 Style</h4>
              <RatingCircle rating={feedback.ratings.style} />
            </div>
            <div>
              <h4 className="text-xl text-center font-bold">🏋🏻‍♂️ Fitness</h4>
              <RatingCircle rating={feedback.ratings.fitness} />
            </div>
            <div>
              <h4 className="text-xl text-center font-bold">😎 Rizz</h4>
              <RatingCircle rating={feedback.ratings.charm} />
            </div>
            <div>
              <h4 className="text-xl text-center font-bold">🤩 Clout</h4>
              <RatingCircle rating={feedback.ratings.social_status} />
            </div>
          </div>
        </div>

        <div className=''>
          <h2 className="text-3xl font-bold mb-4">🗣️ General Feedback</h2>
          <p className="text-lg text-left mb-8">{feedback.feedback}</p>
        </div>
      
        <div className=''>
          <h2 className="text-3xl font-bold mb-4">⭐️ Actionable Improvements ⭐️</h2>
          <div className="mt-8 mb-8 space-y-4  mx-auto flex flex-col items-center">
            <button 
            className="bg-white  text-lg text-blue-500 border-blue-500 border px-10 py-3 rounded hover:text-white hover:bg-blue-600 transition duration-300" 
            onClick={handleOpenModal}>⭐️ Unlock Actionable Improvements</button>
            
            <Image src={StripelogoBlack} className="justify-center" width="130" height="150" priority alt="Powered by Stripe" />
           
          </div>
          

          <div className="text-left mb-6" data-aos="fade-up" data-aos-delay="200">
            <h4 className="text-xl font-bold m-4">🔍 Photos Analysis:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
              {uploadedImages.map((image, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden max-w-sm mx-auto">
                  <div className="flex items-center justify-center h-64">
                    <img src={image} alt={`Uploaded ${index}`} className="object-contain max-h-full" />
                  </div>
                  <div className="p-4">
                    <div role="status" className="max-w-md animate-pulse">
                      <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                      <div className="h-2 bg-gray-100 rounded-full dark:bg-gray-700 mb-2.5"></div>
                      <div className="h-2 bg-gray-100 rounded-full dark:bg-gray-700 mb-2.5"></div>
                      <div className="h-2 bg-gray-100 rounded-full dark:bg-gray-700 mb-2.5"></div>
                      <div className="h-2 bg-gray-100 rounded-full dark:bg-gray-700 mb-2.5"></div>
                      <div className="h-2 bg-gray-100 rounded-full dark:bg-gray-700 max-w-[120px]"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 mb-8 space-y-4 mx-auto flex flex-col items-center">
            <button 
            className="bg-blue-500  text-lg text-white px-10 py-3 rounded hover:bg-blue-600 transition duration-300" 
            onClick={handleOpenModal}>⭐️ Unlock Actionable Improvements</button>
             <Image src={StripelogoBlack} className="justify-center" width="130" height="150" priority alt="Powered by Stripe" />
          </div>

          <div className="text-left mb-6">
            <h4 className="text-xl font-bold">📸 New Photo Ideas:</h4>
            <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
              <div className="w-full mt-4">
              <ul className="list-disc list-inside">
                <li>
                  <div className="h-2 bg-gray-100 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="h-2 bg-gray-100 rounded-full dark:bg-gray-700 max-w-[240px] md:max-w-[540px] mb-2.5"></div>
                </li>
                <li>
                  <div className="h-2 bg-gray-100 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="h-2 bg-gray-100 rounded-full dark:bg-gray-700 max-w-[140px] md:max-w-[240px] mb-2.5"></div>
                </li>
                <li>
                  <div className="h-2 bg-gray-100 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="h-2 bg-gray-100 rounded-full dark:bg-gray-700 max-w-[140px]  mb-2.5"></div>
                </li>
              </ul>
              </div>
            </div>
          </div>
          <div className="text-left mb-6">
            <h4 className="text-xl font-bold">🔍 Bio Analysis:</h4>
            <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
              <div className="w-full mt-4">
                <div className="h-2 bg-gray-100 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-100 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-100 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-100 rounded-full dark:bg-gray-700 max-w-[140px] md:max-w-[540px] mb-2.5"></div>
              </div>
            </div>
          </div>
          <div className="text-left mb-6">
            <h4 className="text-xl font-bold">✍🏼 New Bio Ideas:</h4>
            <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
              <div className="w-full mt-4">
              <ul className="list-disc list-inside">
                <li>
                  <div className="h-2 bg-gray-100 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="h-2 bg-gray-100 rounded-full dark:bg-gray-700 max-w-[240px] md:max-w-[540px] mb-2.5"></div>
                </li>
                <li>
                  <div className="h-2 bg-gray-100 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="h-2 bg-gray-100 rounded-full dark:bg-gray-700 max-w-[140px] md:max-w-[240px] mb-2.5"></div>
                </li>
                <li>
                  <div className="h-2 bg-gray-100 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="h-2 bg-gray-100 rounded-full dark:bg-gray-700 max-w-[140px]  mb-2.5"></div>
                </li>
              </ul>
              </div>
            </div>
          </div>
        </div>


        {/* <div className="mt-8 space-y-4">
          <button 
          className="bg-blue-500  text-lg text-white px-10 py-3 rounded hover:bg-blue-600 transition duration-300" 
          onClick={handleOpenModal}>⭐️ Unlock Premium Analysis</button>
        </div> */}
        <div className="mt-8 mb-8 space-y-4">
          <button 
          className="bg-white text-blue-500 border-blue-500 border px-2 py-1 rounded hover:text-white hover:bg-blue-600 transition duration-300" 
          onClick={handleOpenCouponModal}>Unlock With Coupon Code</button>
        </div>
      </div>

      <div className='px-24'>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} className='w-full max-w-5xl'>
          <EmbeddedCheckoutForm />
        </Modal>
      </div>
      
     
      <div className='px-24 w-full'>
        <Modal isOpen={isCouponModalOpen} onClose={handleCloseCouponModal} className='w-full max-w-3xl'>
          <div className="p-6 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4">Enter Coupon Code</h2>
            <input 
              ref={inputRef} 
              type="text" 
              value={couponCode} 
              onChange={handleCouponCodeChange} 
              onKeyDown={handleKeyDown}
              className="w-1/3 p-2 block border rounded mb-4" 
              placeholder="Coupon Code" 
            />
            <button 
              onClick={handleCouponSubmit} 
              className="bg-blue-500 text-white px-4 py-2 mb-10  rounded hover:bg-blue-600 transition duration-300">
              Unlock
            </button>
          </div>
        </Modal>
      </div>

    </div>
    
  );
}
