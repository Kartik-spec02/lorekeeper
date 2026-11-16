import type {
  ArcDataPoint,
  CanonWarning,
  Character,
  PipelineResult,
  Scene,
} from "./types";

export const characters: Character[] = [
  {
    id: "char-mira",
    name: "Mira",
    description:
      "The Archive's youngest apprentice. Sharp, clipped speech; never wastes a syllable. Carries a brass key on a cord around her neck.",
    lastSeenLocation: "The Grand Archive, Hall of Whispers",
    voiceSamples: [
      "We don't open what isn't ours to read.",
      "The ink is still wet. Give it an hour.",
      "If the Duke wants his letter back, he should have written it in a language that survives.",
    ],
  },
  {
    id: "char-duke-aldric",
    name: "Duke Aldric",
    description:
      "Noble exile, presumed traitor. Speaks in measured, courtly cadences with a faint Velnori lilt. Always wears a signet of blackened silver.",
    lastSeenLocation: "Velnor, the Ashen Gate — three days' ride east",
    voiceSamples: [
      "Some debts are paid in silence, not coin.",
      "Tell Mira the letter was never hers to keep.",
      "History remembers the victors. It forgets the witnesses.",
    ],
  },
  {
    id: "item-stolen-letter",
    name: "The Stolen Letter",
    description:
      "A wax-sealed dispatch addressed to Duke Aldric, intercepted by Mira in the Archive's night drop. Its contents could rewrite the succession.",
    lastSeenLocation: "Mira's satchel, Archive vault 3",
    voiceSamples: [],
  },
];

export const scenes: Scene[] = [
  {
    id: "scene-001",
    title: "The Archive at Dusk",
    content:
      "Mira closed the vault door behind her with the care of a woman sealing a tomb. The letter lay on the oak lectern, its black wax unbroken, its seal staring at her like a single lidless eye. Three days. That was how long it had taken the courier from Velnor to reach the capital — three days during which the Duke could have been anywhere, or nowhere at all. She touched the cord at her throat and felt the brass key grow warm.\n\nOutside, the Archive's bells tolled the ninth hour. Inside, the silence argued with her. She knew what the Duke would say if he found her here: that curiosity was just cowardice wearing better clothes. She also knew he would be wrong. This was not curiosity. This was inventory.",
    characters: ["Mira"],
    emotionalBeat: 4,
  },
  {
    id: "scene-002",
    title: "The Duke Returns",
    content:
      "The Duke entered the Hall of Whispers as though he owned it, which, strictly speaking, he did not. His cloak carried the smell of road dust and rain that had not fallen. Mira did not move from behind the lectern; the letter was in her satchel now, and she would not pretend otherwise.\n\n'Aldric,' she said. The name came out flatter than she intended.\n\n'Mira.' He inclined his head, and the signet caught the lamplight. 'You've kept something of mine.'\n\n'I kept something of the realm,' she replied. 'The difference matters.'\n\nHe smiled the way a blade smiles before it is drawn. 'Then let us discuss the difference, before someone else writes the next chapter without us.'",
    characters: ["Mira", "Duke Aldric"],
    emotionalBeat: 8,
  },
];

export const canonWarnings: CanonWarning[] = [
  {
    id: "warn-001",
    severity: "high",
    message:
      "Duke Aldric was last seen in Velnor — three days' ride east — but appears here in the capital without recorded travel.",
    relatedCharacter: "Duke Aldric",
  },
  {
    id: "warn-002",
    severity: "medium",
    message:
      "Mira's dialogue voice shifted: clipped, terse diction in Scene 1 vs. fuller, more formal cadence in Scene 2. Consistency risk flagged.",
    relatedCharacter: "Mira",
  },
];

export const arcData: ArcDataPoint[] = [
  { sceneId: "scene-001", sceneTitle: "Scene 1", emotionalBeat: 3 },
  { sceneId: "scene-002", sceneTitle: "Scene 2", emotionalBeat: 5 },
  { sceneId: "scene-003", sceneTitle: "Scene 3", emotionalBeat: 4 },
  { sceneId: "scene-004", sceneTitle: "Scene 4", emotionalBeat: 7 },
  { sceneId: "scene-005", sceneTitle: "Scene 5", emotionalBeat: 6 },
  { sceneId: "scene-006", sceneTitle: "Scene 6", emotionalBeat: 8 },
  { sceneId: "scene-007", sceneTitle: "Scene 7", emotionalBeat: 9 },
  { sceneId: "scene-008", sceneTitle: "Scene 8", emotionalBeat: 7 },
];

export const mockPipelineResult: PipelineResult = {
  scene: scenes[1],
  warnings: canonWarnings,
  voiceFidelityScore: 71,
  arcData,
};