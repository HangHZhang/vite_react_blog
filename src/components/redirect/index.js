import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import PropTypes from 'prop-types'

function Redirect({to}) {
    const navigate = useNavigate()
    useEffect(() => {
        navigate(to, {replace: true})
    })
    return null
}

Redirect.prototype = {
    to: PropTypes.string.isRequired
}

export default Redirect