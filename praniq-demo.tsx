import { useState, useEffect } from 'react';
import { Heart, Sparkles, User, Brain, Smile, Activity, MapPin, Timer, Check, RefreshCw } from 'lucide-react';

interface Technique {
  name: string;
  duration: number;
  steps: string;
}

const PRANIQ = () => {
  const [step, setStep] = useState('welcome');
  const [profile, setProfile] = useState({ name: '', age: '', gender: '' });
  const [selectedThoughts, setSelectedThoughts] = useState<string[]>([]);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [selectedBehaviors, setSelectedBehaviors] = useState<string[]>([]);
  const [stressLevel, setStressLevel] = useState(0);
  const [location, setLocation] = useState('');
  const [selectedTechnique, setSelectedTechnique] = useState<Technique | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const thoughts = {
    'Personal': ['Feeling overwhelmed', 'Self-doubt', 'Emotional confusion', 'Low confidence'],
    'Physical': ['Constant fatigue', 'Sleep problems', 'Body tension', 'Low energy'],
    'Academic': ['Exam pressure', 'Fear of failure', 'Heavy workload', 'Performance anxiety'],
    'Social': ['Peer pressure', 'Fear of judgment', 'Feeling left out', 'Social anxiety']
  };

  const emotions = ['Anxiety', 'Sadness', 'Confusion', 'Guilt', 'Fear', 'Pressure', 'Frustration', 
    'Hopelessness', 'Irritability', 'Exhaustion', 'Restlessness', 'Low mood', 'Loneliness', 
    'Insecurity', 'Embarrassment', 'Rejection'];

  const behaviors = ['Overthinking', 'Withdrawal', 'Crying easily', 'Mood swings', 'Procrastination',
    'Overstudying', 'Avoiding classes', 'Test anxiety', 'Sleep changes', 'Low activity',
    'Appetite changes', 'Frequent rest', 'Social withdrawal', 'Avoiding interactions',
    'People-pleasing', 'Conflict with peers'];

  const techniques = {
    'Breathwork': [
      { name: 'Deep Breathing', duration: 300, steps: '1. Sit comfortably\n2. Breathe in slowly through nose for 4 counts\n3. Hold for 4 counts\n4. Exhale slowly through mouth for 6 counts\n5. Repeat 5-10 times' },
      { name: 'Kapalbhati', duration: 180, steps: '1. Sit with spine straight\n2. Take deep breath in\n3. Forcefully exhale through nose\n4. Allow passive inhalation\n5. Repeat 20-30 times' },
      { name: 'Alternate Nostril', duration: 300, steps: '1. Close right nostril, inhale left\n2. Close both, hold briefly\n3. Open right, exhale\n4. Inhale right\n5. Switch and repeat 5-10 times' }
    ],
    'Meditation': [
      { name: 'Om Chanting', duration: 300, steps: '1. Sit comfortably\n2. Close eyes\n3. Take deep breath\n4. Chant OM prolonged\n5. Feel vibrations in body\n6. Repeat 10-15 times' },
      { name: 'So-Ham', duration: 420, steps: '1. Sit quietly\n2. Breathe naturally\n3. Think So on inhale\n4. Think Ham on exhale\n5. Continue 5-7 minutes' },
      { name: 'Micro Meditation', duration: 120, steps: '1. Pause where you are\n2. Take 3 conscious breaths\n3. Notice body sensations\n4. Acknowledge thoughts\n5. Return to present moment' }
    ],
    'Movement': [
      { name: 'Mini Sun-Salutation', duration: 300, steps: '1. Stand tall, hands in prayer\n2. Reach arms up\n3. Fold forward\n4. Half-lift, lengthen spine\n5. Return to standing\n6. Repeat 3-5 times' },
      { name: 'Chair Yoga', duration: 240, steps: '1. Sit on edge of chair\n2. Stretch arms overhead\n3. Twist gently left then right\n4. Forward fold over legs\n5. Breathe into stretches' },
      { name: 'Shavasana', duration: 600, steps: '1. Lie on back\n2. Arms at sides, palms up\n3. Close eyes\n4. Relax every body part\n5. Stay still 10 minutes' }
    ],
    'Grounding': [
      { name: 'Trataka', duration: 300, steps: '1. Light a candle\n2. Gaze at flame steadily\n3. Try not to blink\n4. When eyes water, close them\n5. Visualize flame internally' },
      { name: '5-4-3-2-1 Grounding', duration: 180, steps: '1. Name 5 things you see\n2. Name 4 things you touch\n3. Name 3 things you hear\n4. Name 2 things you smell\n5. Name 1 thing you taste' },
      { name: 'Self-Soothing', duration: 240, steps: '1. Place hand on heart\n2. Feel warmth and heartbeat\n3. Breathe gently\n4. Send kindness to yourself\n5. Hold for 3-4 minutes' }
    ],
    'Therapeutic': [
      { name: 'Laughter Therapy', duration: 180, steps: '1. Stand or sit comfortably\n2. Start fake laughing Ha ha ha\n3. Let it become natural\n4. Laugh from belly\n5. Continue for 3 minutes' },
      { name: 'Mindful Water', duration: 120, steps: '1. Hold glass of water\n2. Observe it mindfully\n3. Sip slowly\n4. Feel coolness in mouth\n5. Notice all sensations' }
    ],
    'Cognitive': [
      { name: 'Affirmations', duration: 180, steps: '1. Choose positive statement\n2. Say aloud or mentally\n3. Believe in the words\n4. Repeat 10 times\n5. Feel the positive shift' },
      { name: 'Gratitude', duration: 180, steps: '1. Think of 3 things grateful for\n2. Feel the appreciation\n3. Visualize each one clearly\n4. Notice how you feel\n5. Smile and take deep breath' }
    ]
  };

  const affirmations = [
    "I am calm and balanced.",
    "I have the power to find solutions.",
    "I am growing stronger every moment.",
    "I trust my journey.",
    "I am filled with peace and courage.",
    "I can turn challenges into opportunities.",
    "I am doing my best.",
    "I am worthy of love and support.",
    "I accept my emotions.",
    "I am safe in this moment."
  ];

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      setStep('completion');
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startTechnique = (technique: Technique) => {
    setSelectedTechnique(technique);
    setTimeLeft(technique.duration);
    setStep('technique-practice');
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    if (selectedTechnique) {
      setTimeLeft(selectedTechnique.duration);
      setIsTimerRunning(false);
    }
  };

  return (
    <div className="font-sans">
      {step === 'welcome' && (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="mb-8">
              <Sparkles className="w-20 h-20 mx-auto text-white mb-4 animate-bounce" />
            </div>
            <h1 className="text-7xl font-bold text-white mb-4 tracking-wider">
              PRANIQ
            </h1>
            <p className="text-2xl text-white mb-8">
              Your Journey to Inner Peace
            </p>
            <button
              onClick={() => setStep('profile')}
              className="bg-white text-purple-600 px-12 py-4 rounded-full text-xl font-semibold hover:scale-110 transition-transform duration-300 shadow-2xl"
            >
              Begin Your Journey
            </button>
          </div>
        </div>
      )}

      {step === 'profile' && (
        <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center p-4">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 max-w-md w-full">
            <User className="w-16 h-16 mx-auto text-purple-600 mb-6" />
            <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">Tell Us About You</h2>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="w-full p-4 rounded-xl border-2 border-purple-300 focus:border-purple-600 outline-none transition-all"
              />
              
              <input
                type="number"
                placeholder="Your Age"
                value={profile.age}
                onChange={(e) => setProfile({...profile, age: e.target.value})}
                className="w-full p-4 rounded-xl border-2 border-purple-300 focus:border-purple-600 outline-none transition-all"
              />
              
              <select
                value={profile.gender}
                onChange={(e) => setProfile({...profile, gender: e.target.value})}
                className="w-full p-4 rounded-xl border-2 border-purple-300 focus:border-purple-600 outline-none transition-all"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>

            <button
              onClick={() => profile.name && profile.age && profile.gender && setStep('thoughts')}
              disabled={!profile.name || !profile.age || !profile.gender}
              className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 'thoughts' && (
        <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 p-4 py-8">
          <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8">
            <Brain className="w-16 h-16 mx-auto text-indigo-600 mb-4" />
            <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">What is on Your Mind?</h2>
            
            {Object.entries(thoughts).map(([category, items]) => (
              <div key={category} className="mb-6">
                <h3 className="text-xl font-semibold text-purple-700 mb-3">{category} Stress</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {items.map(item => (
                    <button
                      key={item}
                      onClick={() => {
                        setSelectedThoughts(prev => 
                          prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
                        );
                      }}
                      className={`p-4 rounded-xl text-left transition-all ${
                        selectedThoughts.includes(item)
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white scale-105'
                          : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={() => selectedThoughts.length > 0 && setStep('emotions')}
              disabled={selectedThoughts.length === 0}
              className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:scale-105 transition-transform disabled:opacity-50"
            >
              Next: Emotions
            </button>
          </div>
        </div>
      )}

      {step === 'emotions' && (
        <div className="min-h-screen bg-gradient-to-br from-pink-400 via-rose-400 to-orange-400 p-4 py-8">
          <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8">
            <Heart className="w-16 h-16 mx-auto text-rose-600 mb-4" />
            <h2 className="text-3xl font-bold text-center text-rose-600 mb-6">How Are You Feeling?</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {emotions.map(emotion => (
                <button
                  key={emotion}
                  onClick={() => {
                    setSelectedEmotions(prev => 
                      prev.includes(emotion) ? prev.filter(e => e !== emotion) : [...prev, emotion]
                    );
                  }}
                  className={`p-4 rounded-xl transition-all ${
                    selectedEmotions.includes(emotion)
                      ? 'bg-gradient-to-r from-rose-600 to-orange-600 text-white scale-105'
                      : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                  }`}
                >
                  {emotion}
                </button>
              ))}
            </div>

            <button
              onClick={() => selectedEmotions.length > 0 && setStep('behaviors')}
              disabled={selectedEmotions.length === 0}
              className="w-full mt-6 bg-gradient-to-r from-rose-600 to-orange-600 text-white py-4 rounded-xl font-semibold hover:scale-105 transition-transform disabled:opacity-50"
            >
              Next: Behaviors
            </button>
          </div>
        </div>
      )}

      {step === 'behaviors' && (
        <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-400 to-indigo-400 p-4 py-8">
          <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8">
            <Activity className="w-16 h-16 mx-auto text-blue-600 mb-4" />
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Recent Behaviors</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {behaviors.map(behavior => (
                <button
                  key={behavior}
                  onClick={() => {
                    setSelectedBehaviors(prev => 
                      prev.includes(behavior) ? prev.filter(b => b !== behavior) : [...prev, behavior]
                    );
                  }}
                  className={`p-4 rounded-xl text-left transition-all ${
                    selectedBehaviors.includes(behavior)
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white scale-105'
                      : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                  }`}
                >
                  {behavior}
                </button>
              ))}
            </div>

            <button
              onClick={() => selectedBehaviors.length > 0 && setStep('stress-level')}
              disabled={selectedBehaviors.length === 0}
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:scale-105 transition-transform disabled:opacity-50"
            >
              Next: Stress Level
            </button>
          </div>
        </div>
      )}

      {step === 'stress-level' && (
        <div className="min-h-screen bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 p-4 flex items-center justify-center">
          <div className="max-w-2xl w-full bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8">
            <Smile className="w-16 h-16 mx-auto text-orange-600 mb-4" />
            <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">Stress Level</h2>
            
            <div className="space-y-4 mb-8">
              {[1, 2, 3, 4, 5].map(level => (
                <button
                  key={level}
                  onClick={() => setStressLevel(level)}
                  className={`w-full p-6 rounded-xl text-left transition-all flex items-center justify-between ${
                    stressLevel === level
                      ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white scale-105'
                      : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                  }`}
                >
                  <span className="text-lg font-semibold">
                    {level === 1 && 'Not at all stressed'}
                    {level === 2 && 'Slightly stressed'}
                    {level === 3 && 'Moderately stressed'}
                    {level === 4 && 'Very stressed'}
                    {level === 5 && 'Extremely stressed'}
                  </span>
                  <span className="text-3xl">{level}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => stressLevel > 0 && setStep('location')}
              disabled={stressLevel === 0}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 rounded-xl font-semibold hover:scale-105 transition-transform disabled:opacity-50"
            >
              Next: Location
            </button>
          </div>
        </div>
      )}

      {step === 'location' && (
        <div className="min-h-screen bg-gradient-to-br from-green-400 via-teal-400 to-cyan-400 p-4 flex items-center justify-center">
          <div className="max-w-xl w-full bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8">
            <MapPin className="w-16 h-16 mx-auto text-teal-600 mb-4" />
            <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">Where Are You?</h2>
            
            <div className="space-y-4">
              {['Home', 'School', 'Social Settings'].map(loc => (
                <button
                  key={loc}
                  onClick={() => setLocation(loc)}
                  className={`w-full p-6 rounded-xl text-lg font-semibold transition-all ${
                    location === loc
                      ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white scale-105'
                      : 'bg-teal-100 text-teal-800 hover:bg-teal-200'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>

            <button
              onClick={() => location && setStep('techniques')}
              disabled={!location}
              className="w-full mt-6 bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-4 rounded-xl font-semibold hover:scale-105 transition-transform disabled:opacity-50"
            >
              Get Techniques
            </button>
          </div>
        </div>
      )}

      {step === 'techniques' && (
        <div className="min-h-screen bg-gradient-to-br from-violet-400 via-purple-400 to-fuchsia-400 p-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-2">
                Perfect Techniques for You, {profile.name}
              </h2>
              <p className="text-white/90 text-lg">Choose what feels right in this moment</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(techniques).map(([category, techs]) => (
                <div key={category} className="space-y-4">
                  <h3 className="text-white font-bold text-xl bg-white/20 backdrop-blur-md p-3 rounded-xl">
                    {category}
                  </h3>
                  {techs.map(tech => (
                    <button
                      key={tech.name}
                      onClick={() => startTechnique(tech)}
                      className="w-full bg-white/90 backdrop-blur-md p-4 rounded-xl text-left hover:scale-105 transition-transform shadow-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-purple-800">
                          {tech.name}
                        </span>
                        <Timer className="w-5 h-5 text-purple-600" />
                      </div>
                      <span className="text-sm text-purple-600">
                        {Math.floor(tech.duration / 60)} min
                      </span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 'technique-practice' && selectedTechnique && (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4 flex items-center justify-center">
          <div className="max-w-2xl w-full bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">
              {selectedTechnique.name}
            </h2>

            <div className="mb-8 text-center">
              <div className="text-8xl font-bold text-purple-600 mb-4 animate-pulse">
                {formatTime(timeLeft)}
              </div>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={toggleTimer}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:scale-110 transition-transform"
                >
                  {isTimerRunning ? 'Pause' : 'Start'}
                </button>
                <button
                  onClick={resetTimer}
                  className="bg-gray-500 text-white px-8 py-3 rounded-full font-semibold hover:scale-110 transition-transform flex items-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" /> Reset
                </button>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-2xl mb-6">
              <h3 className="font-bold text-purple-800 mb-3 text-lg">How to Practice:</h3>
              <pre className="whitespace-pre-wrap text-purple-700 leading-relaxed font-sans">
                {selectedTechnique.steps}
              </pre>
            </div>

            <button
              onClick={() => {
                setIsTimerRunning(false);
                setStep('techniques');
              }}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
            >
              Choose Another Technique
            </button>
          </div>
        </div>
      )}

      {step === 'completion' && (
        <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-green-400 to-teal-400 p-4 flex items-center justify-center">
          <div className="max-w-2xl w-full bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center">
            <div className="mb-6">
              <Check className="w-20 h-20 mx-auto text-green-600 animate-bounce" />
            </div>
            
            <h2 className="text-4xl font-bold text-green-600 mb-4">
              Wonderful, {profile.name}!
            </h2>
            
            <p className="text-xl text-gray-700 mb-8">
              You have completed the practice. Take a moment to notice how you feel.
            </p>

            <div className="bg-gradient-to-r from-green-500 to-teal-500 p-8 rounded-2xl mb-8 shadow-xl">
              <p className="text-2xl text-white font-semibold leading-relaxed">
                {affirmations[Math.floor(Math.random() * affirmations.length)]}
              </p>
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => setStep('techniques')}
                className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform"
              >
                Try Another Technique
              </button>
              <button
                onClick={() => {
                  setStep('welcome');
                  setProfile({ name: '', age: '', gender: '' });
                  setSelectedThoughts([]);
                  setSelectedEmotions([]);
                  setSelectedBehaviors([]);
                  setStressLevel(0);
                  setLocation('');
                }}
                className="bg-white text-green-600 border-2 border-green-600 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform"
              >
                Start Fresh Journey
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PRANIQ;