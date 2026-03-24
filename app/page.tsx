import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import GallerySection from "@/components/sections/GallerySection";
import ProductsSection from "@/components/sections/ProductsSection";
import RentalsSection from "@/components/sections/RentalsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <GallerySection />
      <ProductsSection />
      <RentalsSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}