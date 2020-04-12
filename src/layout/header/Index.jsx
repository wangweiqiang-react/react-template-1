import React from 'react'
import { Dropdown, Menu, Button } from 'antd'
import {
  changeMenuToggle,
  changeMenuChange
} from '@/store/header/actionCreators'
import { connect } from 'react-redux'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import '@/style/layout/index.scss'
class Headers extends React.Component {
  constructor(props) {
    super(props)
    this.handlerToggle = this.handlerToggle.bind(this)
  }
  handlerToggle() {
    const { toggleCollapsed, toggle } = this.props
    toggleCollapsed(!toggle)
  }
  drapMenu(userInfo) {
    return (
      <Menu>
        <Menu.Item key={111}>
          <div className="flex flex-center">{userInfo.deptName}</div>
        </Menu.Item>
        <Menu.Item key={222}>
          <Button type="link">退出登录</Button>
        </Menu.Item>
      </Menu>
    )
  }
  menuInfo(menus) {
    return menus.map(item => {
      return (
        <div className="test-menu" key={item.type}>
          <div
            onClick={() => this.props.changeMenu(item.type)}
            className="item-info"
          >
            {item.label}
          </div>
        </div>
      )
    })
  }
  render() {
    const { userInfo, marqueeTip, toggle, menuArray } = this.props
    return (
      <div className="header-info flex h100">
        <div className="toggle-logo flex flex-center">
          <div onClick={this.handlerToggle} className="cur-point">
            {toggle ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        </div>
        <div className="middle flex flex-align-center flex-align-center">
          {/*<marquee scrollamount="8">{marqueeTip}</marquee>*/}
          {this.menuInfo(menuArray)}
        </div>
        <div className="user-info flex flex-just-end">
          <div className="flex flex-center cur-point">
            <Dropdown
              overlay={this.drapMenu(userInfo)}
              placement="bottomCenter"
            >
              <div className="user-logo flex flex-center">
                {userInfo.username.slice(-1)}
              </div>
            </Dropdown>

            <div className="user-name">{userInfo.username}</div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.header.userInfo,
    toggle: state.header.menuToggle,
    marqueeTip: state.header.marqueeTip,
    menuArray: state.header.menuArray
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleCollapsed(val = false) {
      const action = changeMenuToggle(val)
      dispatch(action)
    },
    changeMenu(type = 'default') {
      const action = changeMenuChange(type)
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Headers)
