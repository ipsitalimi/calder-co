import Contact from "./components/site/Contact";
import Footer from "./components/site/Footer";
import Hero from "./components/site/Hero";
import Manifesto from "./components/site/Manifesto";
import Navbar from "./components/site/Navbar";
import SelectedWork from "./components/site/SelectedWork";
import Studio from "./components/site/Studio";

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <SelectedWork />
        <Manifesto />
        <Studio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
