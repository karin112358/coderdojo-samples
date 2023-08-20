use_bpm 110

define :play_note do |note, duration, vol = 1|
  play note, sustain: 0.9 * duration, release: 0.1 * duration, amp: vol
  sleep duration
end

define :play_melody do |melody, durations, vol = 1|
  melody.zip(durations).each do |n, d|
    play_note(n, d, vol)
  end
end

define :play_pattern_1 do |notes, synth = :piano, vol = 1|
  in_thread do
    4.times do |index|
      2.times do
        play_note(notes[index][0], 1, vol)
        play_note(notes[index][0], 0.5, vol)
        play_note(notes[index][0], 0.5, vol)
        play_note(notes[index][1], 1, vol)
        play_note(notes[index][1], 0.5, vol)
        play_note(notes[index][1], 0.5, vol)
      end
    end
  end
end

define :play_pattern_2 do |notes, synth = :base_foundation, vol = 1|
  in_thread do
    4.times do |index|
      16.times do
        play_note(notes[index], 0.5, vol)
      end
    end
  end
end

# SNAP
define :snap do |sample = :perc_snap, vol = 1|
  live_loop :snap do
    sleep 1
    sample sample
    sleep 1
    sleep 1
    sample sample
    sleep 1
  end
end

# DRUMS
define :drums do |sample = :drum_cymbal_pedal, vol = 1|
  live_loop :drums do
    8.times do
      sample sample
      sleep 0.5
    end
  end
end

# MELODY
define :melody do |synth = :fm, vol = 1|
  use_synth synth
  melody_notes = [:e5,:e5,:d5,:a4,   :e5,:e5,:fs5,:d5,:b4,   :e5,:e5,:fs5,:d5,:b4,   :cs5,:d5,:cs5,:b4,
                  :fs5,:e5,:b4,   :fs5,:g5,:fs5,:e5,:d5,   :cs5,:d5,:b4,:cs5,:d5,   :cs5,:a4]
  melody_durations = [2,0.5,1,0.5,   0.5,0.5,0.5,1.5,1,   0.5,0.5,0.5,2,0.5,   0.5,0.5,0.5,2.5,
                      2,1.5,0.5,   0.5,0.5,0.5,2,0.5,   0.5,1,0.5,1,1,   0.5,3.5]
  
  play_melody(melody_notes, melody_durations, vol)
end

with_transpose -12 do
  
  snap(:perc_snap2, 1)
  drums(:drum_cymbal_pedal, 0.5)
  # SOPRANO
  play_pattern_1([[:g5,:fs5],[:g5,:fs5],[:a5,:g5],[:fs5,:e5]], :piano, 1)
  # MEZZO
  play_pattern_1([[:e5,:d5],[:e5,:d5],[:fs5,:e5],[:d5,:cs5]], :piano, 1)
  # ALTO
  play_pattern_1([[:d5,:a4],[:b4,:fs4],[:d5,:e5],[:a4,:a4]], :piano, 1)
  # TENOR
  play_pattern_2([:fs4,:fs4,:g4,:e4], :piano, 1)
  # BASS
  play_pattern_2([:d4,:b3,:g3,:a3], :piano, 1)
  # MELODY
  melody(:piano, 5)
  
end


