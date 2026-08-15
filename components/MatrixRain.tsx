const GLYPHS = "01АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЭЮЯ0123456789$₽#@%&*+=<>/\\|";

/**
 * Decorative background. Everything is derived from the column index rather
 * than a random source, so the server and client render identical markup.
 */
function column(index: number): string {
  const length = 26 + ((index * 7) % 14);
  let out = "";
  for (let row = 0; row < length; row += 1) {
    out += `${GLYPHS[(index * 13 + row * 5) % GLYPHS.length]}\n`;
  }
  return out;
}

const COLUMNS = 22;

export function MatrixRain() {
  return (
    <div className="matrix-rain" aria-hidden="true">
      {Array.from({ length: COLUMNS }, (_, index) => (
        <span
          key={index}
          className="matrix-col"
          style={{
            left: `${(index / COLUMNS) * 100 + 0.7}%`,
            animationDuration: `${9 + ((index * 3) % 11)}s`,
            animationDelay: `-${(index * 1.7) % 9}s`,
          }}
        >
          {column(index)}
        </span>
      ))}
    </div>
  );
}
