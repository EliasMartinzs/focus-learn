"use client";

import { BackgroundBeams } from "@/components/ui/background-beams";
import Link from "next/link";

import { Baloo_Tamma_2 } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { AVATARS } from "@/constants/avatars";
import Image from "next/image";

import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Page() {
  return (
    <div className="w-full min-h-svh bg-[#111111] relative text-white">
      <div className="mx-auto max-w-sm lg:max-w-4xl p-2 lg:p-10 flex flex-col gap-16 lg:gap-y-28 items-center">
        <Navbar />

        <Avatars />

        <Hero />

        <Footer />
      </div>
      <BackgroundBeams />
    </div>
  );
}

const Navbar = () => {
  return (
    <header className={cn("w-full rounded-lg")}>
      <nav className="flex items-center justify-between h-full p-4 relative z-10">
        <Link href="/" className="text-2xl">
          Learn Focus
        </Link>

        <Link href="/sign-in">
          <Button className="bg-white text-black transition-colors items-center flex">
            Entrar
            <LogIn />
          </Button>
        </Link>
      </nav>
    </header>
  );
};

const Avatars = () => {
  return (
    <div className="max-w-sm lg:max-w-2xl mx-auto border rounded-full border-white/30 flex items-center pr-2">
      {AVATARS.map(({ id, photo, name }, index) => (
        <div
          key={id}
          className={`relative w-10 h-10 rounded-full overflow-hidden border-2 border-white ${
            index !== 0 ? "-ml-3" : ""
          }`}
        >
          <Image
            src={photo}
            alt={name}
            fill
            className="object-cover rounded-full"
          />
        </div>
      ))}

      <span className="ml-2 font-extralight text-white/60">
        Confiavel por 9,000 Pessoas
      </span>
    </div>
  );
};

const Hero = () => {
  return (
    <div className="space-y-8 flex items-center flex-col justify-center">
      <h1 className="text-4xl lg:text-7xl font-extrabold text-center text-white/90">
        Transforme sua Rotina em Hábitos Saudáveis e Conquiste seus Objetivos
      </h1>

      <h4 className="text-white/80 text-lg font-medium text-center">
        Um aplicativo completo para monitorar treinos, dietas e progresso,
        enquanto mantém sua motivação em alta com dados claros e intuitivos.
      </h4>

      <Button className="bg-white text-black hover:text-white/70 transition-colors p-6 lg:p-8 lg:text-lg">
        Começe gratuitamente
      </Button>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="text-white py-8">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0">
          <nav className="flex gap-6">
            <a href="#about" className="hover:underline">
              Sobre
            </a>
            <a href="#services" className="hover:underline">
              Serviços
            </a>
            <a href="#contact" className="hover:underline">
              Contato
            </a>
            <a href="#privacy" className="hover:underline">
              Privacidade
            </a>
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0">
          {/* Social Media Icons */}
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              <Facebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <Twitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700"
            >
              <Linkedin size={24} />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-white/80">
            © {new Date().getFullYear()} Learn Focus. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
