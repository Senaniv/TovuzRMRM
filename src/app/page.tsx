import Hero from '@/components/Hero';
import ServicesGrid from '@/components/ServicesGrid';
import DoctorsCarousel from '@/components/DoctorsCarousel';
import ReviewsSection from '@/components/ReviewsSection';
import BlogSection from '@/components/BlogSection';
import AboutSection from '@/components/AboutSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesGrid />
      <DoctorsCarousel />
      <ReviewsSection />
      <BlogSection />
    </>
  );
}
