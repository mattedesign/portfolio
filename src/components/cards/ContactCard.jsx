import { Mail, Linkedin, Github } from 'lucide-react';

export default function ContactCard() {
  const email = "sparkingmatt@gmail.com";

  return (
    <div className="bg-[#f6f8ed] overflow-clip relative rounded-[20px] w-full min-h-screen flex flex-col">
      {/* Header */}
      <div className="absolute flex items-center justify-between left-0 p-8 md:p-12 text-base md:text-xl text-[#1a1c1e] top-0 w-full z-10">
        <p className="font-medium tracking-[-0.02em]">
          Let's Connect
        </p>
        <p className="font-normal text-right tracking-[-0.02em]">
          06/06
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-16 text-center">
        <div className="max-w-[900px]">
          <h2 className="font-extrabold text-[clamp(50px,12vw,180px)] text-[#1a1c1e] leading-[1.1] tracking-[-0.04em] mb-8 md:mb-12">
            Get in
            <br />
            Touch
          </h2>

          <p className="text-[clamp(16px,2vw,32px)] text-[#424437] leading-[1.6] mb-12 md:mb-16">
            Open to discussing complex technical challenges, architecture consulting, or leadership opportunities in AI and product development.
          </p>

          <div className="flex flex-col gap-6 items-center">
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-4 font-medium text-[clamp(18px,2.2vw,36px)] text-[#1a1c1e] hover:opacity-70 transition-opacity"
            >
              <Mail size={28} />
              {email}
            </a>
            <a
              href="https://linkedin.com/in/matthewsparks"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 font-medium text-[clamp(18px,2.2vw,36px)] text-[#1a1c1e] hover:opacity-70 transition-opacity"
            >
              <Linkedin size={28} />
              LinkedIn
            </a>
            <a
              href="https://github.com/sparkingmatt"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 font-medium text-[clamp(18px,2.2vw,36px)] text-[#1a1c1e] hover:opacity-70 transition-opacity"
            >
              <Github size={28} />
              GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-8 md:p-12 text-center">
        <p className="text-[#424437]/60 text-sm">
          © {new Date().getFullYear()} Matt Brown. Built with React + Claude.
        </p>
      </div>
    </div>
  );
}
