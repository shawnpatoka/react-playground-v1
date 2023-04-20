import { useState, useEffect } from 'react'
import Spinner from '../components/Spinner'
import api from '../services/api-client'
import { useToast, Box } from '@chakra-ui/react'
import { Link } from 'react-router-dom'




function TicketsOpen() {
  const [tickets, setTickets] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const toast = useToast()

  const showToast = (message) => {
    toast({
      position: 'bottom-left',
      render: () => (
        <Box color='white' p={3} bg='red.500'>
          {message}
        </Box>
      ),
    })
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/tickets/')
        setTickets(response.data)
        setIsLoading(false)
      } catch (error) {
        showToast(error.message)
      }
    }
    setTimeout(() => { fetchPosts() }, 500)

  }, [])




  return (
    <>
      <h1>Open Tickets</h1>
      <hr />
      {isLoading && <Spinner />}
      {tickets.length < 1 && <p>No Tickets</p>}
      {tickets.map((item) => (
        <Link to={"/tickets/" + item.id} key={item.id}><div className="card card-body mb-3">{item.client} - {item.location}</div></Link>
      ))}
    </>
  )
}

export default TicketsOpen