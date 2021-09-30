import { Stack } from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine, RiUserAddLine } from "react-icons/ri";
import { IoIosCreate } from "react-icons/io"
import { BsFilePost } from "react-icons/bs";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">

      <NavSection title="GERAL">
        <NavLink icon={RiDashboardLine} href="/dashboard">Dashboard</NavLink>
        <NavLink icon={RiUserAddLine} href="/admin/create">Criar Admin</NavLink>
      </NavSection>

      <NavSection title="POSTAGENS">
        <NavLink icon={BsFilePost} href="/posts">Todas as postagens</NavLink>
        <NavLink icon={IoIosCreate} href="/posts/create">Criar Post</NavLink>
      </NavSection>

    </Stack>
  )
}