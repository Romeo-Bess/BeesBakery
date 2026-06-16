import { Sparkles } from 'lucide-react';

interface CakeSculptorProps {
  cakeType: 'Signature Layer' | 'Tiered Event';
  cakeSize: string;
  flavor: string;
  frosting: string;
  addonFloralGold: boolean;
  addonCupcakes: boolean;
  addonCalligraphy: boolean;
  calligraphyMessage: string;
}

const FLAVOR_COLORS: Record<string, { fill: string; stroke: string; glow: string; text: string }> = {
  'Madagascar Vanilla': { fill: '#FFFDF0', stroke: '#E8E1CD', glow: 'rgba(255,253,240,0.4)', text: '#7A5900' },
  'Dark Cacao & Sea Salt': { fill: '#3A2010', stroke: '#251206', glow: 'rgba(58,32,16,0.3)', text: '#FFF8E7' },
  'Earl Grey & Lavender': { fill: '#E5DFEC', stroke: '#C8BDD5', glow: 'rgba(229,223,236,0.4)', text: '#5D4037' },
  'Pistachio Rose': { fill: '#ECF5E8', stroke: '#D4E6CD', glow: 'rgba(236,245,232,0.4)', text: '#2E7D32' },
};

export default function CakeSculptor({
  cakeSize,
  flavor,
  frosting,
  addonFloralGold,
  addonCupcakes,
  addonCalligraphy,
  calligraphyMessage,
}: CakeSculptorProps) {
  // Determine how many tiers to render
  let tierCount = 1;
  if (cakeSize.includes('Grand')) {
    tierCount = 2;
  } else if (cakeSize.includes('Custom Tiered') || cakeSize.includes('30+')) {
    tierCount = 3;
  }

  const selectedFlavorColor = FLAVOR_COLORS[flavor] || FLAVOR_COLORS['Madagascar Vanilla'];

  // Heights and widths for drawing tiers
  const tierWidths = [180, 140, 100]; // bottom, middle, top
  const tierHeights = [55, 50, 45]; // bottom, middle, top

  return (
    <div className="w-full flex flex-col items-center justify-center bg-surface-container-low rounded-xl p-6 border border-outline-variant/15 relative overflow-hidden mb-6 min-h-[300px]">
      <div className="absolute -right-8 -top-8 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>
      
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-primary animate-pulse" />
        <span className="font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
          Atelier Sculptor Live Preview
        </span>
      </div>

      {/* Main interactive SVG Container */}
      <div className="relative w-full h-[220px] flex items-end justify-center">
        <svg
          viewBox="0 0 300 240"
          className="w-full h-full max-w-[280px] drop-shadow-[0_15px_25px_rgba(0,0,0,0.12)]"
        >
          {/* Cake Stand Base */}
          <ellipse cx="150" cy="205" rx="90" ry="10" fill="#E8E1CD" opacity="0.3" />
          <ellipse cx="150" cy="210" rx="60" ry="15" fill="#C8BDD5" opacity="0.15" />
          <path d="M 110 205 L 120 230 L 180 230 L 190 205 Z" fill="#EAE5D9" />
          <ellipse cx="150" cy="230" rx="30" ry="6" fill="#D5CDBC" />
          <ellipse cx="150" cy="205" rx="100" ry="12" fill="#FAF7EE" stroke="#E8E1CD" strokeWidth="2" />

          {/* Render Cake Tiers */}
          <g>
            {/* Tier 1 (Bottom) */}
            {tierCount >= 1 && (
              <g>
                <rect
                  x={150 - tierWidths[0] / 2}
                  y={205 - tierHeights[0]}
                  width={tierWidths[0]}
                  height={tierHeights[0]}
                  fill={selectedFlavorColor.fill}
                  stroke={selectedFlavorColor.stroke}
                  strokeWidth="1.5"
                  rx="6"
                  className="transition-colors duration-500 ease-in-out"
                />
                {/* Frosting Style Overlay on Bottom Tier */}
                {frosting === 'Rustic Nude' && (
                  <>
                    <line x1={150 - tierWidths[0]/2} y1={205 - tierHeights[0]/2} x2={150 + tierWidths[0]/2} y2={205 - tierHeights[0]/2} stroke="#8D6E63" strokeWidth="6" opacity="0.5" />
                    <line x1={150 - tierWidths[0]/2} y1={205 - tierHeights[0]/3} x2={150 + tierWidths[0]/2} y2={205 - tierHeights[0]/3} stroke="#FAF7EE" strokeWidth="2" opacity="0.7" />
                  </>
                )}
                {frosting === 'Velvet Ganache' && (
                  <path
                    d={`M ${150 - tierWidths[0]/2} ${205 - tierHeights[0]} q 20 15 40 5 q 30 10 50 -3 q 30 12 50 2 L ${150 + tierWidths[0]/2} ${205 - tierHeights[0]} Z`}
                    fill="#3E2723"
                    opacity="0.85"
                  />
                )}
              </g>
            )}

            {/* Tier 2 (Middle) */}
            {tierCount >= 2 && (
              <g>
                <rect
                  x={150 - tierWidths[1] / 2}
                  y={205 - tierHeights[0] - tierHeights[1]}
                  width={tierWidths[1]}
                  height={tierHeights[1]}
                  fill={selectedFlavorColor.fill}
                  stroke={selectedFlavorColor.stroke}
                  strokeWidth="1.5"
                  rx="5"
                  className="transition-colors duration-500 ease-in-out"
                />
                {/* Frosting Style Overlay on Middle Tier */}
                {frosting === 'Rustic Nude' && (
                  <line x1={150 - tierWidths[1]/2} y1={205 - tierHeights[0] - tierHeights[1]/2} x2={150 + tierWidths[1]/2} y2={205 - tierHeights[0] - tierHeights[1]/2} stroke="#8D6E63" strokeWidth="5" opacity="0.5" />
                )}
                {frosting === 'Velvet Ganache' && (
                  <path
                    d={`M ${150 - tierWidths[1]/2} ${205 - tierHeights[0] - tierHeights[1]} q 15 10 30 4 q 20 8 40 -2 q 25 10 40 1 L ${150 + tierWidths[1]/2} ${205 - tierHeights[0] - tierHeights[1]} Z`}
                    fill="#3E2723"
                    opacity="0.85"
                  />
                )}
              </g>
            )}

            {/* Tier 3 (Top) */}
            {tierCount >= 3 && (
              <g>
                <rect
                  x={150 - tierWidths[2] / 2}
                  y={205 - tierHeights[0] - tierHeights[1] - tierHeights[2]}
                  width={tierWidths[2]}
                  height={tierHeights[2]}
                  fill={selectedFlavorColor.fill}
                  stroke={selectedFlavorColor.stroke}
                  strokeWidth="1.5"
                  rx="4"
                  className="transition-colors duration-500 ease-in-out"
                />
                {/* Frosting Style Overlay on Top Tier */}
                {frosting === 'Rustic Nude' && (
                  <line x1={150 - tierWidths[2]/2} y1={205 - tierHeights[0] - tierHeights[1] - tierHeights[2]/2} x2={150 + tierWidths[2]/2} y2={205 - tierHeights[0] - tierHeights[1] - tierHeights[2]/2} stroke="#8D6E63" strokeWidth="4" opacity="0.5" />
                )}
                {frosting === 'Velvet Ganache' && (
                  <path
                    d={`M ${150 - tierWidths[2]/2} ${205 - tierHeights[0] - tierHeights[1] - tierHeights[2]} q 10 8 20 3 q 15 6 30 -1 q 20 8 30 0 L ${150 + tierWidths[2]/2} ${205 - tierHeights[0] - tierHeights[1] - tierHeights[2]} Z`}
                    fill="#3E2723"
                    opacity="0.85"
                  />
                )}
              </g>
            )}
          </g>

          {/* Addon: Floral & Gold Leaf */}
          {addonFloralGold && (
            <g>
              {/* Gold Flecks */}
              <circle cx="110" cy="180" r="2" fill="#F4D03F" />
              <circle cx="180" cy="170" r="1.5" fill="#F4D03F" />
              <circle cx="160" cy="130" r="2" fill="#F4D03F" />
              <circle cx="130" cy="120" r="1.5" fill="#F4D03F" />
              <circle cx="140" cy="80" r="1.5" fill="#F4D03F" />

              {/* Cascading Flowers */}
              {/* Bottom Tier flower */}
              <g transform="translate(70, 175)">
                <circle cx="0" cy="0" r="6" fill="#F8BBD0" />
                <circle cx="-5" cy="-3" r="4" fill="#FF80AB" />
                <circle cx="5" cy="3" r="4" fill="#FF80AB" />
                <circle cx="0" cy="0" r="2.5" fill="#FFF" />
              </g>
              {/* Middle Tier flower */}
              {tierCount >= 2 && (
                <g transform="translate(195, 120)">
                  <circle cx="0" cy="0" r="5" fill="#F8BBD0" />
                  <circle cx="4" cy="-2" r="3.5" fill="#FF80AB" />
                  <circle cx="-4" cy="2" r="3.5" fill="#FF80AB" />
                  <circle cx="0" cy="0" r="2" fill="#FFF" />
                </g>
              )}
              {/* Top Tier flower */}
              {tierCount >= 3 && (
                <g transform="translate(105, 75)">
                  <circle cx="0" cy="0" r="4.5" fill="#F8BBD0" />
                  <circle cx="-3" cy="-2" r="3" fill="#FF80AB" />
                  <circle cx="3" cy="2" r="3" fill="#FF80AB" />
                  <circle cx="0" cy="0" r="1.5" fill="#FFF" />
                </g>
              )}
            </g>
          )}

          {/* Addon: Calligraphy message banner */}
          {addonCalligraphy && (
            <g transform="translate(150, 195)">
              <rect x="-65" y="-8" width="130" height="15" fill="#5D4037" rx="3" stroke="#F4D03F" strokeWidth="0.75" />
              <text x="0" y="2" fill="#FFF" fontSize="6.5" fontFamily="serif" textAnchor="middle" fontStyle="italic">
                {calligraphyMessage.trim() ? `${calligraphyMessage.substring(0, 20)}...` : 'Warm Wishes'}
              </text>
            </g>
          )}

          {/* Addon: Cupcakes on side */}
          {addonCupcakes && (
            <g transform="translate(245, 195)">
              {/* Cupcake 1 */}
              <path d="M -15 0 L -8 15 L -2 15 L 5 0 Z" fill="#D7CCC8" />
              <rect x="-17" y="-5" width="24" height="6" fill={selectedFlavorColor.fill} rx="2" stroke={selectedFlavorColor.stroke} strokeWidth="0.5" />
              <circle cx="-5" cy="-6" r="3" fill="#E91E63" />
            </g>
          )}
        </svg>
      </div>

      {/* Dynamic textual indicators under the preview */}
      <div className="mt-4 text-center">
        <p className="font-serif text-sm font-bold text-on-surface capitalize">
          {flavor} Cake
        </p>
        <p className="font-sans text-[10px] text-on-surface-variant uppercase tracking-wider mt-1">
          {tierCount}-Tier Setup • {frosting} Frosting Style
        </p>
      </div>
    </div>
  );
}
