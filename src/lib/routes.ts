/* Routes that render as complete standalone sites and supply their own header,
   footer and layout. The studio's Nav/Footer must stay off them: prospects are
   meant to see a client site, not a studio page, and several of these
   pages use fixed positioning that breaks inside the shared <main> wrapper. */
export const STANDALONE_ROUTES = [
  "/party",
  "/plumbing",
  "/construction",
  "/spa",
  "/accountant",
  "/cosmetics",
  "/beauty",
  "/hopshollow",
  "/busahouse",
];

export function isStandaloneRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  return STANDALONE_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}
