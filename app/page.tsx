
import { CarouselBox } from "@/components/Carousel";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <div className="flex flex-col justify-around items-center">
      <Header />
      <div className="py-5 px-20">
        <CarouselBox />
      </div>
    
      <div>
        Recommended movies
      </div>
      <div>
      <Footer />
      </div>
    </div>
  );
}
