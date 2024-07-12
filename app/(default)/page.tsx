export const metadata = {
  title: 'DateBetter - Profile Analyzer',
  description: '10x your matches with our actionable feedback',
}

import Hero from '@/components/hero'
import Inspiration from '@/components/inspiration'
import Carousel from '@/components/carousel'
import Creatives from '@/components/creatives'
import PicturesCTA from '@/components/pictures-cta'
import BioCTA from '@/components/bio-cta'

import Pricing from '@/components/pricing'
import Testimonials from '@/components/testimonials'
import TestimonialsDB from '@/components/testimonials-datebetter'

import Faqs from '@/components/faqs'
import Blog from '@/components/blog'
import Cta from '@/components/cta'

export default function Home() {
  return (
    <>
      <Hero />
      <PicturesCTA />
      <BioCTA />
      <TestimonialsDB />
      {/* <Inspiration /> */}
      {/* <Carousel /> */}
      {/* <Creatives /> */}
      {/* <Pricing /> */}
      {/* <Testimonials /> */}
      {/* <Faqs /> 
      <Blog /> 
      <Cta /> */}
    </>
  )
}
