import { Mail, Linkedin, Phone } from 'lucide-react';

export default function ContactCard() {
  const email = "sparkingmatt@gmail.com";
  const phone = "214-893-0003";

  return (
    <div className="bg-[#f6f8ed] overflow-hidden rounded-[32px] relative w-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-8 md:p-12">
        <p className="text-[#1a1c1e]/70 text-base md:text-lg font-normal">
          Let's Talk
        </p>
        <p className="text-[#1a1c1e]/50 text-base md:text-lg">
          10/10
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col p-8 md:p-12 pt-0">
        <h2 className="font-extrabold text-[clamp(36px,8vw,96px)] text-[#1a1c1e] leading-[1.05] tracking-[-0.03em] mb-10 md:mb-14">
          Ready to build{' '}
          <span className="text-[#e07b5d]">intelligent systems?</span>
        </h2>

        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          <div className="space-y-3">
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-3 text-lg md:text-xl text-[#1a1c1e] hover:text-[#e07b5d] transition-colors"
            >
              <Mail size={20} />
              {email}
            </a>
            <a
              href={`tel:${phone.replace(/-/g, '')}`}
              className="flex items-center gap-3 text-lg md:text-xl text-[#1a1c1e] hover:text-[#e07b5d] transition-colors"
            >
              <Phone size={20} />
              {phone}
            </a>
            <a
              href="https://www.linkedin.com/in/matte-design/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-lg md:text-xl text-[#1a1c1e] hover:text-[#e07b5d] transition-colors"
            >
              <Linkedin size={20} />
              LinkedIn
            </a>
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-[#1a1c1e]/10 md:pt-0 md:border-t-0 md:border-l md:pl-16">
            <a
              href={`mailto:${email}?subject=Demo%20Request`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a1c1e] text-[#f6f8ed] rounded-full font-medium text-base hover:bg-[#e07b5d] transition-colors w-fit"
            >
              Request a Demo
            </a>
            <p className="text-sm text-[#1a1c1e]/50 max-w-[280px]">
              Fr8 Engine, Figmant, or architecture deep-dives.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-8 md:px-12 py-6 md:py-8 mt-auto border-t border-[#1a1c1e]/10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-[#1a1c1e]/40 text-sm">
            Matt Brown · Dallas, TX
          </p>
          <p className="text-[#1a1c1e]/30 text-sm">
            © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}
