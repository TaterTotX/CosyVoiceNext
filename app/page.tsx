// app/page.tsx
import AudioPlayer from "@/app/components/AudioPlayer/AudioPlayer";

export default function Home() {
  return (
      <main className="min-h-screen bg-gray-50">
        <AudioPlayer />
      </main>
  );
}