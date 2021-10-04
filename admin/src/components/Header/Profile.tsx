import React, { useContext } from 'react';
import { Box, Flex, Text, Avatar } from "@chakra-ui/react";
import { AuthContext } from '../../contexts/AuthContext';

interface profileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData = true }: profileProps) {
  const { user } = useContext(AuthContext)

  return (
    <Flex align="center">
      {showProfileData && (
      <Box mr="4" textAlign="right">
        <Text>{user.name}</Text>
        <Text color="gray.300" fontSize="small">
          {user.email}
        </Text>
      </Box>
    )}

    <Avatar 
      size="md"
      name={user.name}
      src={!user.image ? "/images/avatar/defaultAvatar.png" : `/images/avatar/${user.image}`}
    />
  </Flex>
  )
}