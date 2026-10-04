/**
 * CareerCraft AI - Design System Tokens
 * Exact visual specification:
 * - Cream background (#F7F4ED)
 * - Deep ink text and sections (#15130F)
 * - Solid flat color panels: Olive (#3D4A2E), Terracotta (#B8571E), Sand (#D8C9A8), Navy (#2E3A4F), Espresso (#2A1F18)
 * - Editorial serif typography (Fraunces) + Humanist sans (Plus Jakarta Sans / Inter)
 * - Pill-shaped buttons, hairline dividers, no heavy card drop-shadows or gradients
 */

export const THEME_TOKENS = {
  colors: {
    cream: '#F7F4ED',
    creamLight: '#FAF8F3',
    creamDark: '#EFECE3',
    creamBorder: '#E8E3D7',
    ink: '#15130F',
    inkSoft: '#25211C',
    inkMuted: '#5C564E',
    inkFaint: '#8A8277',
    olive: '#3D4A2E',
    oliveLight: '#4C5D3A',
    terracotta: '#B8571E',
    terracottaLight: '#CD6325',
    sand: '#D8C9A8',
    sandLight: '#E6DCBF',
    navy: '#2E3A4F',
    navyLight: '#3C4B65',
    espresso: '#2A1F18',
    espressoLight: '#3A2C22',
  },
  typography: {
    serif: "'Fraunces', 'Canela', 'Playfair Display', Georgia, serif",
    sans: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
  },
  classes: {
    // Buttons
    btnPrimaryPill:
      'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#15130F] text-[#F7F4ED] hover:bg-[#2A1F18] font-medium text-sm transition-all duration-200 active:scale-[0.98]',
    btnLightPill:
      'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#F7F4ED] text-[#15130F] hover:bg-white font-medium text-sm transition-all duration-200 shadow-sm active:scale-[0.98]',
    btnOutlineDark:
      'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#15130F]/20 text-[#15130F] hover:bg-[#15130F]/5 font-medium text-sm transition-all duration-200 active:scale-[0.98]',
    btnHeroSecondary:
      'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/40 text-white hover:bg-white/10 font-medium text-sm transition-all duration-200 backdrop-blur-sm active:scale-[0.98]',
    
    // Headings
    heroHeadline:
      'font-serif text-4xl sm:text-6xl lg:text-[72px] font-normal leading-[1.08] tracking-tight text-white text-center',
    sectionHeadline:
      'font-serif text-3xl sm:text-5xl lg:text-[56px] font-normal leading-[1.12] tracking-tight text-[#15130F]',
    darkHeadline:
      'font-serif text-3xl sm:text-5xl lg:text-[56px] font-normal leading-[1.12] tracking-tight text-[#F7F4ED]',
    cardHeadline:
      'font-serif text-2xl sm:text-3xl font-normal leading-snug',

    // Section containers
    sectionCream: 'bg-[#F7F4ED] text-[#15130F]',
    sectionDark: 'bg-[#15130F] text-[#F7F4ED]',
    sectionEspresso: 'bg-[#2A1F18] text-[#F7F4ED]',
    
    // Hairline dividers
    hairline: 'border-t border-[#15130F]/10',
    hairlineDark: 'border-t border-[#F7F4ED]/15',
  },
};
