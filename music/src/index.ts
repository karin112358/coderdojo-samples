import * as Tone from 'tone';
import { piano } from './piano-sampler';

//const synth = new Tone.PolySynth().toDestination();
const synth = piano;

(<any>document).startMusic = async () => {
  await Tone.start();
  Tone.Transport.bpm.value = 180;

  //const time = Tone.now();

  const loopA = new Tone.Loop((time) => {
    synth.triggerAttackRelease(['c4', 'e4'], ['0:1:0', '0:1:0'], '+0');
    synth.triggerAttackRelease('F4', '0:1:0', '+0:1:0');
    synth.triggerAttackRelease('A4', '0:1:0', '+0:2:0');
    synth.triggerAttackRelease('C5', '0:1:0', '+0:3.5:0');
    //synth.triggerRelease(['D4', 'F4', 'F4', 'A4', 'C5', 'E5'], '+1n');
  }, '1n');

  loopA.start();
  Tone.Transport.start();
};

(<any>document).stopMusic = async () => {
  Tone.Transport.stop();
};
