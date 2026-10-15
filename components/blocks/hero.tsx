import { Container } from "@/components/layout/container";
import { WaveBackground } from "@/components/blocks/wave-background";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <WaveBackground className="opacity-40" />
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
