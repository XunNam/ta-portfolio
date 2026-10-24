"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const BADGE_URL =
  "https://spotifystats.com/badge/c15237fc5206d23f570839d492859976a55763bb.svg";

export default function SpotifyBadge() {
  const [src, setSrc] = useState(BADGE_URL);

  useEffect(() => {
    // Generate the cache key after hydration, since the Footer can be prerendered.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSrc(`${BADGE_URL}?t=${Date.now()}`);
  }, []);

  return (
    <Image
      src={src}
      alt="Now playing on Spotify"
      width={480}
      height={104}
      unoptimized
      style={{ maxWidth: "100%", height: "auto" }}
    />
  );
}
