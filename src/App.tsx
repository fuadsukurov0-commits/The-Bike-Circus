/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { 
  Bike, 
  Mountain, 
  Zap, 
  Wind, 
  Waves, 
  ArrowRight, 
  Check, 
  X, 
  Info, 
  Sun, 
  Moon, 
  ArrowUp,
  Instagram,
  Twitter,
  Facebook,
  Github
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';

// --- Types ---
interface BikeType {
  id: string;
  title: string;
  emoji: string;
  description: string;
  funnyDescription: string;
  image: string;
  stats: {
    speed: number;
    comfort: number;
    terrain: string;
    funLevel: number;
  };
}

// --- Data ---
const BIKES: BikeType[] = [
  {
    id: 'mountain',
    title: 'Mountain Bike',
    emoji: '🏔️',
    description: 'Built for rugged trails and steep climbs.',
    funnyDescription: 'Climbs rocks like a caffeinated goat.',
    image: 'https://images.unsplash.com/photo-1532298229144-0ee0c57515ec?auto=format&fit=crop&q=80&w=800',
    stats: { speed: 3, comfort: 4, terrain: 'Off-road', funLevel: 5 }
  },
  {
    id: 'road',
    title: 'Road Bike',
    emoji: '🛣️',
    description: 'Lightweight and aerodynamic for paved surfaces.',
    funnyDescription: 'Built for speed. Blink and it’s gone.',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800',
    stats: { speed: 5, comfort: 2, terrain: 'Pavement', funLevel: 4 }
  },
  {
    id: 'hybrid',
    title: 'Hybrid Bike',
    emoji: '🔀',
    description: 'A mix of road and mountain bike features.',
    funnyDescription: 'The chill middle child of cycling.',
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77891?auto=format&fit=crop&q=80&w=800',
    stats: { speed: 3, comfort: 5, terrain: 'Mixed', funLevel: 3 }
  },
  {
    id: 'bmx',
    title: 'BMX',
    emoji: '🚴‍♀️',
    description: 'Small frame designed for stunts and racing.',
    funnyDescription: 'Small frame, big tricks, zero fear.',
    image: 'https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&q=80&w=800',
    stats: { speed: 2, comfort: 1, terrain: 'Park/Street', funLevel: 5 }
  },
  {
    id: 'electric',
    title: 'Electric Bike',
    emoji: '⚡',
    description: 'Motor-assisted pedaling for easier rides.',
    funnyDescription: 'Pedal… or don’t. We won’t judge.',
    image: 'https://images.unsplash.com/photo-1593764592116-bfb2a97c642a?auto=format&fit=crop&q=80&w=800',
    stats: { speed: 4, comfort: 5, terrain: 'Anywhere', funLevel: 4 }
  },
  {
    id: 'cruiser',
    title: 'Cruiser Bike',
    emoji: '🌴',
    description: 'Stylish and comfortable for casual riding.',
    funnyDescription: 'Basically a beach vacation with wheels.',
    image: 'https://images.unsplash.com/photo-1496150590317-f8d952453f93?auto=format&fit=crop&q=80&w=800',
    stats: { speed: 1, comfort: 5, terrain: 'Flat Pavement', funLevel: 3 }
  }
];

const FUN_FACTS = [
  "The fastest bike reached over 280 km/h (yes, WHAT?!)",
  "Bicycles outnumber cars in some cities.",
  "Your legs are basically eco-engines.",
  "The world's longest bicycle is over 47 meters long.",
  "Cycling is three times more efficient than walking."
];

// --- Components ---

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [quizResult, setQuizResult] = useState<BikeType | null>(null);
  const [selectedBike, setSelectedBike] = useState<BikeType | null>(null);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const runQuiz = (preference: string) => {
    let result: BikeType;
    switch (preference) {
      case 'speed':
        result = BIKES.find(b => b.id === 'road')!;
        break;
      case 'comfort':
        result = BIKES.find(b => b.id === 'cruiser')!;
        break;
      case 'adventure':
        result = BIKES.find(b => b.id === 'mountain')!;
        break;
      default:
        result = BIKES[Math.floor(Math.random() * BIKES.length)];
    }
    setQuizResult(result);
  };

  return (
    <div className="min-h-screen font-sans">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Header / Nav */}
      <header className="fixed top-0 w-full z-40 bg-white/80 dark:bg-secondary/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-display font-bold text-xl text-primary">
            <Bike className="w-8 h-8" />
            <span>Bike Circus</span>
          </div>
          
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-accent" /> : <Moon className="w-5 h-5 text-secondary" />}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10" />
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-24 -right-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, -5, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 -left-24 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl lg:text-8xl mb-6"
          >
            Bike Circus 🎪 <br />
            <span className="text-primary">Where Wheels Steal the Show</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-3xl mx-auto"
          >
            From mountain beasts to city gliders, meet the legends of the road.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <a href="#bike-types" className="btn-primary text-lg">
              Start Riding <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Bike Types Section */}
      <section id="bike-types" className="py-20 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-title">The Wild Roster</h2>
          <p className="section-subtitle">
            Every bike has a personality. Some are athletes, some are couch potatoes with motors.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BIKES.map((bike, index) => (
              <motion.div
                key={bike.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={bike.image} 
                    alt={bike.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-zinc-900/90 w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-sm">
                    {bike.emoji}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl mb-2">{bike.title}</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 mb-4 h-12 line-clamp-2 italic">
                    "{bike.funnyDescription}"
                  </p>
                  <button 
                    onClick={() => setSelectedBike(bike)}
                    className="w-full py-2 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    Learn More <Info className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-title">The Stats Battle</h2>
          <p className="section-subtitle">Comparing the legends side-by-side. Who wins your heart?</p>

          <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-900">
                  <th className="p-4 font-bold">Type</th>
                  <th className="p-4 font-bold">Speed</th>
                  <th className="p-4 font-bold">Comfort</th>
                  <th className="p-4 font-bold">Terrain</th>
                  <th className="p-4 font-bold">Fun Level</th>
                </tr>
              </thead>
              <tbody>
                {BIKES.map((bike) => (
                  <tr key={bike.id} className="border-t border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                    <td className="p-4 font-medium flex items-center gap-2">
                      <span className="text-xl">{bike.emoji}</span> {bike.title}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-2 h-4 rounded-full ${i < bike.stats.speed ? 'bg-primary' : 'bg-zinc-200 dark:bg-zinc-700'}`} />
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-2 h-4 rounded-full ${i < bike.stats.comfort ? 'bg-accent' : 'bg-zinc-200 dark:bg-zinc-700'}`} />
                        ))}
                      </div>
                    </td>
                    <td className="p-4 text-sm">{bike.stats.terrain}</td>
                    <td className="p-4">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-2 h-4 rounded-full ${i < bike.stats.funLevel ? 'bg-green-400' : 'bg-zinc-200 dark:bg-zinc-700'}`} />
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Fun Facts Section */}
      <section className="py-20 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="grid grid-cols-6 gap-4 rotate-12 scale-150">
            {[...Array(24)].map((_, i) => <Bike key={i} className="w-12 h-12" />)}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Did You Know? 🧠</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FUN_FACTS.slice(0, 3).map((fact, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 animate-float"
                style={{ animationDelay: `${i * 0.5}s` }}
              >
                <p className="text-xl font-medium leading-relaxed">
                  {fact}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Quiz Section */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="section-title">Find Your Soul-Bike 🚲</h2>
          <p className="section-subtitle">Answer one simple question and we'll tell you who you are (in bike terms).</p>

          <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border border-zinc-100 dark:border-zinc-800">
            <h3 className="text-2xl mb-8">What's your riding vibe?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button 
                onClick={() => runQuiz('speed')}
                className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800 hover:bg-primary hover:text-white transition-all group"
              >
                <Wind className="w-10 h-10 mx-auto mb-4 group-hover:animate-bounce-subtle" />
                <span className="font-bold">Speed</span>
              </button>
              <button 
                onClick={() => runQuiz('comfort')}
                className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800 hover:bg-accent hover:text-secondary transition-all group"
              >
                <Waves className="w-10 h-10 mx-auto mb-4 group-hover:animate-bounce-subtle" />
                <span className="font-bold">Comfort</span>
              </button>
              <button 
                onClick={() => runQuiz('adventure')}
                className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800 hover:bg-primary hover:text-white transition-all group"
              >
                <Mountain className="w-10 h-10 mx-auto mb-4 group-hover:animate-bounce-subtle" />
                <span className="font-bold">Adventure</span>
              </button>
            </div>

            <AnimatePresence>
              {quizResult && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-12 pt-12 border-t border-zinc-100 dark:border-zinc-800"
                >
                  <p className="text-zinc-500 uppercase tracking-widest text-sm mb-2">Your Match Is:</p>
                  <h4 className="text-4xl text-primary mb-4">{quizResult.emoji} {quizResult.title}</h4>
                  <p className="text-lg italic mb-6">"{quizResult.funnyDescription}"</p>
                  <button 
                    onClick={() => setQuizResult(null)}
                    className="text-zinc-400 hover:text-secondary dark:hover:text-white text-sm underline"
                  >
                    Try Again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 font-display font-bold text-3xl text-primary mb-8">
            <Bike className="w-10 h-10" />
            <span>Bike Circus</span>
          </div>
          
          <p className="text-2xl italic text-zinc-400 mb-12">
            “Keep rolling. The road is judging your laziness.”
          </p>

          <div className="flex justify-center gap-6 mb-12">
            <a href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
              <Github className="w-6 h-6" />
            </a>
          </div>

          <div className="pt-12 border-t border-white/10 text-zinc-500 text-sm">
            <p>© {new Date().getFullYear()} Bike Circus. No wheels were harmed in the making of this site.</p>
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      <AnimatePresence>
        {selectedBike && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBike(null)}
              className="absolute inset-0 bg-secondary/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white dark:bg-zinc-900 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setSelectedBike(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/50 dark:bg-black/50 rounded-full hover:bg-white dark:hover:bg-black transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-64 md:h-full">
                  <img 
                    src={selectedBike.image} 
                    alt={selectedBike.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{selectedBike.emoji}</span>
                    <h3 className="text-3xl">{selectedBike.title}</h3>
                  </div>
                  <p className="text-lg mb-6 text-zinc-600 dark:text-zinc-400">
                    {selectedBike.description}
                  </p>
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Speed</span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-3 h-3 rounded-full ${i < selectedBike.stats.speed ? 'bg-primary' : 'bg-zinc-200 dark:bg-zinc-700'}`} />
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Comfort</span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-3 h-3 rounded-full ${i < selectedBike.stats.comfort ? 'bg-accent' : 'bg-zinc-200 dark:bg-zinc-700'}`} />
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Fun Level</span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-3 h-3 rounded-full ${i < selectedBike.stats.funLevel ? 'bg-green-400' : 'bg-zinc-200 dark:bg-zinc-700'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedBike(null)}
                    className="btn-primary w-full justify-center"
                  >
                    Got it!
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-40 p-4 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
