"use client";

import React, { useState, ChangeEvent, FormEvent, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function ErrorComponent() {
  const router = useRouter();

  return (
    <div className='pt-20'>
      <div className="max-w-3xl mx-auto text-center pb-12">
        <h3 className="h3 font-cabinet-grotesk">Oops something went wrong!</h3>
      </div>
      <div className="max-w-5xl mx-auto text-center">
        <p className='text-xl'>There was an error processing your request, Please try again or {' '}
          <a className='text-blue-500 decoration-blue-500 underline-offset-2 hover:underline' href='/contact-us'>
          contact us</a>.</p>
      </div>
    </div>
  );
}
