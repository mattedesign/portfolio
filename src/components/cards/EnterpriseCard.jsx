const ENTERPRISE_ROLES = [
  { company: "Triumph Financial", role: "Principal Product Architect", context: "AI + regulated finance" },
  { company: "Epicor", role: "Director of UX", context: "ERP modernization" },
  { company: "First American", role: "Senior UX Manager", context: "Document workflows" }
];

export default function EnterpriseCard() {
  return (
    <div className="bg-[#1a1c1e] overflow-hidden rounded-[32px] relative w-full h-full min-h-full flex flex-col flex-1">
      {/* Header */}
      <div className="flex items-center justify-between p-8 md:p-12">
        <p className="text-[#f6f8ed]/70 text-base md:text-lg font-normal">
          Track Record
        </p>
        <p className="text-[#f6f8ed]/50 text-base md:text-lg">
          06/10
        </p>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col px-8 md:px-12 pb-8 md:pb-12">
        <h2 className="font-extrabold text-[clamp(40px,9vw,110px)] text-[#f6f8ed] leading-[1] tracking-[-0.03em] mb-10 md:mb-16">
          Shipped at scale.
        </h2>

        {/* Roles - compact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8">
          {ENTERPRISE_ROLES.map((item, index) => (
            <div key={index}>
              <h3 className="text-[#f6f8ed] text-xl md:text-2xl font-bold mb-1">
                {item.company}
              </h3>
              <p className="text-[#e07b5d] text-sm md:text-base font-medium mb-1">
                {item.role}
              </p>
              <p className="text-[#f6f8ed]/40 text-sm">
                {item.context}
              </p>
            </div>
          ))}
        </div>

        {/* Closing */}
        <div className="mt-auto">
          <p className="text-[#f6f8ed]/50 text-base md:text-lg">
            $600M+ companies. Regulated industries. Systems that can't fail.
          </p>
        </div>
      </div>
    </div>
  );
}
