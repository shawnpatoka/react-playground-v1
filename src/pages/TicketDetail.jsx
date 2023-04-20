import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from '../services/api-client'
import Spinner from "../components/Spinner"
import {
  Editable, EditableTextarea, EditablePreview, IconButton, useEditableControls, ButtonGroup, Tooltip, useToast, Box, Textarea
} from '@chakra-ui/react'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'



function TicketDetail() {
  const { id } = useParams()
  const [ticket, setTicket] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const toast = useToast()



  function EditableControls() {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton
          icon={<CloseIcon boxSize={3} />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : null;
  }



  const showToast = (message, status) => {
    if (status === 'error') {
      toast({
        position: 'bottom-left',
        render: () => (
          <Box color='white' p={3} bg='red.500'>
            {message}
          </Box>
        ),
      })
    } else {
      toast({
        position: 'bottom-left',
        render: () => (
          <Box color='white' p={3} bg='green.500'>
            {message}
          </Box>
        ),
      })
    }
  }



  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/tickets/' + id)
        setTicket(response.data)
      } catch (error) {
        showToast(error.message)
      }
    }
    fetchPosts()
    setIsLoading(false)
  }, [])


  const handleChange = (event) => {
    const { name, value } = event.target
    setTicket({ ...ticket, [name]: value })
  }

  const handleSaveClick = async (key, value) => {
    const newTicket = { ...ticket, [key]: value }
    try {
      const response = await api.put('/tickets/' + id, newTicket)
      if (response.status === 200) {
        showToast("Work Order Has Been Updated!", 'success')
      }
    } catch (error) {
      showToast(error.message, 'error')
    }
  }


  if (!ticket) {
    return <Spinner />
  }
  else {
    return (
      <>
        <h1>Detail</h1>
        <p>ID: {id}</p>
        <p>Location: {ticket.client}</p>
        <p>Location: {ticket.location}</p>
        <p>Assigned To: {ticket.assigned_to.first_name} {ticket.assigned_to.last_name}</p>
        <hr />
        <label><strong>Job Details</strong></label>
        <Editable
          defaultValue={ticket.description}
          isPreviewFocusable={true}
          selectAllOnFocus={false}
          onSubmit={(value) => handleSaveClick("description", value)}
          border={{ border: '1px solid black' }}
        >
          <Tooltip label="Click to Edit" shouldWrapChildren={false} placement='top-end' gutter={-25} width='100%'>
            <EditablePreview whiteSpace="pre-wrap" overflowWrap="anywhere" px={4} py={2} width="100%" className="editablebox" />
          </Tooltip>
          <EditableTextarea py={2} px={4} as={Textarea} name='description' value={ticket.description} id="description" style={{ height: '200px' }} />
          <EditableControls />
        </Editable>

        <hr />
        <label><strong>Work Completed</strong></label>
        <Editable
          defaultValue={ticket.work_completed}
          isPreviewFocusable={true}
          selectAllOnFocus={false}
          onSubmit={(value) => handleSaveClick("work_completed", value)}
          border={{ border: '1px solid black' }}
        >
          <Tooltip label="Click to Edit" shouldWrapChildren={false} placement='top-end' gutter={-25} width='100%'>
            <EditablePreview whiteSpace="pre-wrap" overflowWrap="anywhere" px={4} py={2} width="100%" className="editablebox" />
          </Tooltip>
          <EditableTextarea py={2} px={4} as={Textarea} name='work_completed' value={ticket.work_completed} id="work_completed" style={{ height: '200px' }} />
          <EditableControls />
        </Editable>
      </>
    )
  }
}

export default TicketDetail