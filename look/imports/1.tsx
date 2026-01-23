function Frame3() {
  return (
    <div className="content-stretch flex items-center justify-center pl-[16px] relative shrink-0">
      <p className="css-ew64yg font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[#f6f8ed] text-[64px] tracking-[0.64px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <span className="leading-[normal]">Elevator Pitch. Resume. Portfolio-</span>
        <span className="font-['Instrument_Sans:Bold_Italic',sans-serif] font-bold italic leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>
          ish
        </span>
      </p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[48px] items-start justify-center min-h-px min-w-px relative">
      <div className="css-g0mm18 font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold leading-[256px] relative shrink-0 text-[#f6f8ed] text-[320px] tracking-[-16px]">
        <p className="css-ew64yg mb-0">Matt</p>
        <p className="css-ew64yg">Brown</p>
      </div>
      <Frame3 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-end left-0 p-[64px] w-[1920px]">
      <Frame1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute content-stretch flex font-['Instrument_Sans:Medium',sans-serif] font-medium items-center justify-between leading-[normal] left-0 p-[48px] text-[24px] text-white top-0 w-[1920px]">
      <p className="css-ew64yg relative shrink-0 text-right" style={{ fontVariationSettings: "'wdth' 100" }}>{`Principal Product Architect & AI Systems Designer`}</p>
      <p className="css-ew64yg relative shrink-0 tracking-[-0.48px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Matthew Brown
      </p>
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-[#1a1c1e] overflow-clip relative rounded-[20px] size-full" data-name="1">
      <Frame />
      <Frame2 />
    </div>
  );
}