import { Suspense } from "react";
import ShopTrackClient from "./ShopTrackClient";

export const runtime = "edge";

export default function WhiteLabelTrackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-bg">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        </div>
      }
    >
      <ShopTrackClient />
    </Suspense>
  );
}
