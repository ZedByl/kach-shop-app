import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getIsLogIn, getUserLoadingStatus, loadCurrentUser } from '../../store/user'

const AppLoader = ({ children }: any) => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(getIsLogIn())
    const usersStatus = useSelector(getUserLoadingStatus)
    useEffect(() => {
        if (isLoggedIn) dispatch(loadCurrentUser())
    }, [isLoggedIn])

    if (!usersStatus) return 'loading'
    return children
}

export default AppLoader
