import type { DrumPattern } from "../types/music";

// Default drum patterns available in the library
export const defaultDrumPatterns: DrumPattern[] = [
    {
        id: "basic-beat-1",
        name: "Basic Beat",
        category: "basic",
        measures: 1,
        kick: [
            true, false, false, false,  // Beat 1
            false, false, false, false, // Beat 2
            true, false, false, false,  // Beat 3
            false, false, false, false, // Beat 4
        ],
        snare: [
            false, false, false, false, // Beat 1
            true, false, false, false,  // Beat 2
            false, false, false, false, // Beat 3
            true, false, false, false,  // Beat 4
        ],
        hihat: [
            true, false, true, false,   // Beat 1
            true, false, true, false,   // Beat 2
            true, false, true, false,   // Beat 3
            true, false, true, false,   // Beat 4
        ],
    },
    {
        id: "rock-beat-1",
        name: "Rock Beat 1",
        category: "rock",
        measures: 1,
        kick: [
            true, false, false, false,  // Beat 1
            false, false, true, false,  // Beat 2
            false, false, false, false, // Beat 3
            false, false, true, false,  // Beat 4
        ],
        snare: [
            false, false, false, false, // Beat 1
            true, false, false, false,  // Beat 2
            false, false, false, false, // Beat 3
            true, false, false, false,  // Beat 4
        ],
        hihat: [
            true, false, true, false,   // Beat 1
            true, false, true, false,   // Beat 2
            true, false, true, false,   // Beat 3
            true, false, true, false,   // Beat 4
        ],
    },
    {
        id: "rock-beat-2",
        name: "Rock Beat 2",
        category: "rock",
        measures: 1,
        kick: [
            true, false, false, false,  // Beat 1
            true, false, false, false,  // Beat 2
            true, false, false, false,  // Beat 3
            false, false, true, false,  // Beat 4
        ],
        snare: [
            false, false, false, false, // Beat 1
            true, false, false, false,  // Beat 2
            false, false, false, false, // Beat 3
            true, false, false, false,  // Beat 4
        ],
        hihat: [
            true, false, true, false,   // Beat 1
            true, false, true, false,   // Beat 2
            true, false, true, false,   // Beat 3
            true, false, true, false,   // Beat 4
        ],
    },
    {
        id: "pop-beat-1",
        name: "Pop Beat 1",
        category: "pop",
        measures: 1,
        kick: [
            true, false, false, false,  // Beat 1
            false, false, false, false, // Beat 2
            true, false, false, true,   // Beat 3
            false, false, false, false, // Beat 4
        ],
        snare: [
            false, false, false, false, // Beat 1
            true, false, false, false,  // Beat 2
            false, false, false, false, // Beat 3
            true, false, false, false,  // Beat 4
        ],
        hihat: [
            true, true, true, true,     // Beat 1
            true, true, true, true,     // Beat 2
            true, true, true, true,     // Beat 3
            true, true, true, true,     // Beat 4
        ],
    },
];
