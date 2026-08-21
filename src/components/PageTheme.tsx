/* Declares which colour scheme a page runs on.

   It renders nothing visible — just a marker the stylesheet keys off with
   `:root:has([data-page-theme="…"])`, which lands the variables on :root and so
   re-themes the nav and footer too, even though those render outside the page
   tree in the root layout.

   Deliberately CSS rather than a client effect stamping <html>: this way the
   theme is already in the server-rendered HTML, so a dark page paints dark on
   first frame instead of flashing white and correcting itself once JS boots.
   It also costs no JavaScript at all.

   Safe because template.tsx is enter-only — the App Router swaps the tree on
   navigation, so exactly one page's marker is ever in the document. */
export type ThemeName =
  | "bookdirect"
  | "sales-brain"
  | "websites"
  | "work"
  | "care";

export default function PageTheme({ name }: { name: ThemeName }) {
  return <div data-page-theme={name} hidden />;
}
