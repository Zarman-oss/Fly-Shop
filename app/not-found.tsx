import { Button } from '@nextui-org/button';
import { title } from '@/components/primitives';
import Link from 'next/link';
export default function NotFoundPage() {
  return (
    <div className='flex items-center justify-center min-h-80 bg-white dark:bg-black text-black dark:text-white'>
      <div className='text-center space-y-6'>
        <h1 className={title()}>404</h1>
        <p className='text-2xl font-light'>
          Sorry, we couldn't find that page.
        </p>
        <Link href='/'>
          <Button color='secondary'>Return Back</Button>
        </Link>
      </div>
    </div>
  );
}
