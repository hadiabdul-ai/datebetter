import Image from 'next/image'
import Link from 'next/link'

import HeroImage from '@/public/images/screenshot.svg'
import TinderLogo from '@/public/images/tinder.png'
import HingeLogo from '@/public/images/Hinge.png'
import BumbleLogo from '@/public/images/Bumble.png'
import SalamsLogo from '@/public/images/salams.svg'
import DilMilLogo from '@/public/images/dilmil.png'
import DatingAppLogos from '@/public/images/dating-app-logos.svg'

import { HoverBorderGradientButton } from './button-border-gradient'






export default function Hero() {
  return (
    <section className="relative">
      {/* Bg */}
      <div className="absolute inset-0 rounded-bl-[100px] bg-gray-100 pointer-events-none -z-10" aria-hidden="true" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-28 pb-12 md:pb-20 md:pt-44">
          {/* Hero content */}
          <div className="relative max-w-xl mx-auto md:max-w-none text-center md:text-left flex flex-col md:flex-row">
            {/* Content */}
            <div className="md:w-[640px]">
              {/* Copy */}
              <h1 className="h1 font-cabinet-grotesk mb-6" data-aos="fade-right" data-aos-delay="100">
                Boost your dating app {' '}
                <span className="relative inline-flex text-rose-500">
                  <svg
                    className="absolute left-0 top-full -mt-4 max-w-full -z-10"
                    width="220"
                    height="24"
                    viewBox="0 0 220 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M134.66 13.107c-10.334-.37-20.721-.5-31.12-.291l-2.6.06c-4.116.04-8.193.602-12.3.749-14.502.43-29.029 1.196-43.514 2.465-6.414.63-12.808 1.629-19.04 2.866-7.93 1.579-16.113 3.71-23.367 5.003-2.211.374-3.397-1.832-2.31-4.906.5-1.467 1.838-3.456 3.418-4.813a16.047 16.047 0 0 1 6.107-3.365c16.88-4.266 33.763-6.67 51.009-7.389C71.25 3.187 81.81 1.6 92.309.966c11.53-.65 23.097-.938 34.66-.96 7.117-.054 14.25.254 21.36.318l16.194.803 4.62.39c3.85.32 7.693.618 11.53.813 8.346.883 16.673.802 25.144 2.159 1.864.276 3.714.338 5.566.873l.717.225c6.162 1.977 7.92 3.64 7.9 7.197l-.003.203c-.017.875.05 1.772-.112 2.593-.581 2.762-4.066 4.12-8.637 3.63-13.696-1.06-27.935-3.332-42.97-4.168-11.055-.83-22.314-1.459-33.596-1.603l-.022-.332Z"
                      fill="#D1D5DB"
                      fillRule="evenodd"
                    />
                  </svg>
                  matches
                </span>
              </h1>
              <p className="text-xl text-gray-700 mb-5" data-aos="fade-right" data-aos-delay="200">
                Get actionable feedback and implement in minutes to get more matches. We have analyzed thousands of profiles
                and trained our AI models to help you create a profile that truly stands out.
              </p>
              {/* Buttons */}
              <div
                className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-12 md:mb-10"
                data-aos="fade-right"
                data-aos-delay="300"
              >
                <div>
                  <Link className="btn text-white bg-gray-800 hover:bg-gray-600 border-2 hover:bg-transparent hover:text-gray-800  hover:border-gray-800 w-full shadow-sm" href="/step-one">
                    Get Feedback Now
                  </Link>
                </div>
                
                {/* <HoverBorderGradientButton/> */}
                {/* <div>
                  <Link className="btn text-gray-600 bg-white hover:bg-blue-100 hover:text-blue-600 w-full shadow-sm" href="/signin">
                    Sign In
                  </Link>
                </div> */}
              </div>
            </div>
            {/* Image */}
            <div
              className="max-w-sm mx-auto md:max-w-none md:absolute md:left-[32rem] md:ml-16 lg:ml-32 xl:ml-52"
              data-aos="fade-left"
              data-aos-duration="1100"
            >
              <Image src={HeroImage} className="md:max-w-none" width="454" height="659" priority alt="Hero Illustration" />
            </div>         
          </div>

          {/* Works with all dating apps */}
          <div className="items-center mt-8" data-aos="fade-up" data-aos-delay="200">
            <p className="text-xl text-center text-gray-500 mb-3">
              Works with all dating apps.
            </p>
            <Image src={DatingAppLogos} className="mx-auto md:max-w-none" width="430" height="50" priority alt="Hero Illustration" />
          </div>
        </div>
      </div>
    </section>
  )
}