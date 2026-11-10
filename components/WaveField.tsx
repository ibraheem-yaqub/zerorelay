type WaveFieldProps = {
  className?: string;
};

export default function WaveField({ className = "" }: WaveFieldProps) {
  return (
    <div className={`wave-field ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1200 300" preserveAspectRatio="none">
        <path className="wave-line wave-line-back" d="M-100 162 C 75 82 178 78 305 132 S 542 233 684 157 925 66 1053 125 1202 218 1310 132" />
        <path className="wave-line wave-line-mid" d="M-100 187 C 86 110 196 118 322 166 S 540 249 702 174 917 93 1067 158 1207 218 1310 157" />
        <path className="wave-line wave-line-front" d="M-100 212 C 83 152 183 149 319 194 S 536 270 696 203 924 129 1070 186 1210 235 1310 189" />
        <path className="wave-line wave-line-glow" d="M-100 174 C 75 94 178 90 305 144 S 542 245 684 169 925 78 1053 137 1202 230 1310 144" />
      </svg>
    </div>
  );
}
