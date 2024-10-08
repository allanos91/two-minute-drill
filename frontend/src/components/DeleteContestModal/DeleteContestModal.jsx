import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { removeContest } from '../../store/contests';
import {useIsDeletedObj} from '../../context/IsDeleted'

const DeleteContestModal = (contestId) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal();
    const { setIsDeleted} = useIsDeletedObj()
    const onClick = () => {
        dispatch(removeContest(contestId.contestId))
        .then(setIsDeleted(true))
        .then(closeModal())
    }

    const onClickClose = () => {
        return closeModal()
    }

    return (
        <>
        <div className="confirmation-dialog">
        <h1>Confirm Delete</h1>
        <h2>Are you sure you want to remove this contest?</h2>
        <div className='options'>
            <button onClick={onClick}>Yes</button>
            <button onClick={onClickClose}>No</button>
        </div>
        </div>
        </>
    )
}

export default DeleteContestModal
