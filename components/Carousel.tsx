import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";


export const CarouselBox = () => {
    const img1="https://i.scdn.co/image/ab67616d00001e02ddc2f4d70adb8d92527ac909";
    const img2="https://m.media-amazon.com/images/M/MV5BNjY5OTg4NTYtZjVkZS00YTZmLWIwNDEtM2Y0ODQyMzM2NTJiXkEyXkFqcGc@._V1_.jpg";



  return (
    <>
      <Carousel>
        <CarouselContent>
          <CarouselItem><Image src={img1} alt={"poster"} width={300} height={100}/></CarouselItem>
          <CarouselItem><Image src={img2} alt={"poster"} width={300} height={100}/></CarouselItem>
          <CarouselItem><Image src={img1} alt={"poster"} width={300} height={100}/></CarouselItem>
          <CarouselItem><Image src={img2} alt={"poster"} width={300} height={100}/></CarouselItem>
          <CarouselItem><Image src={img1} alt={"poster"} width={300} height={100}/></CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};



