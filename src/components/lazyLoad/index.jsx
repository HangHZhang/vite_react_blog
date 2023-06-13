import {lazy,Suspense} from 'react'

export default lazyLoad = path => {
    const LazyModule = lazy(() => import(path))
    return(
        <Suspense fallback='component is loading...'>
            <LazyModule/>
        </Suspense>
    )
}