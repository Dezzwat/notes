"use client";

import React from "react";
import {  Github, Instagram} from "lucide-react";
import {
  FaHtml5,
  FaCss3Alt,
  FaDiscord,
  FaPhp,
  FaJava,
  FaWhatsapp,
} from "react-icons/fa";

const Skills = [
  { name: "HTML", icon: <FaHtml5 /> },
  { name: "CSS ", icon: <FaCss3Alt /> },
  { name: "Java ", icon: <FaJava /> },
  { name: "Php ", icon: <FaPhp/> },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#1e1e2f] text-white font-sans">
      <section className="text-center py-16 px-6 md:px-20 bg-[#2c2c3e] animate-fadeIn">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Halo,<br />Saya <span className="text-yellow-300"> Sultan Rafie Haidar</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6">


        </p>

        <div className="mt-6">
          <img
            src="/images/sultan.jpg"
            className="mx-auto w-60 h-42 rounded-full  border-4 border-yellow-300 shadow-md"
          />
        </div>

        <div className="mt-6 flex justify-center items-center gap-6 text-gray-300">
          <a href="https://wa.me/6285591494732" className="hover:text-white text-2xl" title="Whatsapp"><FaWhatsapp/></a>
          <a href="https://www.instagram.com/jambangeger?igsh=MWFoMHdkenY0OGFjYQ==" className="hover:text-white" title="Instagram"><Instagram /></a>
          <a href="https://github.com/Dezzwat" className="hover:text-white" title="GitHub"><Github /></a>
        </div>
      </section>
      <section className="py-16 px-6 md:px-20 bg-[#343450] text-white">
        <h2 className="text-3xl text-yellow-300 font-bold text-center mb-6">About Me</h2>
        <blockquote className="text-center italic text-yellow-500 mb-4">
          "Simple is best"
        </blockquote>
        <p className="max-w-4xl mx-auto text-gray-300 leading-relaxed">
        Saya adalah mahasiswa tehnik informatikan semester 2 yang berkuliah di Universitas Dr. Soetomo. Sebelum masuk kuliah saya bersekolah di SMKN 6 kota bekasi dengan jurusan RPL (Rekayasa Perangkat Lunak). Pengalaman kerja saya sangat tidak berhubungan dengan jurusan saya, seperti menjadi sales brand Handphone selama 6 bulan dan menjadi seorang digital marketer di showroom mobil selama 6 bulan dan untuk saat ini saya hanya membantu bisnis bapak saya. Pengalaman Programing saya hanya ilmu yang saya dapat dari Pada saat bersekolah di SMK, jujur saya merasa masih sangat butuh lebih banyak belajar lagi banyak aspek dari projek ini di bantu oleh teman saya. Oke sekian dari saya Terima kasih  
        </p>
      </section>

      <section className="py-16 px-6 md:px-20 bg-[#1e1e2f] text-white">
        <h2 className="text-3xl font-bold text-yellow-300 text-center mb-12">Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center">
          {Skills.map((skill) => (
            <div
              key={skill.name}
              className="bg-[#2c2c3e] p-4 rounded-lg shadow-md hover:bg-yellow-500 hover:text-black transition-all flex flex-col items-center gap-2"
            >
              {skill.icon && React.cloneElement(skill.icon, { className: "w-10 h-10 mx-auto" })}
              <p>{skill.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;