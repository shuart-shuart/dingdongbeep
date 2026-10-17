/* Restored from dingdongbeep.xyz, archived 29 June 2023.
 * Original tune patterns, note range and p5.MonoSynth retained.
 * Repairs: one set of controls; gesture-unlocked audio; resize preserves notes;
 * input events work with keyboard/touch; no writes to shared localStorage.
 */
const fiveNotes = ['C5', 'D5', 'E5', 'F5', 'G5'];
const patterns = [
  [0,1,2,3,4,3,2,1,0,2,4,2], [0,4,0,3,0,2,0,1,4,3,2,1],
  [4,0,1,2,3,2,1,2,3,2,1,4], [2,1,0,4,3,2,1,0,4,3,2,1],
  [0,1,2,1,1,2,3,2,2,3,4,2], [2,0,1,2,3,1,2,3,4,2,3,4],
  [2,3,2,1,0,1,2,1,4,0,1,2], [2,3,4,3,1,2,3,2,0,1,2,1],
  [4,2,3,1,2,0,2,0,0,2,4,2], [2,3,4,0,1,2,3,4,0,1,2,1]
];
const letters = 'dingdongbeep!';
const sliders = [];
let previewSynth, sequenceSynth, soundLoop, playButton, generateButton;
let sequenceIndex = 0;

function announce(message) {
  document.getElementById('audio-status').textContent = message;
}

async function previewNote(index) {
  try {
    await userStartAudio();
    previewSynth.play(fiveNotes[Number(sliders[index].value())], 0.5, 0, 0.5);
  } catch (error) {
    announce('Sound could not start. Try opening this page directly and selecting play.');
    console.error('Audio could not start:', error);
  }
}

function stopSequence() {
  soundLoop.stop();
  playButton.html('play');
  playButton.elt.setAttribute('aria-label', 'Play the current tune');
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.elt.setAttribute('aria-hidden', 'true');
  background(255);
  noLoop();
  previewSynth = new p5.MonoSynth();
  sequenceSynth = new p5.MonoSynth();
  const initial = random(patterns);
  for (let index = 0; index < letters.length; index++) {
    const fixed = index === 12;
    const slider = createSlider(0, fixed ? 0 : 4, fixed ? 0 : initial[index], 1);
    slider.addClass(index === 0 ? 'mySliders' : `mySliders${index + 1}`);
    slider.elt.setAttribute('aria-label', `Letter ${letters[index]}, note ${index + 1}`);
    if (fixed) {
      slider.elt.setAttribute('aria-hidden', 'true');
      slider.elt.tabIndex = -1;
    } else {
      slider.input(() => previewNote(index));
      slider.elt.addEventListener('pointerdown', () => previewNote(index));
    }
    sliders.push(slider);
  }

  soundLoop = new p5.SoundLoop(timeFromNow => {
    const index = sequenceIndex++;
    const note = fiveNotes[Number(sliders[index].value())];
    sequenceSynth.play(note, 1, 0, timeFromNow);
    if (sequenceIndex >= sliders.length) stopSequence();
  }, 0.2);

  playButton = createButton('play');
  playButton.addClass('hoverover');
  playButton.elt.type = 'button';
  playButton.elt.setAttribute('aria-label', 'Play the current tune');
  playButton.mousePressed(async () => {
    try {
      await userStartAudio();
      if (soundLoop.isPlaying) {
        stopSequence();
        announce('Tune stopped.');
      } else {
        sequenceIndex = 0;
        playButton.html('stop');
        playButton.elt.setAttribute('aria-label', 'Stop the current tune');
        soundLoop.start();
        announce('Playing the tune.');
      }
    } catch (error) {
      announce('Sound could not start. Try opening this page directly and selecting play.');
      console.error('Audio could not start:', error);
    }
  });

  generateButton = createButton('generate');
  generateButton.addClass('hoverover1');
  generateButton.elt.type = 'button';
  generateButton.elt.setAttribute('aria-label', 'Generate a new tune');
  generateButton.mousePressed(() => {
    stopSequence();
    const pattern = random(patterns);
    sliders.slice(0, 12).forEach((slider, index) => slider.value(pattern[index]));
    announce('A new tune is ready. Select play to hear it.');
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(255);
}

document.addEventListener('visibilitychange', () => {
  if (document.hidden && soundLoop) stopSequence();
});
