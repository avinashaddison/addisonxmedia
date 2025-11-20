export function playNotificationSound() {
  try {
    // Create audio context
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create oscillator for the beep sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Configure oscillator (pleasant notification sound)
    oscillator.frequency.value = 800; // 800 Hz frequency
    oscillator.type = 'sine';
    
    // Configure volume envelope (fade in/out for smooth sound)
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    // Play the sound
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
    
    // Clean up after sound finishes
    setTimeout(() => {
      audioContext.close();
    }, 400);
  } catch (error) {
    console.error('Error playing notification sound:', error);
  }
}
