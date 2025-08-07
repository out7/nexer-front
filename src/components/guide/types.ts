export type Platform = "ios" | "android" | "pc";

export interface ButtonText {
  en: string;
  fa: string;
  ru: string;
}

export interface Button {
  buttonLink: string;
  buttonText: ButtonText;
}

export interface Step {
  description: ButtonText;
}

export interface InstallationStep extends Step {
  buttons: Button[];
}

export interface App {
  id: string;
  name: string;
  isFeatured: boolean;
  urlScheme: string;
  installationStep: InstallationStep;
  addSubscriptionStep: Step;
  connectAndUseStep: Step;
}
