/**
 * Premium Sound Engine — Classy, warm, satisfying sounds
 * Inspired by iOS/Apple-level audio design: soft chimes, warm tones, gentle feedback
 */

let audioCtx: AudioContext | null = null;

function ctx(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

// ─── Core: warm sine with smooth envelope ───────────────────

function warmTone(
  freq: number,
  duration: number,
  volume: number,
  delay = 0,
  fadeIn = 0.02,
  type: OscillatorType = "sine"
) {
  const c = ctx();
  const t = c.currentTime + delay;

  const osc = c.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);

  // Gentle overtone for warmth
  const osc2 = c.createOscillator();
  osc2.type = "sine";
  osc2.frequency.setValueAtTime(freq * 2, t);

  const gain = c.createGain();
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(volume, t + fadeIn);
  gain.gain.setValueAtTime(volume, t + duration * 0.3);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

  const gain2 = c.createGain();
  gain2.gain.setValueAtTime(0, t);
  gain2.gain.linearRampToValueAtTime(volume * 0.08, t + fadeIn);
  gain2.gain.exponentialRampToValueAtTime(0.0001, t + duration * 0.7);

  osc.connect(gain).connect(c.destination);
  osc2.connect(gain2).connect(c.destination);
  osc.start(t);
  osc.stop(t + duration + 0.01);
  osc2.start(t);
  osc2.stop(t + duration + 0.01);
}

function softClick(freq = 3200, vol = 0.04) {
  const c = ctx();
  const t = c.currentTime;
  const osc = c.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, t);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.6, t + 0.04);
  const gain = c.createGain();
  gain.gain.setValueAtTime(vol, t);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);
  osc.connect(gain).connect(c.destination);
  osc.start(t);
  osc.stop(t + 0.07);
}

// ─── Haptic ─────────────────────────────────────────────────

export function hapticLight() {
  try { navigator.vibrate?.(8); } catch {}
}

export function hapticMedium() {
  try { navigator.vibrate?.(15); } catch {}
}

export function hapticHeavy() {
  try { navigator.vibrate?.([20, 30, 15]); } catch {}
}

// ─── Sound Effects ──────────────────────────────────────────

/** Soft tap — like touching glass. Used for buttons & menu items */
export function playTap() {
  try {
    softClick(2800, 0.035);
    hapticLight();
  } catch {}
}

/** Navigate forward — gentle ascending chime, like a wind bell */
export function playNavigate() {
  try {
    warmTone(784, 0.18, 0.05);     // G5
    warmTone(1047, 0.22, 0.04, 0.07); // C6
    hapticLight();
  } catch {}
}

/** Back — soft descending note */
export function playBack() {
  try {
    warmTone(880, 0.15, 0.04);     // A5
    warmTone(659, 0.2, 0.035, 0.06); // E5
    hapticLight();
  } catch {}
}

/** Step forward in setup — delicate rising interval */
export function playStepForward() {
  try {
    warmTone(523, 0.2, 0.045);     // C5
    warmTone(659, 0.25, 0.04, 0.1); // E5
    hapticLight();
  } catch {}
}

/** Step back */
export function playStepBack() {
  try {
    warmTone(659, 0.18, 0.035);
    warmTone(523, 0.22, 0.03, 0.08);
    hapticLight();
  } catch {}
}

/** Select — satisfying soft pop with warmth */
export function playSelect() {
  try {
    warmTone(698, 0.12, 0.05);     // F5
    warmTone(880, 0.16, 0.04, 0.05); // A5
    hapticLight();
  } catch {}
}

/** Deselect — gentle single low note */
export function playDeselect() {
  try {
    warmTone(440, 0.15, 0.03);
    hapticLight();
  } catch {}
}

/** Tab switch — tiny crystalline ping */
export function playTabSwitch() {
  try {
    softClick(2200, 0.03);
    warmTone(1175, 0.1, 0.025); // D6
    hapticLight();
  } catch {}
}

/** Toggle info panel */
export function playTogglePanel() {
  try {
    warmTone(587, 0.12, 0.03);
    warmTone(784, 0.14, 0.025, 0.05);
    hapticLight();
  } catch {}
}

/** Card flip — soft breathy swoosh + chime */
export function playCardFlip() {
  try {
    const c = ctx();
    const t = c.currentTime;
    // Soft filtered noise swoosh
    const len = c.sampleRate * 0.08;
    const buf = c.createBuffer(1, len, c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (len * 0.2)) * 0.3;
    }
    const src = c.createBufferSource();
    src.buffer = buf;
    const lp = c.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 2000;
    lp.Q.value = 0.5;
    const g = c.createGain();
    g.gain.setValueAtTime(0.025, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    src.connect(lp).connect(g).connect(c.destination);
    src.start(t);
    // Gentle chime
    warmTone(1047, 0.1, 0.025, 0.03);
    hapticLight();
  } catch {}
}

/** Dice roll — wooden tumble: layered soft knocks that slow down */
export function playDiceRoll() {
  try {
    const c = ctx();
    const now = c.currentTime;
    // Wooden dice tumble — louder, more impactful
    const taps = [0, 0.05, 0.11, 0.18, 0.26, 0.36, 0.48, 0.62];
    taps.forEach((delay, i) => {
      const vol = 0.35 * (1 - i * 0.08);
      const freq = 250 + Math.random() * 300;
      const len = c.sampleRate * 0.04;
      const buf = c.createBuffer(1, len, c.sampleRate);
      const d = buf.getChannelData(0);
      for (let j = 0; j < len; j++) {
        d[j] = (Math.random() * 2 - 1) * Math.exp(-j / (len * 0.15));
      }
      const src = c.createBufferSource();
      src.buffer = buf;
      const bp = c.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = freq;
      bp.Q.value = 1.2;
      const lp = c.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 2400;
      const g = c.createGain();
      g.gain.value = Math.max(vol, 0.05);
      src.connect(bp).connect(lp).connect(g).connect(c.destination);
      src.start(now + delay);
    });
    // Add a low thud for weight
    const thud = c.createOscillator();
    thud.type = "sine";
    thud.frequency.setValueAtTime(120, now);
    thud.frequency.exponentialRampToValueAtTime(60, now + 0.15);
    const tg = c.createGain();
    tg.gain.setValueAtTime(0.2, now);
    tg.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    thud.connect(tg).connect(c.destination);
    thud.start(now);
    thud.stop(now + 0.25);
    hapticMedium();
  } catch {}
}

/** Dice hit — warm triumphant major chord, gentle */
export function playDiceHit() {
  try {
    warmTone(523, 0.3, 0.04);       // C5
    warmTone(659, 0.3, 0.035, 0.06); // E5
    warmTone(784, 0.35, 0.04, 0.12); // G5
    hapticLight();
  } catch {}
}

/** Dice miss — soft minor descent */
export function playDiceMiss() {
  try {
    warmTone(392, 0.25, 0.03);      // G4
    warmTone(349, 0.3, 0.025, 0.1);  // F4
    hapticLight();
  } catch {}
}

/** Next turn — elegant two-note herald */
export function playNextTurn() {
  try {
    warmTone(392, 0.2, 0.05);       // G4
    warmTone(523, 0.3, 0.045, 0.12); // C5
    hapticMedium();
  } catch {}
}

/** Game start — ethereal ascending arpeggio */
export function playGameStart() {
  try {
    const notes = [392, 523, 659, 784, 1047]; // G C E G C
    notes.forEach((f, i) => {
      warmTone(f, 0.4 - i * 0.04, 0.04 - i * 0.004, i * 0.12);
    });
    hapticMedium();
  } catch {}
}

/** Splash ambient — very soft deep pad fading in/out */
export function playSplashAmbient() {
  try {
    const c = ctx();
    const t = c.currentTime;

    // Deep warm pad
    const osc = c.createOscillator();
    osc.type = "sine";
    osc.frequency.value = 130.8; // C3
    const osc2 = c.createOscillator();
    osc2.type = "sine";
    osc2.frequency.value = 196; // G3 — perfect fifth

    const gain = c.createGain();
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.03, t + 1.5);
    gain.gain.setValueAtTime(0.03, t + 2.5);
    gain.gain.linearRampToValueAtTime(0, t + 3.8);

    osc.connect(gain).connect(c.destination);
    osc2.connect(gain);
    osc.start(t);
    osc2.start(t);
    osc.stop(t + 4);
    osc2.stop(t + 4);

    // Soft bell at 1.2s
    setTimeout(() => {
      warmTone(1047, 0.5, 0.025); // C6 — distant bell
    }, 1200);
  } catch {}
}

/** Reset — gentle three-note descending */
export function playReset() {
  try {
    warmTone(659, 0.18, 0.035);
    warmTone(523, 0.18, 0.03, 0.1);
    warmTone(392, 0.25, 0.03, 0.2);
    hapticMedium();
  } catch {}
}
