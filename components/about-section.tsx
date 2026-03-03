import Image from "next/image";
import type { Profile } from "@/types/profile";
import profileData from "@/data/profile.json";

const profile: Profile = profileData;

export function AboutSection() {
  return (
    <section id="about" className="border-t border-border">
      <div className="mx-auto max-w-[1100px] px-6 py-12 md:py-14">
        <h2 className="mb-8 text-xl font-semibold tracking-tight text-foreground">
          Sobre mí
        </h2>

        <div className="flex flex-col items-start gap-8 md:flex-row md:gap-12">
          <div className="flex-shrink-0">
            <div className="relative h-44 w-44 overflow-hidden rounded-xl border border-border md:h-52 md:w-52">
              <Image
                src={profile.hero_image_path}
                alt={`Foto de ${profile.name}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 176px, 208px"
              />
            </div>
          </div>

          <div className="flex-1">
            <p className="leading-relaxed text-muted-foreground">
              Soy un desarrollador fullstack con enfoque en construir productos digitales
              que resuelven problemas reales. Mi especialidad es combinar frontends
              intuitivos con backends robustos usando React y NestJS, siempre priorizando
              la arquitectura limpia y el código mantenible.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Me diferencio por mi capacidad de entender el problema de negocio antes de
              escribir código. Diseño soluciones escalables desde el día uno, con testing,
              documentación y procesos de CI/CD que permiten iterar rápido sin sacrificar
              calidad. Trabajo cómodo tanto en startups como en equipos establecidos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
