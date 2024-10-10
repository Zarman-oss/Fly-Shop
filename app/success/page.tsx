import { Suspense } from 'react';
import SuccessComponent from '@/components/SuccessComponent';

export default function SuccessPage() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <SuccessComponent />
      </Suspense>
    </>
  );
}
