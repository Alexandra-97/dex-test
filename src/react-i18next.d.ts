import { resources } from "./core/i18n/i18n";

declare module "react-i18next" {
  type DefaultResources = typeof resources["en"];
  interface Resources extends DefaultResources {}
}
