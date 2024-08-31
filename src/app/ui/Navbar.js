'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { getCookie, setCookie } from "../lib/utils/cookie";
import { useRouter } from "next/navigation";

export function NavbarLayout() {
  const [userEmail, setUserEmail] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Busca o cookie do userEmail
    const email = getCookie('userEmail');
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const handleLogout = () => {
    // Remove o cookie do userEmail
    document.cookie = `userEmail=${''}; path=/;`;
    setUserEmail(null);
    router.push('auth/login'); // Redireciona para a página de login
  };

  return (
    <Navbar fluid rounded>
      <NavbarBrand as={Link} href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Assinador</span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        {userEmail ? (
          <>
            <NavbarLink as={Link} href="/profile">
              Perfil
            </NavbarLink>
            <NavbarLink as={Link} href="/docs">
              Documentos
            </NavbarLink>
            <NavbarLink as="button" onClick={handleLogout}>
              Sair
            </NavbarLink>
          </>
        ) : (
          <NavbarLink as={Link} href="auth/login">
            Entrar
          </NavbarLink>
        )}
        <NavbarLink as={Link} href="/">
          Validar
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
