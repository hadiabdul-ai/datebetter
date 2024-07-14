"use client";
import Link from 'next/link'
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FeedbackPremium } from '@/interfaces/feedback-premium';
import RatingCircle from '@/components/ui/rating-circle';
import { useRouter } from 'next/navigation';

interface FetchParams {
  id: string;
  feedbackId?: string;
  type: 'session_id' | 'coupon_code';
}

function FeedbackComponent() {
  const router = useRouter();

  const [premiumFeedback, setPremiumFeedback] = useState<FeedbackPremium | null>(null);
  const searchParams = useSearchParams();
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  useEffect(() => {
    const storedImages = localStorage.getItem('uploadedImages');
    if (storedImages) {
      setUploadedImages(JSON.parse(storedImages));
    }

    const session_id = searchParams.get('session_id');
    const coupon_code = searchParams.get('coupon_code');
    const feedback_id = searchParams.get('feedback_id');

    if (session_id && typeof session_id === 'string') {
      fetchPremiumFeedback({ id: session_id, type: 'session_id' });
    } else if (coupon_code && feedback_id && typeof coupon_code === 'string' && typeof feedback_id === 'string') {
      fetchPremiumFeedback({ id: coupon_code, feedbackId: feedback_id ?? undefined, type: 'coupon_code' });
    }
  }, [searchParams]);

  const fetchPremiumFeedback = async ({ id, type, feedbackId }: FetchParams) => {
    try {
      const endpoint = type === 'session_id'
        ? `https://ymstlg2yd9.execute-api.us-east-1.amazonaws.com/prod/premium-feedback?session_id=${id}`
        : `https://ymstlg2yd9.execute-api.us-east-1.amazonaws.com/prod/premium-feedback?coupon_code=${id}&feedback_id=${feedbackId}`;

      const response = await fetch(endpoint);
      if (!response.ok) {
        console.error(`Error fetching premium feedback: ${response.status} ${response.statusText}`);
        router.push("/error");
        return;
      }

      const data = await response.json();
      console.log('Fetched premium feedback:', data);
      setPremiumFeedback(data);
    } catch (error) {
      console.error('Error fetching premium feedback:', error);
      router.push("/error");
    }
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

  if (!premiumFeedback) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
        <div className="loader h-24 w-24 mb-6 border-4 border-gray-50 rounded-full animate-spin border-t-gray-700"></div>
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
              <RatingCircle rating={premiumFeedback.ratings.photography} />
            </div>
            <div>
              <h4 className="text-xl text-center font-bold">🎩 Style</h4>
              <RatingCircle rating={premiumFeedback.ratings.style} />
            </div>
            <div>
              <h4 className="text-xl text-center font-bold">🏋🏻‍♂️ Fitness</h4>
              <RatingCircle rating={premiumFeedback.ratings.fitness} />
            </div>
            <div>
              <h4 className="text-xl text-center font-bold">😎 Charm</h4>
              <RatingCircle rating={premiumFeedback.ratings.charm} />
            </div>
            <div>
              <h4 className="text-xl text-center font-bold">🤩 Social Status</h4>
              <RatingCircle rating={premiumFeedback.ratings.social_status} />
            </div>
          </div>
        </div>

        <div className=''>
          <h2 className="text-3xl font-bold mb-4">🗣️ General Feedback</h2>
          <p className="text-lg text-left mb-8">{premiumFeedback.feedback}</p>
        </div>

        <div className=''>
          <h2 className="text-3xl font-bold mb-4">⭐️ Actionable Improvements</h2>
          <div className="text-left mb-6" data-aos="fade-up" data-aos-delay="200">
            <h4 className="text-xl font-bold mb-4">🔍 Photos Analysis:</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
              {uploadedImages.map((image, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden max-w-sm mx-auto">
                  <div className="flex items-center justify-center h-64">
                    <img src={image} alt={`Uploaded ${index}`} className="object-contain max-h-full" />
                  </div>
                  <div className="p-4">
                    {premiumFeedback && premiumFeedback.suggested_improvements.photos[index] && (
                      <p className="text-lg">{premiumFeedback.suggested_improvements.photos[index]}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
          <div className="text-left mb-6">
            <h4 className="text-xl font-bold mb-2">📸 New Photo Ideas:</h4>
            <ul className="list-disc list-inside">
              {premiumFeedback.suggested_improvements.new_photo_ideas.map((idea, index) => (
                <p className="text-lg"><li key={index}>{idea}</li></p>
              ))}
            </ul>
          </div>
          <div className="text-left mb-6">
            <h4 className="text-xl font-bold mb-2">🔍 Bio Analysis:</h4>
            <p className="text-lg">{premiumFeedback.suggested_improvements.bio}</p>
          </div>
          <div className="text-left mb-6">
            <h4 className="text-xl font-bold mb-2">✍🏼 New Bio Ideas:</h4>
            <ul className="list-disc list-inside">
              {premiumFeedback.suggested_improvements.sample_bios.map((bio, index) => (
                <p className="text-lg"><li key={index}>{bio}</li></p>
              ))}
            </ul>
          </div>
        </div>

        <div className='mt-20'>
          <h4 className="text-xl font-bold mb-4">What do you think about feedback?</h4>
          <Link className="btn-sm text-gray-800 bg-transparent hover:bg-gray-800 border-2 border-gray-800 hover:text-white shadow-sm" href="/contact-us">
            Let us know
          </Link>
        </div>
      </div>

    </div>
  );
}

export default function Feedback() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FeedbackComponent />
    </Suspense>
  );
}
