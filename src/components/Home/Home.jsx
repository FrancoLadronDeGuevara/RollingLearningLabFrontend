import HeroSection from "./HeroSection/HeroSection";
import { SectionAbout } from "./SectionAbout/SectionAbout";
import { SectionEvent } from "./SectionEvent/SectionEvent";
import { SectionWorkshops } from "./SectionWorkshops/SectionWorkshops";

const Home = () => {
  return <>
    <HeroSection/>
    <SectionWorkshops/>
    <SectionAbout/>
    <SectionEvent/>
  </>;
};

export default Home;
