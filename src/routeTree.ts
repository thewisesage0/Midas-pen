import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import { RootLayout } from "@/routes/__root";
import { HomePage } from "@/routes/index";
import { BooksPage } from "@/routes/books";
import { CoversPage } from "@/routes/covers";
import { ReviewsPage } from "@/routes/reviews";
import { AboutPage } from "@/routes/about";
import { AuthPage } from "@/routes/auth";
import { ManhwaListPage } from "@/routes/manhwa.index";
import { ManhwaDetailPage } from "@/routes/manhwa.$id";
import { ManhwaChapterPage } from "@/routes/manhwa.$id.$chapter";
import { LibraryPage } from "@/routes/library";
import { ProfilePage } from "@/routes/profile";
import { AdminLayout } from "@/routes/admin";
import { AdminDashboard } from "@/routes/admin.index";
import { AdminManhwaPage } from "@/routes/admin.manage";
import { AdminChapterPage } from "@/routes/admin.chapter";
import { AdminCommentsPage } from "@/routes/admin.comments";
import { NotFoundPage } from "@/routes/not-found";
import { type QueryClient } from "@tanstack/react-query";

const rootRoute = createRootRoute({ component: RootLayout, notFoundComponent: NotFoundPage });

const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: "/", component: HomePage });
const booksRoute = createRoute({ getParentRoute: () => rootRoute, path: "/books", component: BooksPage });
const coversRoute = createRoute({ getParentRoute: () => rootRoute, path: "/covers", component: CoversPage });
const reviewsRoute = createRoute({ getParentRoute: () => rootRoute, path: "/reviews", component: ReviewsPage });
const aboutRoute = createRoute({ getParentRoute: () => rootRoute, path: "/about", component: AboutPage });
const authRoute = createRoute({ getParentRoute: () => rootRoute, path: "/auth", component: AuthPage });
const libraryRoute = createRoute({ getParentRoute: () => rootRoute, path: "/library", component: LibraryPage });
const profileRoute = createRoute({ getParentRoute: () => rootRoute, path: "/profile", component: ProfilePage });

const manhwaRoute = createRoute({ getParentRoute: () => rootRoute, path: "/manhwa", component: ManhwaListPage });
const manhwaDetailRoute = createRoute({ getParentRoute: () => rootRoute, path: "/manhwa/$id", component: ManhwaDetailPage });
const manhwaChapterRoute = createRoute({ getParentRoute: () => rootRoute, path: "/manhwa/$id/$chapter", component: ManhwaChapterPage });

const adminRoute = createRoute({ getParentRoute: () => rootRoute, path: "/admin", component: AdminLayout });
const adminIndexRoute = createRoute({ getParentRoute: () => adminRoute, path: "/", component: AdminDashboard });
const adminManageRoute = createRoute({ getParentRoute: () => adminRoute, path: "/manage", component: AdminManhwaPage });
const adminChapterRoute = createRoute({ getParentRoute: () => adminRoute, path: "/chapter", component: AdminChapterPage });
const adminCommentsRoute = createRoute({ getParentRoute: () => adminRoute, path: "/comments", component: AdminCommentsPage });

export const routeTree = rootRoute.addChildren([
  indexRoute,
  booksRoute,
  coversRoute,
  reviewsRoute,
  aboutRoute,
  authRoute,
  libraryRoute,
  profileRoute,
  manhwaRoute,
  manhwaDetailRoute,
  manhwaChapterRoute,
  adminRoute.addChildren([
    adminIndexRoute,
    adminManageRoute,
    adminChapterRoute,
    adminCommentsRoute,
  ]),
]);

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter<typeof routeTree, "never", { queryClient: QueryClient }>>
  }
}
