import React, { useContext } from "react";
import { 
  Box, 
  Button, 
  Flex, 
  Heading, 
  HStack, 
  Icon, 
  Link, 
  Table, 
  Tbody, 
  Td, 
  Text, 
  Th, 
  Thead, 
  Tr, 
} from "@chakra-ui/react";
import Pagination from "react-js-pagination";
import { RiAddLine, RiPencilLine, RiDeleteBin6Line } from "react-icons/ri";
import { Header } from "../../components/Header";

import { Sidebar } from "../../components/Sidebar";
import NextLink from 'next/link';
import { apiPost } from "../../services/api";
import { PostsContext } from "../../contexts/PostsContext";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const Posts = () => {
  const router = useRouter()
  const { getAllPosts, posts } = useContext(PostsContext);

  async function deletePosts (id) {
    const formData = new FormData();
    formData.append('id', id)
    await apiPost.post('/posts/delete', formData)
    .then(response => {
      Swal.fire({
        icon: "success",
        title: response.data.success
      })
      setTimeout(() => {
        router.reload()
      }, 2000)
    })
    .catch(error => console.log(error))
  }

	return (
		<Box>
			<Header />
			<Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
				<Sidebar />
				<Box flex="1" borderRadius={8} bg="gray.800" p="8" display="flex" flexDir="column" align="center">
					<Flex mb="8" justify="space-between" align="center">
						<Heading size="lg" fontWeight="normal">
							Postagens
						</Heading>
						<NextLink href="/posts/create" passHref>
							<Button
								as="a"
								size="sm"
								fontSize="sm"
								colorScheme="pink"
								cursor="pointer"
								leftIcon={<Icon
								as={RiAddLine}
								/>}
							>
								Criar novo
              </Button>
						</NextLink>
					</Flex>

						<>
							<Table colorScheme="whiteAlpha" marginBottom="20px">
								<Thead>
									<Tr>
                    <Th>Admin id</Th>
										<Th>Título post</Th>
										<Th>Data de cadastro</Th>
                    <Th>Ações</Th>
									</Tr>
								</Thead>
								<Tbody>
                  {
                    posts?.data.map((post) => {
                      return (
                        <Tr key={post.id}>
                          <Td>
                            <Box>
                              <Link color="purple.400" onMouseEnter={() => {}}>
                                <Text fontWeight="bold">{post.admin_id}</Text>
                              </Link>
                            </Box>
                          </Td>
                          <Td>{post.title}</Td>
                          <Td>
                          {
                            new Date(post.created_at).toLocaleDateString('pt-BR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric'
                            })
                          }
                          </Td>
                          <Td>
                            <HStack spacing="10px">
                              <Button
                                as="a"
                                size="sm"
                                fontSize="sm"
                                colorScheme="blue"
                                cursor="pointer"
                                width="90px"
                                leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                                href={`/posts/update/${post.slug}`}
                              >
                                Editar
                              </Button>
                              <Button
                                as="button"
                                size="sm"
                                fontSize="sm"
                                colorScheme="red"
                                cursor="pointer"
                                alignItems="center"
                                leftIcon={<Icon as={RiDeleteBin6Line} fontSize="16" />}
                                onClick={() => deletePosts(post.id)}
                              >
                                Excluir
                              </Button>
                              </HStack>
                          </Td>
                        </Tr>
                      )
                    })
                  }
								</Tbody>
							</Table>
							{/* <Pagination
								totalCount={data.totalCount}
								currentPage={page}
								onPageChange={setPage}
							/> */}
              {
              posts &&
              <Pagination 
                activePage={posts.current_page}
                totalItemsCount={posts.total}
                itemsCountPerPage={posts.per_page}
                onChange={(pageNumber) => getAllPosts(pageNumber)}
                itemClass="page-item"
                linkClass="page-link"
              />
              }

						</>
					
				</Box>
			</Flex>
		</Box>
	)
}

export default Posts;