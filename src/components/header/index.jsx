import React,{useState,forwardRef,useImperativeHandle,useEffect } from 'react'
import {IconRight,IconLeft} from '@arco-design/web-react/icon'
import {YoutubeOutlined,GithubOutlined,WeiboOutlined} from '@ant-design/icons'
import {Col,Row,Tooltip,Popconfirm} from 'antd'
import {Link,useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import LinkButton from '../link-button'
import { logout } from '../../redux/reducers/userReducer';

import {formateDate} from '../../utils/dateUtils'
import storageUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils'
import weatherPng from '../../assets/imgs/R-C.png'

import './index.css'


const iconCss = {fontSize: 16, margin: '0 2px'}

const Header = forwardRef(({collapsed,setCollapsed},ref) => {
  // const [collapsed, setCollapsed] = useState(false) /*collapsed：折叠 折叠显示展开组件，展开显示折叠组件 */
  const [currentTime,setCurrentTime] = useState(formateDate(Date.now()))
  // cosnt [currentTime,setCurrentTime] = useState(Date.now().toString())
  useImperativeHandle(ref,() => ({collapsed,getCollapsed}))
  const getCollapsed = () => collapsed

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(state => state.user)

  useEffect(() => {
      const timerId = setTimeout(() => {
      const currentTime = formateDate(Date.now())
      setCurrentTime(currentTime)
    },1000)
    return () => {
      clearInterval(timerId)
    };
  }, [currentTime]);

  const confirm = () => {
    // 分发登出
    dispatch(logout())
    storageUtils.removeUser()
    memoryUtils.user = {}
    navigate('/login')
  }
  
  return (
    <div className='header'>
      <Row>
        <Col span={8}>
          <div className='icon-container'>
            {React.createElement(collapsed ? IconRight : IconLeft, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })} 
          </div>
        </Col>
        <Col span={8} offset={8} className='header-right'>
          <Row justify='end'>
            <div className='header-right-top'>
              <span>欢迎，{user.userInfo.username || '管理员'}</span>
              <Popconfirm
                title='确定退出？'
                onConfirm={confirm}
                showCancel = {false}
              >
                <LinkButton className='link-button'>退出</LinkButton>
              </Popconfirm>
              <Tooltip title='转到bilibili'>
                <Link to='https://www.bilibili.com/' className='icon-link' target="_blank">
                  <YoutubeOutlined style={iconCss} />
                </Link>
              </Tooltip>
              <Tooltip title='转到github'>
                <Link to='https://github.com/' className='icon-link' target="_blank">
                  <GithubOutlined style={iconCss}/>
                </Link>
              </Tooltip>
              <Tooltip title='转到weibo'>
                <Link to='https://weibo.com/?sudaref=passport.weibo.com/' className='icon-link' target="_blank">
                  <WeiboOutlined style={iconCss}/>
                </Link>
              </Tooltip>
            </div>
          </Row>
          <Row justify='end'>
            <div className='header-right-bottom'>
              <span>{currentTime}</span>
              <img src={weatherPng} alt="wLogo" />
              <span>晴</span>
            </div>
          </Row>
        </Col>
      </Row>
    </div>
  )
})
export default Header