import { BackgroundEffects } from "./components/BackgroundEffects";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { Projects } from "./components/Projects";
import { ScrollyCanvas } from "./components/ScrollyCanvas";
import { Skills } from "./components/Skills";

function App() {
  return (
    <>
      <BackgroundEffects />

      <Nav />

      <main>
        <Hero />
        <ScrollyCanvas />
        <Projects />
        <Skills />
      </main>

      <Footer />
    </>
  );
}

export default App;