import { Head } from '@inertiajs/react';

import { Hero } from '@/components/guest/hero';
import { GuestLayout } from '@/layouts/guest-layout';

export default function Welcome() {
  return (
    <GuestLayout title="Welcome">
      <Hero />
    </GuestLayout>
  );
}
