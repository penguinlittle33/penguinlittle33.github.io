type Motif = "flow" | "reeds" | "saltmarsh";

/** Decorative wetland motifs keep section boundaries consistent across pages. */
export default function SectionDivider({ motif = "flow", compact = false }: { motif?: Motif; compact?: boolean }) {
  return <div className={`section-divider divider-${motif}${compact ? " divider-compact" : ""}`} aria-hidden="true">
    <span className="divider-line" />
    <svg viewBox="0 0 200 64" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {motif === "flow" ? <>
          <path d="M5 32C24 32 25 21 43 21S63 43 82 43 101 21 120 21 140 43 159 43 179 32 195 32" />
          <path d="M20 44C37 44 38 34 54 34S74 53 92 53 113 34 131 34 151 51 170 49" opacity=".55" />
          <path d="M51 12C62 9 69 11 78 16M124 53C137 57 148 57 160 54" opacity=".35" />
        </> : motif === "reeds" ? <>
          <path d="M7 51C36 45 54 56 80 51S119 47 146 51 176 52 194 48" opacity=".6" />
          <path d="M88 50Q84 28 76 12M97 51Q100 29 102 9M108 50Q115 31 126 19M81 50Q70 35 57 33M109 50Q123 42 140 40" />
          <path d="M85 42Q69 40 65 29Q80 31 85 42M99 36Q87 26 90 18Q100 25 99 36M112 41Q126 27 137 29Q127 41 112 41" fill="currentColor" fillOpacity=".09" />
          <path d="M72 9L79 17M75 6L81 13M99 6L105 12M101 3L107 9M123 16L130 23M128 14L134 20" strokeWidth="3" opacity=".8" />
        </> : <>
          <path d="M8 51Q37 45 66 50T123 50 191 49" opacity=".55" />
          <path d="M99 51V15M99 35L80 22M99 41L121 29M99 48L76 38M99 27L111 16M69 50L60 29M130 51L143 34" />
          <g fill="currentColor" fillOpacity=".14">
            <path d="M99 24Q89 13 94 6Q102 11 99 24ZM87 27Q73 27 71 17Q82 16 87 27ZM111 35Q119 20 129 23Q128 33 111 35ZM88 44Q72 46 67 35Q78 31 88 44ZM105 20Q108 8 119 7Q121 17 105 20ZM64 39Q51 37 50 27Q61 27 64 39ZM138 43Q142 30 154 31Q152 41 138 43Z" />
          </g>
          <g stroke="#a17f73" opacity=".85"><path d="M96 14L94 7M78 24L72 18M122 29L129 24M77 39L69 36M111 16L118 9" /></g>
        </>}
      </g>
    </svg>
    <span className="divider-line" />
  </div>;
}
