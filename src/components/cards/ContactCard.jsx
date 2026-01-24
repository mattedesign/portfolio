import { Mail, Linkedin, Phone } from 'lucide-react';

export default function ContactCard() {
  const email = "sparkingmatt@gmail.com";
  const phone = "214-893-0003";

  return (
    <div className="bg-[#f6f8ed] overflow-hidden rounded-[32px] relative w-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-8 md:p-12">
        <p className="text-[#1a1c1e] text-base md:text-lg font-normal">
          Contact
        </p>
        <p className="text-[#1a1c1e]/60 text-base md:text-lg">
          07/07
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col p-8 md:p-12 pt-0">
        <h2 className="font-extrabold text-[clamp(40px,8vw,100px)] text-[#1a1c1e] leading-[1.05] tracking-[-0.03em] mb-6 md:mb-8">
          Let's Talk
        </h2>

        <p className="text-base md:text-lg text-[#1a1c1e]/60 leading-[1.6] mb-8 max-w-[600px]">
          Open to discussing complex technical challenges, architecture consulting, or leadership opportunities in AI and product development.
        </p>

        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          <div className="space-y-3">
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-3 text-lg md:text-xl text-[#1a1c1e] hover:opacity-60 transition-opacity"
            >
              <Mail size={20} />
              {email}
            </a>
            <a
              href={`tel:${phone.replace(/-/g, '')}`}
              className="flex items-center gap-3 text-lg md:text-xl text-[#1a1c1e] hover:opacity-60 transition-opacity"
            >
              <Phone size={20} />
              {phone}
            </a>
            <a
              href="https://www.linkedin.com/in/matte-design/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-lg md:text-xl text-[#1a1c1e] hover:opacity-60 transition-opacity"
            >
              <Linkedin size={20} />
              LinkedIn
            </a>
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-[#1a1c1e]/10 md:pt-0 md:border-t-0 md:border-l md:pl-16">
            <p className="text-sm text-[#1a1c1e]/50 uppercase tracking-wider font-medium">
              Want to see more?
            </p>
            <a
              href={`mailto:${email}?subject=Demo%20Request&body=Hi%20Matt%2C%0A%0AI'd%20love%20to%20see%20a%20demo%20of%20your%20work.%20Specifically%20interested%20in%3A%0A%0A-%20%0A%0AThanks!`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a1c1e] text-[#f6f8ed] rounded-full font-medium text-base hover:bg-[#1a1c1e]/80 transition-colors w-fit"
            >
              Request a Demo
            </a>
            <p className="text-sm text-[#1a1c1e]/40 max-w-[280px]">
              Ask about Fr8 Document Engine, Figmant, or any architecture deep-dives.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-8 md:px-12 py-6 md:py-8 mt-auto border-t border-[#1a1c1e]/10">
        <p className="text-[#1a1c1e]/40 text-sm">
          © {new Date().getFullYear()} Matt Brown. Built with React + Claude.
        </p>
      </div>
    </div>
  );
}
