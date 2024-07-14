import Link from 'next/link'
import Image from 'next/image'
import CreativesImage from '@/public/images/creatives.jpg'
import Pictures from '@/public/images/before-after-pictures.png'
import Feedback from '@/public/images/feedback-cta.png'
import Matches from '@/public/images/matches-cta.png'


import Creative01 from '@/public/images/creative-01.jpg'
import Creative02 from '@/public/images/creative-02.jpg'
import Creative03 from '@/public/images/creative-03.jpg'
import Creative04 from '@/public/images/creative-04.jpg'
import CreativeBg01 from '@/public/images/creative-bg-01.jpg'
import CreativeBg02 from '@/public/images/creative-bg-02.jpg'
import CreativeBg03 from '@/public/images/creative-bg-03.jpg'
import CreativeBg04 from '@/public/images/creative-bg-04.jpg'

export default function PicturesCTA() {
  return (
    
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-12">
        <div className="py-10 md:py-8">
          {/* Section header */}
          {/* <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 font-cabinet-grotesk">Join over 2M creatives from around the world</h2>
          </div> */}
          {/* Section content */}
          <div className="max-w-xl py-4 mx-auto md:max-w-none flex flex-col md:flex-row md:items-center space-y-8 md:space-y-0">
            {/* Creatives cards */}
            <div className="md:w-1/2" data-aos-id-cards data-aos="fade-right" data-aos-delay="100">
              <div className="text-center md:text-left">
                <Image className="inline-block mb-12" src={Feedback} width={580} height={201} alt="Creatives" />
                
              </div>
            </div>
            {/* Content */}
            <div className="md:w-1/2 md:pl-10 lg:pl-20 justify-center " data-aos="fade-left" data-aos-delay="100">
              <div className="text-center justify-center md:text-left">
                <h3 className="h3 font-cabinet-grotesk text-4xl mb-4">Our analysis is categorical and {' '}               
                  <span className="relative inline-flex text-rose-500">
                    <svg
                      className="absolute left-0 top-full -mt-4 max-w-full -z-10"
                      width="160"
                      height="28"
                      viewBox="0 0 220 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M134.66 13.107c-10.334-.37-20.721-.5-31.12-.291l-2.6.06c-4.116.04-8.193.602-12.3.749-14.502.43-29.029 1.196-43.514 2.465-6.414.63-12.808 1.629-19.04 2.866-7.93 1.579-16.113 3.71-23.367 5.003-2.211.374-3.397-1.832-2.31-4.906.5-1.467 1.838-3.456 3.418-4.813a16.047 16.047 0 0 1 6.107-3.365c16.88-4.266 33.763-6.67 51.009-7.389C71.25 3.187 81.81 1.6 92.309.966c11.53-.65 23.097-.938 34.66-.96 7.117-.054 14.25.254 21.36.318l16.194.803 4.62.39c3.85.32 7.693.618 11.53.813 8.346.883 16.673.802 25.144 2.159 1.864.276 3.714.338 5.566.873l.717.225c6.162 1.977 7.92 3.64 7.9 7.197l-.003.203c-.017.875.05 1.772-.112 2.593-.581 2.762-4.066 4.12-8.637 3.63-13.696-1.06-27.935-3.332-42.97-4.168-11.055-.83-22.314-1.459-33.596-1.603l-.022-.332Z"
                        fill="#D1D5DB"
                        fillRule="evenodd"
                      />
                    </svg>
                    data driven
                  </span>
                </h3>
                <p className="text-xl text-gray-500 mb-6">
                Our analysis breaks down your dating profile into key categories, offering precise feedback. Enhance your profile today and attract the right matches.
                </p>
                <div className='max-w-xs mx-auto sm:flex justify-center'>
                  <Link className="btn text-white bg-gray-800 hover:bg-gray-600 border-2 hover:bg-transparent hover:text-gray-800  hover:border-gray-800 w-full shadow-sm" href="/step-one">
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-xl py-6 mx-auto md:max-w-none flex flex-col md:flex-row md:items-center space-y-8 md:space-y-0">
            
            {/* Content */}
            <div className="md:w-1/2 md:pl-10 lg:pl-20 justify-center " data-aos="fade-right" data-aos-delay="100">
              <div className="text-center justify-center md:text-left">
                <h3 className="h3 font-cabinet-grotesk text-4xl mb-4">84% of matches come from {' '}               
                  <span className="relative inline-flex text-rose-500">
                    <svg
                      className="absolute left-0 top-full -mt-4 max-w-full -z-10"
                      width="160"
                      height="28"
                      viewBox="0 0 220 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M134.66 13.107c-10.334-.37-20.721-.5-31.12-.291l-2.6.06c-4.116.04-8.193.602-12.3.749-14.502.43-29.029 1.196-43.514 2.465-6.414.63-12.808 1.629-19.04 2.866-7.93 1.579-16.113 3.71-23.367 5.003-2.211.374-3.397-1.832-2.31-4.906.5-1.467 1.838-3.456 3.418-4.813a16.047 16.047 0 0 1 6.107-3.365c16.88-4.266 33.763-6.67 51.009-7.389C71.25 3.187 81.81 1.6 92.309.966c11.53-.65 23.097-.938 34.66-.96 7.117-.054 14.25.254 21.36.318l16.194.803 4.62.39c3.85.32 7.693.618 11.53.813 8.346.883 16.673.802 25.144 2.159 1.864.276 3.714.338 5.566.873l.717.225c6.162 1.977 7.92 3.64 7.9 7.197l-.003.203c-.017.875.05 1.772-.112 2.593-.581 2.762-4.066 4.12-8.637 3.63-13.696-1.06-27.935-3.332-42.97-4.168-11.055-.83-22.314-1.459-33.596-1.603l-.022-.332Z"
                        fill="#D1D5DB"
                        fillRule="evenodd"
                      />
                    </svg>
                    Great Pictures
                  </span>
                </h3>
                <p className="text-xl text-gray-500 mb-6">
                We offer actionable feedback to transform your average pictures into stunning ones 
                that showcase your personality in the best possible way, enhancing your chances for online dating success.
                </p>
                <div className='max-w-xs mx-auto sm:flex justify-center'>
                  <Link className="btn text-white bg-gray-800 hover:bg-gray-600 border-2 hover:bg-transparent hover:text-gray-800  hover:border-gray-800 w-full shadow-sm" href="/step-one">
                    Get Started
                  </Link>
                </div>
              </div>
            </div>

            {/* Creatives cards */}
            <div className="md:w-1/2" data-aos-id-cards data-aos="fade-left" data-aos-delay="100">
              <div className="text-center md:text-right mt-6 md:ml-14">
                <Image className="inline-block mb-12" src={Pictures} width={580} height={201} alt="Creatives" />
                
              </div>
            </div>
            
          </div>


          <div className="max-w-xl py-6 mx-auto md:max-w-none flex flex-col md:flex-row md:items-center space-y-8 md:space-y-0">
            {/* Creatives cards */}
            <div className="md:w-1/2" data-aos-id-cards data-aos="fade-right" data-aos-delay="100">
              <div className="text-center md:text-left">
                <Image className="inline-block mt-6 mb-12" src={Matches} width={480} height={201} alt="Creatives" />
                
              </div>
            </div>
            {/* Content */}
            <div className="md:w-1/2 md:pl-10 lg:pl-20 justify-center " data-aos="fade-left" data-aos-delay="100">
              <div className="text-center justify-center md:text-left">
                <h3 className="h3 font-cabinet-grotesk text-4xl mb-4">We help you get matches that are {' '}               
                  <span className="relative inline-flex text-rose-500">
                    <svg
                      className="absolute left-0 top-full -mt-4 max-w-full -z-10"
                      width="160"
                      height="28"
                      viewBox="0 0 220 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M134.66 13.107c-10.334-.37-20.721-.5-31.12-.291l-2.6.06c-4.116.04-8.193.602-12.3.749-14.502.43-29.029 1.196-43.514 2.465-6.414.63-12.808 1.629-19.04 2.866-7.93 1.579-16.113 3.71-23.367 5.003-2.211.374-3.397-1.832-2.31-4.906.5-1.467 1.838-3.456 3.418-4.813a16.047 16.047 0 0 1 6.107-3.365c16.88-4.266 33.763-6.67 51.009-7.389C71.25 3.187 81.81 1.6 92.309.966c11.53-.65 23.097-.938 34.66-.96 7.117-.054 14.25.254 21.36.318l16.194.803 4.62.39c3.85.32 7.693.618 11.53.813 8.346.883 16.673.802 25.144 2.159 1.864.276 3.714.338 5.566.873l.717.225c6.162 1.977 7.92 3.64 7.9 7.197l-.003.203c-.017.875.05 1.772-.112 2.593-.581 2.762-4.066 4.12-8.637 3.63-13.696-1.06-27.935-3.332-42.97-4.168-11.055-.83-22.314-1.459-33.596-1.603l-.022-.332Z"
                        fill="#D1D5DB"
                        fillRule="evenodd"
                      />
                    </svg>
                    High Quality
                  </span>
                </h3>
                <p className="text-xl text-gray-500 mb-6">
                Unlock the secret to attracting high-quality matches with our expert profile review. Our detailed insights help you stand out, ensuring you connect with the right people. Elevate your dating game and find meaningful connections today!
                </p>
                <div className='max-w-xs mx-auto sm:flex justify-center'>
                  <Link className="btn text-white bg-gray-800 hover:bg-gray-600 border-2 hover:bg-transparent hover:text-gray-800  hover:border-gray-800 w-full shadow-sm" href="/step-one">
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}