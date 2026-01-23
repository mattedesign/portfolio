import { Mail, Linkedin, Github } from 'lucide-react';

export default function ContactCard() {
  const email = "sparkingmatt@gmail.com";

  return (
    <div className="bg-[#f6f8ed] overflow-clip relative w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-8 md:p-12">
        <p className="text-[#1a1c1e] text-base md:text-lg font-normal">
          Contact
        </p>
        <p className="text-[#1a1c1e]/60 text-base md:text-lg">
          06/06
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center p-8 md:p-12 pt-0">
        <h2 className="font-extrabold text-[clamp(40px,8vw,100px)] text-[#1a1c1e] leading-[1.05] tracking-[-0.03em] mb-6 md:mb-8">
          Let's Talk
        </h2>

        <p className="text-base md:text-lg text-[#1a1c1e]/60 leading-[1.6] mb-10 md:mb-12 max-w-[600px]">
          Open to discussing complex technical challenges, architecture consulting, or leadership opportunities in AI and product development.
        </p>

        <div className="space-y-4">
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-3 text-lg md:text-xl text-[#1a1c1e] hover:opacity-60 transition-opacity"
          >
            <Mail size={20} />
            {email}
          </a>
          <a
            href="https://linkedin.com/in/matthewsparks"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-lg md:text-xl text-[#1a1c1e] hover:opacity-60 transition-opacity"
          >
            <Linkedin size={20} />
            LinkedIn
          </a>
          <a
            href="https://github.com/sparkingmatt"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-lg md:text-xl text-[#1a1c1e] hover:opacity-60 transition-opacity"
          >
            <Github size={20} />
            GitHub
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="p-8 md:p-12">
        <p className="text-[#1a1c1e]/40 text-sm">
          © {new Date().getFullYear()} Matt Brown. Built with React + Claude.
        </p>
      </div>
    </div>
  );
}
