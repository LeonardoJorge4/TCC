import React, { useContext } from 'react';
import { HStack, Icon } from "@chakra-ui/react";
import { RiNotificationLine, RiUserAddLine } from "react-icons/ri";
import { AuthContext } from '../../contexts/AuthContext';
import Link from 'next/link'

export function NotificationsNav() {
  const { user } = useContext(AuthContext)
  
  return (
    <HStack 
    spacing={["6", "8"]}
    mx={["6", "8"]}
    pr={["6", "8"]}
    py="1"
    color="gray.300"
    borderRightWidth={1}
    borderColor="gray.700"
    >
      {
        user.role === 'master' &&
        <Link href="/admin/create">
          <Icon as={RiUserAddLine} fontSize="20" />
        </Link>
      }
    </HStack>
  )
}