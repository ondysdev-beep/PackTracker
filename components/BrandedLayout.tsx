"use client";

import { ReactNode } from "react";
import { Shop } from "@/types/shop";

interface BrandedLayoutProps {
  shop: Shop;
  children: ReactNode;
}

export default function BrandedLayout({ shop, children }: BrandedLayoutProps) {
  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border bg-surface1">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-4">
          {shop.logoUrl ? (
            <img
              src={shop.logoUrl}
              alt={shop.name}
              className="h-8 w-auto"
            />
          ) : (
            <span
              className="font-syne text-xl font-bold"
              style={{ color: shop.primaryColor }}
            >
              {shop.name}
            </span>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>

      <footer className="border-t border-border py-6 text-center">
        <p className="text-xs text-text-muted">
          Sledování zásilek zajišťuje{" "}
          <a
            href="https://trackflow.cz"
            className="text-accent hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            TrackFlow
          </a>
        </p>
      </footer>
    </div>
  );
}
