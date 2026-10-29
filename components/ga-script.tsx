const measurementId = process.env.NEXT_PUBLIC_GA_ID;

export function GAScript() {
  if (!measurementId) return null;

  const measurementIdJson = JSON.stringify(measurementId);

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} />
      <script
        id="ga4-init"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', ${measurementIdJson});
          `
        }}
      />
    </>
  );
}
