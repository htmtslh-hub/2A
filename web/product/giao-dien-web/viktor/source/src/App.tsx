import Navbar from './components/Navbar';
import Hero from './components/Hero';

export default function App() {
  return (
    <div className="relative min-h-screen w-full bg-black text-white">
      <Navbar />
      <Hero />
    </div>
  );
}
