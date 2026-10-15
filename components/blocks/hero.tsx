import { Container } from "@/components/layout/container";
import { WaveBackground } from "@/components/blocks/wave-background";

export function Hero() {
  return (
    <section className="relative">
      {/* 파도를 히어로 밖으로 흘린다: 위는 헤더(56px) 뒤로, 아래는 목록 영역으로. */}
      <WaveBackground className="-top-14 -bottom-40 -z-10 opacity-40" />
      <Container className="relative py-20 text-center md:py-28">
        <h1 className="bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-6xl">
          Abyssworks Studio
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg font-light tracking-wide text-muted-foreground md:text-xl">
          Solutions against the Depth of Logic
        </p>
      </Container>
    </section>
  );
}
