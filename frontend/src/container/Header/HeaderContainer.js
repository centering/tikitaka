import React, { Component } from "react";

import { connect } from "react-redux";

import HeaderPage from "../../pages/Header/HeaderPage";

import { setNotiboxOpt } from "../../lib/common";

class HeaderContainer extends Component {

  render() {

    const {loading,noti_opt} = this.props;
    console.log(this.props)
    return (
      <div>
        <HeaderPage
          SetNotiboxOpt={setNotiboxOpt}
          Loading={loading}
          NotiOpt={noti_opt}
        />
      </div>
    );
  }
}

export default  connect(({ common }) => ({
  noti_opt: common.get("noti_opt"),
  loading: common.get("loading")
}))(HeaderContainer);
