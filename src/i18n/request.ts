import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const [common, landing, spreads, screens] = await Promise.all([
    import(`../../messages/${locale}/common.json`),
    import(`../../messages/${locale}/landing.json`),
    import(`../../messages/${locale}/spreads.json`),
    import(`../../messages/${locale}/screens.json`),
  ]);

  return {
    locale,
    messages: {
      common: common.default,
      landing: landing.default,
      spreads: spreads.default,
      screens: screens.default,
    },
  };
});
