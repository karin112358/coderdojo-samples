use_bpm 240

#live_loop :drums do
#  sample :drum_heavy_kick
#  sleep 2
#  sample :drum_snare_hard
#  sleep 2
#end

live_loop :bassorumpu do
  sample :bd_haus, amp: 2.5
  sleep 2
end

live_loop :breakbeat do
  sample :loop_breakbeat, beat_stretch: 8, amp: 3
  sleep 8
end

#live_loop :hihat do
#  sample :drum_cymbal_closed
#  sleep 0.5
#  sample :drum_cymbal_pedal
#  sleep 2
#end

melody_notes_1_4 = [:e4,:e4,:e4,   :e4,:e4,:e4,   :e4,:g4,:c4,:d4,   :e4]
melody_durations_1_4 = [1,1,2,   1,1,2,   1,1,1,1,   4]
bass_notes_1_4 = [:c3,:c3,:c3,:c3]

melody_notes_5_6 = [:f4,:f4,:f4,:f4,   :f4,:e4,:e4,:e4,:e4]
melody_durations_5_6 = [1,1,1,1,   1,1,1,0.5,0.5]
bass_notes_5_6 = [:f2,:c2]

melody_notes_7_8_v1 = [:e4,:d4,:d4,:e4,   :d4,:g4]
melody_durations_7_8_v1 = [1,1,1,1,   2,2]
bass_notes_7_8_v1 = [:d2,:g2]

melody_notes_7_8_v2 = [:g4,:g4,:f4,:d4,   :c4]
melody_durations_7_8_v2 = [1,1,1,1,   4]
bass_notes_7_8_v2 = [:g2,:c2]

define :playBass do |melody, vol = 1|
  melody.each do |n|
    d = 2
    play n, sustain: 0.9 * d, release: 0.1 * d, amp: vol
    sleep d
    
    d = 2
    play (chord n, :major)[5], sustain: 0.9 * d, release: 0.1 * d, amp: vol
    sleep d
  end
end

define :playMelody do |melody, durations, vol = 1|
  melody.zip(durations).each do |n, d|
    play n, sustain: 0.9 * d, release: 0.1 * d, amp: vol
    sleep d
  end
end

live_loop :bass do
  use_synth :bass_foundation
  
  playBass(bass_notes_1_4)
  playBass(bass_notes_5_6)
  playBass(bass_notes_7_8_v1)
  
  playBass(bass_notes_1_4)
  playBass(bass_notes_5_6)
  playBass(bass_notes_7_8_v2)
  
  use_transpose 2
end

live_loop :melody do
  use_synth :tech_saws
  
  playMelody(melody_notes_1_4, melody_durations_1_4, 1)
  playMelody(melody_notes_5_6, melody_durations_5_6, 1)
  playMelody(melody_notes_7_8_v1, melody_durations_7_8_v1, 1)
  
  playMelody(melody_notes_1_4, melody_durations_1_4, 1)
  playMelody(melody_notes_5_6, melody_durations_5_6, 1)
  playMelody(melody_notes_7_8_v2, melody_durations_7_8_v2, 1)
  
  use_transpose 2
end