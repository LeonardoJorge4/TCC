import React, { useContext } from 'react';
import { Button, HStack, Icon } from "@chakra-ui/react";
import { RiLogoutBoxRLine, RiUserAddLine } from "react-icons/ri";
import { AuthContext, signOut } from '../../contexts/AuthContext';
import Link from 'next/link'

export function NotificationsNav() {
  const { user, loading } = useContext(AuthContext)
  
  if(!loading && !!user === true) {
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
          <Icon as={RiUserAddLine} fontSize="20" />
        }
        <Button onClick={() => signOut()} bg="red.500" color="white">
          Sair
          <Icon as={RiLogoutBoxRLine} fontSize="20" marginLeft={1} />
        </Button>
      </HStack>
    )
  } else {
    return <></>
  }

}