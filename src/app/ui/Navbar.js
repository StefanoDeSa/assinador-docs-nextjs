
import Link from "next/link";
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";

export function NavbarLayout() {
  return (
    <Navbar fluid rounded>
      <NavbarBrand as={Link} href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Assinador</span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink as={Link} href="/profile">
          Perfil
        </NavbarLink>
        <NavbarLink as={Link} href="/docs">
          Documentos
        </NavbarLink>
        <NavbarLink as={Link} href="/">
          Validar
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
