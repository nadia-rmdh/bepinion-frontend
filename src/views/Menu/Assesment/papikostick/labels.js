export const groupingLabel = {
  F: { category: "Followership", color: "#e53935" },
  W: { category: "Followership", color: "#e53935" },
  N: { category: "Work Direction", color: "#8e24aa" },
  G: { category: "Work Direction", color: "#8e24aa" },
  A: { category: "Work Direction", color: "#8e24aa" },
  L: { category: "Leadership", color: "#3949ab" },
  P: { category: "Leadership", color: "#3949ab" },
  I: { category: "Leadership", color: "#3949ab" },
  T: { category: "Activity", color: "#039be5" },
  V: { category: "Activity", color: "#039be5" },
  X: { category: "Social Nature", color: "#00897b" },
  S: { category: "Social Nature", color: "#00897b" },
  B: { category: "Social Nature", color: "#00897b" },
  O: { category: "Social Nature", color: "#00897b" },
  C: { category: "Work Style", color: "#7cb342" },
  D: { category: "Work Style", color: "#7cb342" },
  R: { category: "Work Style", color: "#7cb342" },
  Z: { category: "Temperament", color: "#fb8c00" },
  E: { category: "Temperament", color: "#fb8c00" },
  K: { category: "Temperament", color: "#fb8c00" },
};

export const colorsByIndex = Object.keys(groupingLabel).map(
  (label) => groupingLabel[label].color
);
