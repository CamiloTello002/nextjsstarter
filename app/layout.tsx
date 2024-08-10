import "@/app/ui/global.css";
import { inter } from "./ui/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}

/** PARTIAL RENDERING.
 *
 *  When navigating through pages, the layouts don't re-render, but pages do. This is called partial rendering
 *
 *  Only the route segments that change re-render on the client. Any shared segments don't render
 *
 *  Navigating from dashboard/analytics to dashboard/settings will only cause the settings page to render.
 *  The dashboard shared layout WON'T render
 *
 *  Without re-rendering, we'd have FULL render of the page, which increases the amount of data transferred
 *  and execution time, which worsens the performance.
 */

/** ROOT LAYOUT
 *
 * The root layout is defined at the top level of the app folder. This layout
 * is applied to ALL ROUTES.
 *
 * Also, this layout is absolutely MANDATORY and this must contain the html
 * and body tags.
 *
 * This also means that any UI you add to this layout will be visible across
 * ALL PAGES
 *
 * Inside this root layout is where we modify our html and body tags, as well
 * as defining metadata.
 */

/** CONCEPTS
 *
 * Colocation: Adding folders and files inside the app folder that are not
 * visible to the user.
 *
 * Partial rendering: rendering only the UI that changes
 *
 * Root layout: mandatory UI that is shared across ALL pages
 */

/** NAVIGATION BETWEN PAGES
 *
 * Traditionally, we use <a> tags for navigating between pages. However, there's
 * something here happening: a full page reload happens, ON EACH PAGE NAVIGATION
 *
 * But, when you use the Link tag, the navigation no longer makes an entire
 * page reload. Why?
 *
 * - CODE-SPLITTING AND PREFETCHING
 *
 * Next.js code splits our application by route segments. This differs from
 * SPA where the browser loads ALL application code on initial load
 *
 * when we split the code into routes, that piece of code is isolated.
 * The good part of this isolation is that if a page doesn't work, the
 * other pages still do.
 *
 * Whenever there's a Link tag in the browser's viewport, Next.js will
 * PREFETCH the code for the linked route in the BACKGROUND
 * The upside of this is that when the user clicks on the link, the page
 * will be loaded near-instant. This gives an awesome user experience
 */

/** SHOWING AN ACTIVE LINK
 *
 * it's common to indicate on the UI what page you're on, and in order to achieve this
 * you need the current URL path.
 *
 * In this case, Next.js provides us the usePathname() hook, which allows to
 * achieve this functionality
 *
 * Since this is a hook, you need to indicate that the hook is a client component
 */

/** FETCHING DATA
 *
 * One way to take internal data and show it is by using hardcoded data (right in your code), but that's not
 * simply a good way to persist it. You need a database.
 *
 * But you can't just fetch data from your frontend... That would expose sensitive data!
 *
 * Here's where APIs come into play. It's an intermediary layer between the application data and
 * our database. These are some cases where you'd prefer to use an API:
 *
 * 1. You're using 3rd party services that PROVIDE an API
 * 2. You're fetching data from the client-side. You can't just make queries from the client side!
 * You need some extra layer for making those queries
 */

/** MORE ABOUT SERVER COMPONENTS
 *
 * Reember that Next.js use server components by default. With these server components, we can fetch
 * data directly to the database. This might be a new approach, and has some benefits:
 *
 * 1. They support promises. This means you can use async/await without reaching for useEffect, useState
 * or other fetching libraries (such as axios)
 * 2. Since these server components are rendered on the server, the expensive data fetches and logic is kept on the
 * server and NOT on the client. We only send the result to the client. That's it.
 * 3. You can query to the database WITHOUT an additional API layer
 */

/** WHY SQL
 *
 * We're using SQL in this case, but why?
 * 1. It's the industry standard for querying relational databases
 * 2. It helps you to buttress your relational databases fundamentals, which
 * are transferrable to other tools that use SQL as well.
 */
