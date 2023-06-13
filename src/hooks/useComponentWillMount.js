import { useRef } from "react"

const useComponentWillMount =  callback => {
    const willMount = useRef(true)
    if (willMount.current) callback()
    willMount.current = false
    return callback()
}
export default useComponentWillMount