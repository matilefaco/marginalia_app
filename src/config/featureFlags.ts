import { PRODUCT_STAGE, ProductStage } from "./productStage";

export interface FeatureFlags {
  onboarding: boolean;
  originBooks: boolean;
  aura: boolean;
  literaryDNA: boolean;
  quoteCapture: boolean;
  createMargin: boolean;
  shareStudio: boolean;
  readerProfile: boolean;
  companion: boolean;
  editorialDiscovery: boolean;
  realSocialFeed: boolean;
  publicProfiles: boolean;
  publicMarginLinks: boolean;
  following: boolean;
  reactions: boolean;
  comments: boolean;
  notifications: boolean;
  realCompatibility: boolean;
  communityMuseum: boolean;
  communityEcos: boolean;
  streaks: boolean;
  weeklyRituals: boolean;
  fakeSocialProof: boolean;
  wrapped: boolean;
  soulMap: boolean;
  honors: boolean;
  internalIconShowcase: boolean;
}

const FLAGS_BY_STAGE: Record<ProductStage, FeatureFlags> = {
  "local-preview": {
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
    honors: false,
    internalIconShowcase: !!import.meta.env.DEV,
  },
  "closed-beta": {
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
    honors: false,
    internalIconShowcase: false,
  },
  "public-beta": {
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
    realSocialFeed: true,
    publicProfiles: true,
    publicMarginLinks: true,
    following: true,
    reactions: true,
    comments: true,
    notifications: true,
    realCompatibility: true,
    communityMuseum: true,
    communityEcos: true,
    streaks: true,
    weeklyRituals: true,
    fakeSocialProof: false,
    wrapped: true,
    soulMap: true,
    honors: true,
    internalIconShowcase: false,
  },
  "production": {
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
    realSocialFeed: true,
    publicProfiles: true,
    publicMarginLinks: true,
    following: true,
    reactions: true,
    comments: true,
    notifications: true,
    realCompatibility: true,
    communityMuseum: true,
    communityEcos: true,
    streaks: true,
    weeklyRituals: true,
    fakeSocialProof: false,
    wrapped: true,
    soulMap: true,
    honors: true,
    internalIconShowcase: false,
  },
};

export const featureFlags: FeatureFlags = FLAGS_BY_STAGE[PRODUCT_STAGE];

export type FeatureFlag = keyof FeatureFlags;

export function isFeatureEnabled(flag: FeatureFlag): boolean {
  return featureFlags[flag];
}
