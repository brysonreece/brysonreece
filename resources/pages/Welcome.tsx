import React from 'react';
import { GuestLayout } from '@/layouts/GuestLayout';
import { Hero } from '@/components/Guest';

export default function Welcome() {
  return (
    <GuestLayout title="Welcome">
        <Hero />
    </GuestLayout>
  );
}
