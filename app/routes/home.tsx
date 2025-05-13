import type { Route } from "./+types/home";
import PrimarySearchAppBar from "../components/appbar";
import MainContent from "../components/main/mainContent";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartProvider } from "~/components/main/CartContext";
import Footer from "~/components/main/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "PNS" },
    { name: "description", content: "Welcome to PNS" },
  ];
}

export default function Home() {
  return(  <>
      <CartProvider>
    <PrimarySearchAppBar />
    <MainContent/>
    </CartProvider>
    </>) 

  ;
}
