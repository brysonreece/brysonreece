import { GuestLayout } from '@/layouts/GuestLayout';
import { Hero } from '@/components/Hero';

export default function Welcome() {
  return (
    <GuestLayout title="Welcome">
        <Hero />
    </GuestLayout>
  );
}
