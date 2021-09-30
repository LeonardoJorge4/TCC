import { Box, Flex, Text, Avatar } from "@chakra-ui/react";

interface profileProps {
  showProfileData: boolean;
}

export function Profile({showProfileData = true }:profileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
      <Box mr="4" textAlign="right">
        <Text>Leonardo Jorge</Text>
        <Text color="gray.300" fontSize="small">
          leonardoti4437@gmail.com
        </Text>
      </Box>
    )}

    <Avatar size="md" name="Leonardo Jorge" src="/images/defaultAvatar.png" />
  </Flex>
  )
}