use_bpm 160

# DRUMS
define :play_drums do
  counter = 0
  live_loop :drums do
    counter = counter + 1
    sample :drum_heavy_kick
    sleep 1.5
    sample :drum_heavy_kick
    sleep 2
    sample :drum_heavy_kick
    sleep 0.5
    
    sample :drum_heavy_kick
    sleep 2.5
    sample :drum_heavy_kick
    
    if (counter % 2 == 1)
      sleep 1.5
    else
      sleep 1
      sample :drum_heavy_kick
      sleep 0.5
    end
  end
end


# SNARE
define :play_snare do
  live_loop :snare do
    sleep 1
    sample :drum_snare_hard
    sleep 1
  end
end


# SPLASH
define :play_splash do
  live_loop :splash do
    sample :drum_splash_hard, sustain: 1, release: 0.5, amp: 0.5
    sleep 8
  end
end


# BASS
define :play_bass do
  in_thread do
    sleep 16
    
    live_loop :bass do
      sleep 0.5
      play_bass_note(-3,0.5)
      play_bass_note(-3,1)
      play_bass_note(-3,2)
      
      play_bass_note(-3, 1)
      play_bass_note(-3, 1.5)
      play_bass_note(-3, 0.5)
      play_bass_note(-3, 0.5)
      play_bass_note(0, 0.5)
      
      sleep 0.5
      play_bass_note(0, 0.5)
      play_bass_note(0, 1)
      play_bass_note(0, 2)
      
      play_bass_note(0, 1)
      play_bass_note(0, 1.5)
      play_bass_note(0, 0.5)
      play_bass_note(0, 0.5)
      play_bass_note(-7, 0.5)
      
      sleep 1
      play_bass_note(-5, 1)
      play_bass_note(-5, 5.5)
      play_bass_note(-7, 0.5)
      
      sleep 1
      play_bass_note(-5, 1)
      play_bass_note(-5, 5)
      play_bass_note(-5, 1)
    end
  end
end


define :play_bass_note do |pitch, duration|
  amp = 1
  if pitch != 0
    amp = 4
  end
  
  sample :bass_voxy_hit_c, pitch: pitch, amp: amp
  sleep duration
end

# CHORDS
define :play_chords do
  in_thread do
    sleep 48
    
    use_synth :sine
    
    live_loop :chords do
      play chord(:a3, :minor, invert: 1), duration: 6, amp: 0.5
      sleep 8
      
      play chord(:c4, :major, invert: 0), duration: 6, amp: 0.5
      sleep 8
      
      play chord(:g3, :major, invert: 1), duration: 6, amp: 0.5
      sleep 8
      
      play chord(:g3, :major, invert: 1), duration: 6, amp: 0.5
      sleep 8
    end
  end
end


# VOICE
define :play_voice do
  in_thread do
    #use_synth :tri
    #use_synth :supersaw
    use_synth :tech_saws
    use_synth_defaults attack: 0.1
    
    sleep 12
    
    sleep 2
    # I stay out too late
    play_voice_notes([:d5, :b4, :a4, :g4, :b4], [0.5, 0.5, 0.5, 0.5, 4])
    
    sleep 1.5
    # got nothing in my brain
    play_voice_notes([:d4, :d5, :b4, :a4, :g4, :b4], [0.5, 0.5, 0.5, 0.5, 0.5, 4])
    
    sleep 2
    # that's what people
    play_voice_notes([:d5, :b4, :a4, :g4], [0.5, 0.5, 0.5, 0.5])
    # say
    play_voice_notes([:b4, :a4, :g4, :e4, :d4], [0.5, 0.5, 2, 1, 1])
    
    sleep 1
    # that's what people
    play_voice_notes([:d5, :b4, :a4, :g4], [0.5, 0.5, 0.5, 0.5])
    # say
    play_voice_notes([:b4, :a4, :g4, :e4, :d4], [0.5, 0.5, 2, 1, 1])
    
    # I go on too many dates
    play_voice_notes([:d4, :d4, :d5, :b4, :a4, :g4, :b4], [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 4])
    
    sleep 1.5
    # but I can't make them stay
    play_voice_notes([:d4, :d5, :b4, :a4, :g4, :b4], [0.5, 0.5, 0.5, 0.5, 0.5, 4])
    
    sleep 0.5
    # at least that's what people
    play_voice_notes([:d4, :d4, :d5, :b4, :a4, :g4], [0.5, 1, 0.5, 0.5, 0.5, 0.5])
    # say
    play_voice_notes([:b4, :a4, :g4, :e4, :d4], [0.5, 0.5, 2, 1, 1])
    
    sleep 1
    # that's what people
    play_voice_notes([:d5, :b4, :a4, :g4], [0.5, 0.5, 0.5, 0.5])
    # say
    play_voice_notes([:b4, :a4, :g4, :e4, :d4], [0.5, 0.5, 2, 1, 1])
    
    # but I keep cruising
    play_voice_notes([:b4, :a4, :g4, :a4, :e4], [1, 1, 1, 2, 2])
    
    # can't stop, won't stop moving
    play_voice_notes([:a4, :b4, :a4, :g4, :a4, :e4], [1, 1, 1, 1, 2, 1.5])
    
    # It's like I got this music
    play_voice_notes([:e4, :a4, :b4, :a4, :g4, :a4, :g4], [0.5, 1, 1, 1, 1, 2, 2])
    
    # in my mind
    play_voice_notes([:a4, :b4, :g4], [1, 1, 1])
    
    # saying it's gonna be alright
    play_voice_notes([:e4, :g4, :a4, :a4, :b4, :a4, :g4, :g4], [0.5, 0.5, 1, 0.5, 0.5, 0.5, 1, 1.5])
    sleep 3
    
    # players gonna play, play, play, play, play
    play_voice_notes([:a4, :a4, :a4, :b4, :g4, :e4, :d4, :b3, :a3], [0.5, 0.5, 0.5, 0.5, 1, 1, 1, 1, 1])
    
    # and the haters gonna hate, hate, hate, hate, hate
    play_voice_notes([:g3, :g3, :a4, :a4, :a4, :b4, :g4, :e4, :d4, :b3, :a3], [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 1, 1, 1, 1, 1])
    
    # baby I'm just gonna shake, shake, shake, shake, shake
    play_voice_notes([:g3, :g3, :a4, :a4, :a4, :b4, :g4, :e4, :d4, :b3, :a3], [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 1, 1, 1, 1, 1])
    
    # I shake it off, shake it off
    play_voice_notes([:g4 ,:a4, :b4, :g4, :a4, :b4, :g4], [1, 0.5, 0.5, 2, 0.5, 0.5, 1])
    sleep 2
    
    # hartbreakers gonna break, break, break, break, break
    play_voice_notes([:g3, :a4, :a4, :a4, :b4, :g4, :e4, :d4, :b3, :a3], [1, 0.5, 0.5, 0.5, 0.5, 1, 1, 1, 1, 1])
    
    # and the fakers gonna fake, fake, fake, fake fake
    play_voice_notes([:g3, :g3, :a4, :a4, :a4, :b4, :g4, :e4, :d4, :b3, :a3], [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 1, 1, 1, 1, 1])
    
    # baby I'm just gonna shake, shake, shake, shake, shake
    play_voice_notes([:g3, :g3, :a4, :a4, :a4, :b4, :g4, :e4, :d4, :b3, :a3], [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 1, 1, 1, 1, 1])
    
    # I shake it off, shake it off
    play_voice_notes([:g4 ,:a4, :b4, :g4, :a4, :b4, :g4], [1, 0.5, 0.5, 2, 0.5, 0.5, 1])
    sleep 2
  end
end


define :play_voice_notes do |notes, durations|
  notes.length.times do |i|
    play note(notes[i])
    sleep durations[i]
  end
end

play_drums
play_snare
play_splash
play_bass
play_chords
play_voice



