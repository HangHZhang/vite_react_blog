
import {Navigate} from 'react-router-dom'

import Home from '../pages/home/home'
// import Article from '../pages/article/article'
import ArticleList from '../pages/article/article-list/article-list'
import ArticleCreate from '../pages/article/article-create/article-create'
// import Category from '../pages/category/category'
import CategoryList from '../pages/category/category-list/category-list'
import CategoryCreate from '../pages/category/category-create/category-create'
import User from '../pages/user/user'
import Charts from '../pages/charts/charts'

const router =  [
    {
        path: '/home',
        element: <Home/>,
    },
    {
        path: '/article',
        children: [
            {
                path: '/article/List',
                element: <ArticleList/>,
            },
            {
                path: '/article/create',
                element: <ArticleCreate/>,
            }
        ]
    },
    {
        path: '/category',
        children: [
            {
                path: '/category/List',
                element: <CategoryList/>,
            },
            {
                path: '/category/create',
                element: <CategoryCreate/>,
            }
        ]
    },
    {
        path: '/user',
        element: <User/>
    },
    {
        path: '/charts',
        element: <Charts/>,
        // children: [
        //     {
        //         path: '/charts/pie',
        //         element: <CategoryList/>,
        //     },
        //     {
        //         path: '/charts/line',
        //         element: <CategoryCreate/>,
        //     }
        // ]
    },
]

export default router