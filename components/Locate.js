import React from 'react'

function Locate (path, Component) {
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.state = {host: process.env.host, path: path}
    }

    render() {
      return <Component {...this.props}
                         host={this.state.host} path={this.state.path} />
    }
  }
}

export default Locate
