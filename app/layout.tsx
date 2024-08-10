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
 *
 * Fetching data and sorting it...
 * Let's say we want the latest 5 invoices. We could just fetch
 * all the invoices from our database and sort through them with
 * JavaScript. The problem here is that if our data is HUGE, it'd
 * SLOW DOWN our application performance; the amount of data transferred on
 * each request is HUGE, as well as the amount of JavaScript needed for it.
 *
 * It wouldn't be efficient to sort the invoices in-memory. It's a better
 * option to use an SQL query to fetch only the latest 5 invoices
 */

/** WE NEED TO BE AWARE OF REQUEST WATERFALLS!
 *
 * A waterfall refers to a sequence of network requests that DEPEND on the completion
 * of PREVIOUS requests.
 *
 * In our case of data fetching, each request can only begin once the previous request
 * has returned data
 *
 * We need for fetchRevenue() to complete before fetchLatestInvoices() start.
 *
 * Request waterfalls are not bad per se. In fact, they're useful when you need
 * a request to fulfill a condition before you make another request.
 * Example: you might want to fetch a user's ID and profile information first.
 * Once you have the ID, you can now fetch their list of friends.
 * This is the case because fetching the list of friends DEPENDS on the
 * result of a previous request
 *
 * But, in cases where the requests don't depend on each other, you can
 * make parallel requests, which is WAY more efficient.
 *
 * In JavaScript, you can use the Promise.all() and Promise.allSettled() to
 * achieve this functionality. Besides, you can use this JavaScript pattern
 * with any library or framework.
 */

/** STATIC AND DYNAMIC RENDERING
 *
 * Remembering about the dashboard setup, there are two limitations:
 * 1. The data requests are creating an unintentional waterfall.
 * 2. Any data updates on the dashboard are NOT reflected on our application
 *
 * Static rendering?
 * Data fetching and rendering only happens on the server at BUILD time
 * This means that when a user visits your application, the cached result
 * is served. This has a couple of benefits:
 * 1. faster website
 * 2. server load is reduced.
 * 3. improved SEO
 * But remember!!! This static rendering is ONLY useful for UI with NO DATA
 * or data that is shared across users (such as blog posts or product pages)
 * Not a good idea for a dashboard that has personalized data that is regularly
 * updated though...
 *
 * Dynamic rendering?
 * The content is rendered on the server for each user at REQUEST TIME
 * Simply put, when the user visits the page
 *
 * Some of the benefits are:
 * 1. you can display real-time data or frequently updated data
 * 2. Better for personalized content, such as user profiles and
 * data based on user interactions
 * 3. You can access information that is only known at request time
 * (such as cookies or url search parameters)
 *
 * Slow data fetchings...
 * what happens if one data request is slower than all the others?
 * Well, we depend on that data fetching.
 * This means that our application is AS FAST AS OUR SLOWEST DATA FETCH
 */

/** STREAMING
 * it's a data transfer technique.
 * This allows us to break down a route into smaller chunks and progressively
 * stream them from the server to the client AS they become ready
 *
 *
 * This is good for preventing slow data requests from blocking our whole page.
 * it's good for allowing the user to see and interact with parts of the page
 * without waiting for all the data to be available
 *
 * Two ways for implementing streaming: loading.tsx file for the page
 * and <Suspense> for a specific component
 *
 * Streaming components???
 * Yes, you can defer rendering parts of the application until some condition
 * is met (data is loaded, for instance).
 * What you have to do is to wrap dynamic components in <Suspense>, then, pass
 * it a fallback component to show while the dynamic component loads
 *
 * In our specific case, we can
 */

/** ROUTE GROUPS
 *
 * We can organize files into logical groups with route groups
 * It won't affect the URL path structure. This means that the name inside
 * parentheses WON'T be included in the URL path
 *
 * Why would we use route groups in this case?
 * For ensuring that loading.tsx fallback UI ONLY applies to the dashboard
 * overview page!
 *
 * But we can also use it to separate our application into sections
 * Say, (marketing) routes and (shop) routes
 */
