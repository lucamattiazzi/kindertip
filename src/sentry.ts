import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://fe2bc26d95939661ec8510342bed009e@o1106973.ingest.sentry.io/4506668633817088",
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: [/^https:\/\/kindertip\.luca\.toys/],
    }),
    new Sentry.Replay({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
