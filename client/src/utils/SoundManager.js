class SoundManager {
  constructor() {
    this.audioContext = null;
    this.muted = false;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.initialized = true;
    } catch (e) {
      console.error("Web Audio API not supported", e);
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  // Simple beep synthesis
  playTone(freq, type, duration) {
    if (this.muted || !this.initialized) return;
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);

    gain.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.start();
    osc.stop(this.audioContext.currentTime + duration);
  }

  playKeypress() {
    // High pitched short click
    this.playTone(800, 'square', 0.05);
  }

  playBoot() {
    // Rising tone for boot
    if (this.muted || !this.initialized) return;
     if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, this.audioContext.currentTime);
    osc.frequency.linearRampToValueAtTime(880, this.audioContext.currentTime + 0.5);

    gain.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.start();
    osc.stop(this.audioContext.currentTime + 0.5);
  }
}

export const soundManager = new SoundManager();
