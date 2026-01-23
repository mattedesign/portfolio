function Frame1() {
  return (
    <div className="content-stretch flex items-center pl-[8px] relative shrink-0">
      <p className="css-ew64yg font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1a1c1e] text-[58px] tracking-[0.58px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Models that think with...
      </p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start justify-center relative shrink-0 w-full">
      <Frame1 />
      <div className="font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold leading-[240px] min-w-full relative shrink-0 text-[#1a1c1e] text-[220px] tracking-[-8.8px] w-[min-content]">
        <p className="css-4hzbpn mb-0">Applied</p>
        <p className="css-4hzbpn">Intelligence</p>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative">
      <Frame />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex h-[248px] items-center justify-end relative shrink-0">
      <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[24px] text-black text-right tracking-[-0.48px] w-[69px]">
        <span className="font-['Instrument_Sans:Regular',sans-serif] leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>
          02/
        </span>
        <span className="font-['Instrument_Sans:Bold',sans-serif] font-bold leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>
          08
        </span>
      </p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex gap-[16px] items-start justify-center px-[64px] py-[80px] relative w-full">
          <Frame2 />
          <Frame4 />
        </div>
      </div>
    </div>
  );
}

function AboutProject() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative" data-name="About Project">
      <p className="css-4hzbpn font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[32px] w-full">The Evolution</p>
      <p className="css-4hzbpn font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[32px] relative shrink-0 text-[22px] tracking-[-0.44px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>{`A career built on progressively complex problem solving—from creative teams to banking systems to AI architectures. The medium changes, but I've always been solving problems.`}</p>
    </div>
  );
}

function DesignObjectives() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative" data-name="Design Objectives">
      <p className="css-4hzbpn font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[32px] w-full">The Full Spectrum</p>
      <p className="css-4hzbpn font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[32px] relative shrink-0 text-[22px] tracking-[-0.44px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        I fluently communicate in the realms of compliance, profit and loss, and risk management. My journey began in design, evolved through management, and now thrives in technology. This diverse background equips me to adeptly navigate organizational politics as a Director while leveraging my Principal experience to tackle intricate legacy systems. Each phase of my career serves as a canvas, inviting innovative thinking and fresh perspectives.
      </p>
    </div>
  );
}

function Deliverables() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative" data-name="Deliverables">
      <p className="css-4hzbpn font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[32px] w-full">Point 1</p>
      <p className="css-4hzbpn font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[32px] relative shrink-0 text-[22px] tracking-[-0.44px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        AI models need human-level intelligence to truly excel. This involves understanding nuances, context, and emotions, enabling them to make informed decisions, solve complex problems, and interact naturally. By integrating these cognitive abilities, AI can enhance creativity, critical thinking, and adaptability, leading to more effective and human-centered solutions.
      </p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[64px] items-center min-h-px min-w-px relative text-[#424437]">
      <AboutProject />
      <DesignObjectives />
      <Deliverables />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-end justify-center min-h-px min-w-px p-[64px] relative w-[1920px]">
      <Frame5 />
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-[#f6f8ed] content-stretch flex flex-col items-center overflow-clip relative rounded-[20px] size-full" data-name="2">
      <Frame6 />
      <Frame3 />
    </div>
  );
}