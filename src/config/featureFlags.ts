export const featureFlags = {
  onboarding: true,
  originBooks: true,
  aura: true,
  literaryDNA: true,
  quoteCapture: true,
  createMargin: true,
  shareStudio: true,
  readerProfile: true,
  companion: true,

  editorialDiscovery: true,

  realSocialFeed: false,
  publicProfiles: false,
  publicMarginLinks: false,
  following: false,
  reactions: false,
  comments: false,
  notifications: false,
  realCompatibility: false,
  communityMuseum: false,
  communityEcos: false,

  streaks: false,
  weeklyRituals: false,
  fakeSocialProof: false,

  wrapped: true,
  soulMap: true,

  internalIconShowcase: !!(import.meta as any).env?.DEV,
} as const;

export type FeatureFlag = keyof typeof featureFlags;

/**
 * Check if a specific feature is enabled.
 */
export function isFeatureEnabled(flag: FeatureFlag): boolean {
  return featureFlags[flag];
}
