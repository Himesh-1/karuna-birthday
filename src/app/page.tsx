import { HeroSection } from '@/components/sections/hero-section';
import { MemoriesSection } from '@/components/sections/memories-section';
import { CakeSection } from '@/components/sections/cake-section';
import { FinaleSection } from '@/components/sections/finale-section';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <HeroSection />
      <MemoriesSection />
      <CakeSection />
      <FinaleSection />
    </main>
  );
}
