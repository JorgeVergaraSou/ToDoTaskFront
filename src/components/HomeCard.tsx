import React, { useEffect, useRef, useState } from 'react'

interface HomeCardProps {
  title: string
  imageUrl: string
  visibleText: string
  hiddenText: string
}

export const HomeCard: React.FC<HomeCardProps> = ({
  title,
  imageUrl,
  visibleText,
  hiddenText
}) => {
  const [isFullTextVisible, setIsFullTextVisible] = useState(false)
  const [hiddenTextHeight, setHiddenTextHeight] = useState(0)
  const hiddenTextRef = useRef<HTMLParagraphElement>(null)

  const toggleTextVisibility = () => {
    setIsFullTextVisible(!isFullTextVisible)
  }

  useEffect(() => {
    if (hiddenTextRef.current) {
      setHiddenTextHeight(hiddenTextRef.current.scrollHeight)
    }
  }, [])

  return (
    <div className='flex flex-col bg-white shadow-md rounded-lg p-6 w-full mx-auto my-4'>
      {imageUrl && <img src={imageUrl} alt={title} className='w-full mb-4' />}
      <h2 className='font-caveat text-5xl font-semibold mb-2 text-center'>
        {title}
      </h2>
      <p
        id='text-1'
        className='font-sans m-0 whitespace-normal overflow-hidden transition-all duration-700 ease-in-out'
        style={{ maxWidth: 'calc(100% - 40px)' }}>
        {visibleText}
      </p>
      <p
        id='text-2'
        ref={hiddenTextRef}
        className={`font-sans m-0 whitespace-normal overflow-hidden transition-all duration-700 ease-in-out ${
          isFullTextVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          maxWidth: 'calc(100% - 40px)',
          height: isFullTextVisible ? `${hiddenTextHeight}px` : '0px'
        }}>
        {hiddenText}
      </p>
      <button
        onClick={toggleTextVisibility}
        className='mt-3 font-sans self-center text-center border-tertiary-grade2 border-2 text-tertiary-grade2 hover:bg-tertiary-grade2 hover:text-secondary-grade3 font-semibold rounded-3xl p-2 transition-all duration-500 ease-in-out'>
        {`Ver ${isFullTextVisible ? 'menos' : ' más'}`}
      </button>
    </div>
  )
}
