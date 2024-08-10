import DashboardSkeleton from "../ui/skeletons";

export default function Loading() {
  return <DashboardSkeleton />;
}

/** There are a couple of things that are happening...
 *
 * 1. While the page content is loading, you can show the contents of
 * loading.tsx. Basically, loading.tsx is fallback UI
 * 2. SideNav is static. This is why it's shown immediately. The user
 * can interact with SideNav while the dashboard page is still loading
 * 3. The user doesn't have to wait for the page to finish loading before
 * navigating away
 */
