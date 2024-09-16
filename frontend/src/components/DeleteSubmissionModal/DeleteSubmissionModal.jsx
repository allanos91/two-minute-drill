import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import {deleteSubmission} from '../../store/submissions'
import {useIsDeletedObj} from '../../context/IsDeleted'
import "./DeleteSubmission.css"

const DeleteSubmissionModal = (submissionId) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal();
    const { setIsDeleted} = useIsDeletedObj()
    const onClick = () => {
        dispatch(deleteSubmission(submissionId.submissionId))
        .then(closeModal)
        .then(setIsDeleted(true))
    }

    const onClickClose = () => {
        return closeModal()
    }

    return (
        <>
  <div className="confirmation-dialog">
    <h1>Confirm Delete</h1>
    <h2>Are you sure you want to delete this submission?</h2>
    <div className="options">
      <button onClick={onClick}>Yes</button>
      <button onClick={onClickClose}>No</button>
    </div>
  </div>
</>
    )
}

export default DeleteSubmissionModal
