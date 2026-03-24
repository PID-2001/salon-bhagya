import { ImageResponse } from "next/og";
import Logo from "@/public/Logo.png";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const deploymentUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

const logoSrc = new URL(Logo.src, deploymentUrl).toString();

export default function Image() {

  return new ImageResponse(
    (
      <div
        style={{
          background: "radial-gradient(circle at top, #1b1b1b, #040404)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(5, 5, 5, 0.65)",
            padding: "32px 48px",
            borderRadius: 999,
          }}
        >
          <img
            src={logoSrc}
            width={240}
            height={240}
            alt="THE ONE | Salon Bhagya logo"
            style={{ objectFit: "contain" }}
          />
        </div>
        <p
          style={{
            fontSize: 48,
            letterSpacing: 6,
            color: "#f5f0e6",
          }}
        >
          THE ONE · SALON BHAGYA
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
