require("dotenv").config();
const mongoose = require("mongoose");

const QuestionPaper = require("../models/QuestionPaper");

const MONGO_URI = process.env.MONGO_URI;

const ECE_VACANCY_ID = "69ed594e53bf76fdd9c689c6";

const eceTechnicalPaper = {
  vacancyId: ECE_VACANCY_ID,
  testType: "TECHNICAL",
  title: "Technical Test - Scientist B Electronics and Communication",
  durationMinutes: 40,
  isCommon: false,
  questions: [
    {
      question: "Which component stores electric charge?",
      options: ["Resistor", "Capacitor", "Inductor", "Diode"],
      correctAnswer: "Capacitor",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "What is the unit of capacitance?",
      options: ["Ohm", "Farad", "Henry", "Tesla"],
      correctAnswer: "Farad",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which law relates voltage, current, and resistance?",
      options: ["Kirchhoff's Law", "Ohm's Law", "Faraday's Law", "Lenz's Law"],
      correctAnswer: "Ohm's Law",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "In a PN junction diode, current flows easily under which bias?",
      options: ["Reverse bias", "Forward bias", "Zero bias", "Breakdown only"],
      correctAnswer: "Forward bias",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which device is commonly used for signal amplification?",
      options: ["Transistor", "Resistor", "Capacitor", "Fuse"],
      correctAnswer: "Transistor",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "What does LED stand for?",
      options: [
        "Light Emitting Diode",
        "Low Energy Device",
        "Linear Electronic Diode",
        "Light Energy Detector",
      ],
      correctAnswer: "Light Emitting Diode",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which material is commonly used as a semiconductor?",
      options: ["Copper", "Silicon", "Aluminium", "Iron"],
      correctAnswer: "Silicon",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "What is the function of a rectifier?",
      options: [
        "Convert AC to DC",
        "Convert DC to AC",
        "Store electric charge",
        "Amplify sound only",
      ],
      correctAnswer: "Convert AC to DC",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which modulation changes the amplitude of the carrier signal?",
      options: [
        "Amplitude Modulation",
        "Frequency Modulation",
        "Phase Modulation",
        "Pulse Code Modulation",
      ],
      correctAnswer: "Amplitude Modulation",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which modulation changes the frequency of the carrier signal?",
      options: [
        "AM",
        "FM",
        "PCM",
        "PWM",
      ],
      correctAnswer: "FM",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "What is the main purpose of an antenna?",
      options: [
        "Radiate or receive electromagnetic waves",
        "Store binary data",
        "Convert AC to DC",
        "Increase resistance",
      ],
      correctAnswer: "Radiate or receive electromagnetic waves",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which theorem states that a linear bilateral network can be replaced by an equivalent voltage source and series resistance?",
      options: [
        "Thevenin's Theorem",
        "Norton's Theorem",
        "Maximum Power Transfer Theorem",
        "Superposition Theorem",
      ],
      correctAnswer: "Thevenin's Theorem",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "Which theorem replaces a network by an equivalent current source and parallel resistance?",
      options: [
        "Thevenin's Theorem",
        "Norton's Theorem",
        "Millman's Theorem",
        "Tellegen's Theorem",
      ],
      correctAnswer: "Norton's Theorem",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "In digital electronics, which gate gives output 1 only when all inputs are 1?",
      options: ["OR", "AND", "XOR", "NOR"],
      correctAnswer: "AND",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which logic gate gives output 1 when inputs are different?",
      options: ["AND", "OR", "XOR", "NAND"],
      correctAnswer: "XOR",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which flip-flop is commonly used as a basic memory element?",
      options: ["SR Flip-Flop", "Only OR Gate", "Only Resistor", "Zener Diode"],
      correctAnswer: "SR Flip-Flop",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "Which number system is used internally by digital computers?",
      options: ["Decimal", "Binary", "Roman", "Octal only"],
      correctAnswer: "Binary",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "What is the binary equivalent of decimal 10?",
      options: ["1010", "1001", "1110", "1100"],
      correctAnswer: "1010",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which device converts analog signals into digital form?",
      options: ["ADC", "DAC", "Rectifier", "Oscillator"],
      correctAnswer: "ADC",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which device converts digital signals into analog form?",
      options: ["ADC", "DAC", "Multiplexer", "Demultiplexer"],
      correctAnswer: "DAC",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "What does bandwidth represent in communication systems?",
      options: [
        "Range of frequencies occupied by a signal",
        "Only signal voltage",
        "Only antenna height",
        "Only resistance value",
      ],
      correctAnswer: "Range of frequencies occupied by a signal",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "Which noise is caused by random motion of electrons due to temperature?",
      options: ["Thermal Noise", "Shot Noise", "Impulse Noise", "Quantization Noise"],
      correctAnswer: "Thermal Noise",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "Which communication technique samples, quantizes, and encodes an analog signal?",
      options: ["PCM", "FM", "AM", "ASK"],
      correctAnswer: "PCM",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "Which filter allows low frequencies to pass and attenuates high frequencies?",
      options: [
        "Low Pass Filter",
        "High Pass Filter",
        "Band Stop Filter",
        "All Pass Filter",
      ],
      correctAnswer: "Low Pass Filter",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which filter allows high frequencies to pass and attenuates low frequencies?",
      options: [
        "High Pass Filter",
        "Low Pass Filter",
        "Band Pass Filter",
        "Notch Filter",
      ],
      correctAnswer: "High Pass Filter",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "What is the unit of frequency?",
      options: ["Hertz", "Volt", "Ampere", "Ohm"],
      correctAnswer: "Hertz",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which instrument is used to measure voltage?",
      options: ["Voltmeter", "Ammeter", "Ohmmeter", "Wattmeter"],
      correctAnswer: "Voltmeter",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which instrument is used to measure current?",
      options: ["Ammeter", "Voltmeter", "Oscilloscope only", "Frequency meter only"],
      correctAnswer: "Ammeter",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "In control systems, what does feedback help improve?",
      options: [
        "Stability and accuracy",
        "Only wire length",
        "Only component color",
        "Only battery size",
      ],
      correctAnswer: "Stability and accuracy",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "Which device is used to observe waveform shapes?",
      options: ["Oscilloscope", "Ohmmeter", "Galvanometer", "Thermometer"],
      correctAnswer: "Oscilloscope",
      marks: 1,
      difficulty: "EASY",
    },
  ],
};

async function seedEceTechnicalPaper() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    if (ECE_VACANCY_ID === "PASTE_ECE_VACANCY_ID_HERE") {
      throw new Error("Please paste the ECE vacancy _id in ECE_VACANCY_ID");
    }

    await QuestionPaper.findOneAndUpdate(
      {
        vacancyId: ECE_VACANCY_ID,
        testType: "TECHNICAL",
      },
      eceTechnicalPaper,
      {
        upsert: true,
        new: true,
        runValidators: true,
      }
    );

    console.log("ECE technical question paper seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err.message);
    process.exit(1);
  }
}

seedEceTechnicalPaper();