export default function NotFoundPage() {
  return (
    <div className='flex items-center justify-center min-h-80 bg-white dark:bg-black text-black dark:text-white'>
      <div className='text-center space-y-6'>
        <h1 className='text-8xl font-extrabold'>404</h1>
        <p className='text-2xl font-light'>
          Sorry, we couldn't find that page.
        </p>
        <a
          href='/'
          className='inline-block px-8 py-3 border border-black dark:border-white text-base font-medium rounded-md text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors'
        >
          Return Home
        </a>
      </div>
    </div>
  );
}
