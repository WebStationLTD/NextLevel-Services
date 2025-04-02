import Image from "next/image";
import Link from "next/link";
import { getServices } from "../../services/services";

// Добавяне на ISR ревалидиране на всеки час
export const revalidate = 3600;

export const metadata = {
  title: 'Услуги - Адвокатско дружество "Бурков, Радев, Дюлгерска"',
  description:
    'Разгледайте правните услуги, които предлага Адвокатско дружество "Бурков, Радев, Дюлгерска". Специализираме в търговско, гражданско, наказателно и административно право, като осигуряваме експертни решения и индивидуален подход към всеки клиент.',
};

export default async function Services() {
  try {
    const services = await getServices();

    if (!services || services.length === 0) {
      return (
        <p className="text-gray-600 text-center mt-10">
          В момента няма налични услуги!
        </p>
      );
    }

    return (
      <>
        <div className="bg-white">
          <div className="mx-auto max-w-10/10 py-0 sm:px-6 sm:py-0 lg:px-0">
            <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-12 text-center shadow-2xl sm:px-12">
              <h1 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
                Нашите услуги
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-300">
                Разгледайте нашите професионални услуги и открийте как можем да
                ви помогнем.
              </p>

              <svg
                viewBox="0 0 1024 1024"
                aria-hidden="true"
                className="absolute -top-50 left-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              >
                <circle
                  r={512}
                  cx={512}
                  cy={512}
                  fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
                  fillOpacity="0.7"
                />
                <defs>
                  <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                    <stop stopColor="#95161C" />
                    <stop offset={1} stopColor="#95161C" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white py-12 sm:py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto w-full">
              <div className="flex flex-col mt-8 space-y-20 lg:mt-8 lg:space-y-20">
                {services.map((service, index) => (
                  <Link
                    href={`/services/${service.slug}`}
                    className="flex mt-8 mb-8 w-full max-w-full"
                    key={service.id}
                    prefetch={true}
                  >
                    <article className="relative isolate flex flex-col gap-8 lg:flex-row w-[100%]">
                      <div className="relative aspect-video sm:aspect-2/1 lg:aspect-square lg:w-64 lg:shrink-0">
                        <Image
                          width={256}
                          height={256}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          quality={85}
                          priority={index === 0}
                          loading={index === 0 ? "eager" : "lazy"}
                          alt={service.title.rendered}
                          src={
                            service.yoast_head_json?.og_image?.[0]?.url ||
                            "/placeholder.webp"
                          }
                          className="absolute inset-0 size-full rounded-2xl bg-gray-50 object-cover"
                          format="webp"
                        />
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="flex items-center gap-x-4 text-xs">
                          <time
                            dateTime={service.date}
                            className="text-gray-500"
                          >
                            {new Date(service.date).toLocaleDateString()}
                          </time>
                        </div>
                        <div className="group relative max-w-[100%]">
                          <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                            <span className="absolute inset-0" />
                            {service.title.rendered}
                          </h3>
                          <p className="mt-5 text-md/6 text-gray-600">
                            {service.content.rendered
                              ? service.content.rendered
                                  .replace(/<[^>]+>/g, "")
                                  .substring(0, 450) + "..."
                              : "Описание не е налично"}
                          </p>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    return (
      <p className="text-gray-600 text-center mt-10">
        Неуспешно зареждане на услугите!
      </p>
    );
  }
}
