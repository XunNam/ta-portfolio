import HeroSection from "./_components/HeroSection";
import BasicInfo from "./_components/BasicInfo";

export default function Home() {
  return (
    <div className="bg-(--background) text-(--foreground) w-full pt-32 px-6">
      {/* Hero Section */}
      <section>
        <HeroSection />
      </section>

      {/* Thông tin cơ bản */}
      <section>
        <BasicInfo />
      </section>
    </div>
  );
}
