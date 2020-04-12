/**
 * 路由配置
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom'
import AllComponents from './asyncImport'
import routesConfig from './config'
import queryString from 'query-string'
// import { connectAlita } from 'redux-alita'
// import umbrella from 'umbrella-storage'
import ReactLayout from './../layout/Index'

class ReactRoute extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  getPermits = () => {
    const { auth } = this.props
    return auth ? auth.data.permissions : null
  }
  requireAuth = (permit, component) => {
    const permits = this.getPermits()

    if (!permits || !permits.includes(permit)) return <Redirect to={'404'} />
    return component
  }
  requireLogin = (component, permit) => {
    const permits = this.getPermits()
    // if (!checkLogin(permits)) {
    //   return <Redirect to={'/login'} />
    // }
    return permit ? this.requireAuth(permit, component) : component
  }

  iterteMenu = r => {
    const route = r => {
      const Component = r.component && AllComponents[r.component]
      return (
        <Route
          key={r.route || r.key}
          exact
          path={r.route || r.key}
          render={props => {
            const reg = /\?\S*/g
            const queryParams = window.location.hash.match(reg)
            const { params } = props.match
            Object.keys(params).forEach(key => {
              params[key] = params[key] && params[key].replace(reg, '')
            })
            props.match.params = {
              ...params
            }
            const merge = {
              ...props,
              query: queryParams ? queryString.parse(queryParams[0]) : {}
            }
            // 重新包装组件
            const wrappedComponent = <Component {...merge} />
            return r.login
              ? wrappedComponent
              : this.requireLogin(wrappedComponent, r.requireAuth)
          }}
        />
      )
    }
    const subRoute = r =>
      r.subs && r.subs.map(subR => (subR.subs ? subRoute(subR) : route(subR)))

    return r.component ? route(r) : subRoute(r)
  }

  createRoute(key) {
    return routesConfig[key].map(this.iterteMenu)
  }

  render() {
    const { menuSelected } = this.props
    return (
      <HashRouter>
        <Route
          path="/"
          render={() => (
            <ReactLayout>
              <Switch>
                {routesConfig[menuSelected].map(key => this.iterteMenu(key))}
                <Redirect to="/app/index" />
                <Route render={() => <Redirect to="/404" />} />
              </Switch>
            </ReactLayout>
          )}
        />
      </HashRouter>
    )
  }
}

const mapStateToProps = state => {
  return {
    menuSelected: state.header.menuSelected
  }
}

export default connect(mapStateToProps)(ReactRoute)
