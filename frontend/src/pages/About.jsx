import React from 'react'
import Title from '../components/Title'
import aboutImg from '../assets/aboutImg.png'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'About'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={aboutImg} alt="about" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt unde fuga, eius, laudantium autem dolorum est reiciendis corrupti vel provident commodi? Inventore distinctio doloribus magnam assumenda quia iure nisi temporibus quas debitis.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere recusandae ipsam consequatur eum voluptas optio aut odio minima cumque? Iste ipsa illum distinctio quod tempora a, voluptates porro nesciunt. Aspernatur tenetur minus debitis impedit facere suscipit illo cupiditate. Perferendis maiores quaerat vitae, voluptatibus dolorum nobis dolores unde maxime voluptatum veniam illum, et fugit omnis reiciendis delectus eius quia adipisci totam.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa voluptas sunt reiciendis voluptatibus, eveniet itaque suscipit praesentium dolor, maxime consectetur deleniti possimus inventore alias sequi in maiores eum quas fuga. Dolore ex reiciendis pariatur voluptatum aut. </p>
        </div>
      </div>

      <div className='text-4xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae facere aut itaque, rerum consequuntur veritatis. Necessitatibus perspiciatis error cupiditate placeat nobis doloribus quisquam, quibusdam in ad dolore voluptatem mollitia dolorum!</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia impedit numquam aliquam sit accusantium quae.</p>
        </div>
      </div>

      <NewsletterBox />

    </div>
  )
}

export default About