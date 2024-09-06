import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 flex items-center justify-center">
      <div className="container flex flex-col lg:flex-row items-center justify-center gap-6 px-4 md:px-6 lg:gap-10">
        <div className="space-y-4 text-center lg:text-left">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Assine documentos com segurança e confiança
          </h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Nossa plataforma de assinatura digital oferece uma maneira fácil e segura de assinar documentos importantes,
            garantindo a integridade e a autenticidade de suas transações.
          </p>

          <Link href='/auth/login'>
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Iniciar assinatura
              </span>
            </button>
          </Link>
        </div>
        <div className="flex justify-center">
          <Image
            src="/digital-signature-cover.webp"
            width="550"
            height="310"
            alt="Assinatura Digital"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
          />
        </div>
      </div>
    </section>

  )
}