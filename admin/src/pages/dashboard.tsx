import React, { useEffect, useState } from 'react'
import { Header } from "../components/Header/index";
import dynamic from 'next/dynamic'
import { Flex, SimpleGrid, Box, Text,theme } from '@chakra-ui/react'
import { Sidebar } from "../components/Sidebar";
import { apiPost } from '../services/api';
import { endOfWeek, startOfWeek } from 'date-fns'

export default function Dashboard() {
  const [usersWeek, setUsersWeek] = useState([{}]);
  const [getLenghtUsers, setLenghtUsers] = useState([])
  const [calc, setCalc] = useState()

  useEffect(() => {
    async function getUsersCreatedWeek() {
      await apiPost.get('users/week')
      .then(response =>{ 
        // setLenghtUsers(response.data.map((item) => {
        //   return item
        // })
        const data = response.data.map((item) => {
          return item.total
        })
        setLenghtUsers(data)
        const soma = data?.reduce(function(soma, i) {
          return soma + i;
        });
        setCalc(soma)
      })
      .catch(err => console.error(err))
    }

    getUsersCreatedWeek()
  }, [])

  const date = new Date();

  const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
  })

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      foreColor: theme.colors.gray[500],
    },
    grid: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      type: 'datetime',
      axisBorder: {
        color: theme.colors.gray[600],
      },
      axisTricks: {
        color: theme.colors.gray[600]
      },
      categories: [
        date.toISOString(),
      ],
    },

    fill: {
      opacity: 0.3,
      type: 'gradient',
      gradient: {
        shade: 'dark',
        opacityFrom: 0.7,
        opacityTo: 0.3,
      }
    }
  }

  const series = [
    { name: 'series1', data: [getLenghtUsers.length] }
  ]

  // let date = new Date();

  // const inicioSemana =
  //   startOfWeek(date, { weekStartsOn: 0 })
  //   .toLocaleDateString('pt');
  // const fimSemana = 
  //   endOfWeek(date, { weekStartsOn: 0 })
  //   .toLocaleDateString('pt');

  // console.log('Para a data: ', date.toLocaleDateString('pt'));
  // console.log('Inicio da semanda: ', inicioSemana);
  // console.log('Fim da semanda: ', fimSemana);

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">

        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
          <Box
            p={["6", "8"]}
            bg="gray.800"
            borderRadius={8}
            pb="4"
          >
            <Text fontSize="lg" mb="4">Inscritos do dia</Text>
            {
              usersWeek &&
              <Chart options={options} series={series} type="area" height={160} />
            }
          </Box>
        </SimpleGrid>

      </Flex>

    </Flex>

  )
}