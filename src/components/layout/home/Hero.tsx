// src/app/(home)/(sections)/Hero.tsx
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Maximize,
  Minimize,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import type { ImagePlaceholder } from '@/lib/placeholder-images';

// Define el tipo para cada slide
export type Slide = {
  image: ImagePlaceholder;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
};

// Props del componente Hero
type HeroProps = {
  slides: Slide[];
  autoPlayInterval?: number;
};

export function Hero({ slides, autoPlayInterval = 5000 }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);
  const [progress, setProgress] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Funciones para navegar entre slides
  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, [slides.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  // Lógica para la barra de progreso y auto-play
  const startProgressAnimation = useCallback(() => {
    startTimeRef.current = Date.now();
    const animate = () => {
      const elapsedTime = Date.now() - startTimeRef.current;
      const newProgress = (elapsedTime / autoPlayInterval) * 100;
      progressRef.current = newProgress;
      setProgress(newProgress);

      if (newProgress < 100) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [autoPlayInterval]);

  const resetTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

    setProgress(0);
    progressRef.current = 0;

    if (isPlaying) {
      intervalRef.current = setInterval(goToNext, autoPlayInterval);
      startProgressAnimation();
    }
  }, [isPlaying, goToNext, autoPlayInterval, startProgressAnimation]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [currentIndex, isPlaying, resetTimer]);

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleManualNavigation = (direction: 'next' | 'prev') => {
    if (direction === 'next') goToNext();
    else goToPrevious();
  };

  const currentSlide = slides[currentIndex];

  return (
    <section
      className={cn(
        'relative w-full bg-background transition-all duration-500 ease-in-out',
        isExpanded ? 'min-h-[60vh] md:min-h-[70vh]' : 'min-h-[80px]'
      )}
    >
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Contenedor de la imagen */}
            <AnimatePresence initial={false}>
              <motion.div
                key={currentIndex}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
              >
                <Image
                  src={currentSlide.image.imageUrl}
                  alt={currentSlide.image.description}
                  fill
                  className="object-cover"
                  priority={currentIndex === 0}
                  data-ai-hint={currentSlide.image.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Contenido de texto */}
            <div className="container relative z-10 mx-auto flex h-full flex-col justify-end px-4 pb-20 md:pb-24">
              <motion.div
                key={currentIndex + '-text'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="max-w-2xl text-left"
              >
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                  {currentSlide.title}
                </h1>
                <p className="mt-4 max-w-lg text-lg text-white/90 md:text-xl">
                  {currentSlide.description}
                </p>
                <Button asChild size="lg" className="mt-8">
                  <a href={currentSlide.ctaLink}>{currentSlide.ctaText}</a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controles y Barra de Progreso */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-16 bg-background/50 backdrop-blur-sm">
        <Progress value={progress} className="h-1 w-full rounded-none" />
        <div className="container mx-auto flex h-full items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleManualNavigation('prev')}
              aria-label="Slide anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePlayPause}
              aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleManualNavigation('next')}
              aria-label="Siguiente slide"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
          <div className="hidden md:flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  'h-2 w-8 rounded-full transition-colors',
                  currentIndex === index ? 'bg-primary' : 'bg-muted-foreground/50 hover:bg-muted-foreground/80'
                )}
                aria-label={`Ir al slide ${index + 1}`}
              />
            ))}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-label={isExpanded ? 'Contraer' : 'Expandir'}
          >
            {isExpanded ? (
              <Minimize className="h-6 w-6" />
            ) : (
              <Maximize className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}
