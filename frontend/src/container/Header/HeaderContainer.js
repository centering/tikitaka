import React, {Component} from 'react';

import {connect} from 'react-redux';
import cookie from "react-cookies";
import axios from "axios";

import {CommonActions} from "../../store/actionCreator";


import HeaderPage from '../../pages/Header/HeaderPage'

import SignInContainer from '../Sign/SignInContainer'
import SignUpContainer from '../Sign/SignUpContainer'
import ProjectSelectContainer from '../Project/ProjectSelectContainer'
import {signOut} from "../../lib/api/delete";

import {setNotiboxOpt} from "../../lib/common";


class HeaderContainer extends Component {

 
    componentDidMount() {


        axios.interceptors.response.use(response => {
            return response;
        }, error => {
            if (error.response.status === 401) {

                cookie.remove('access_csrf', { path: '/' })
                localStorage.removeItem('userInfo')
                localStorage.setItem('expired',true)
                window.location.href='/'


            }
            return error;
        });

        axios.defaults.withCredentials = true
        axios.interceptors.request.use(function (config) {

            config.headers['X-CSRF-TOKEN']=cookie.load('access_csrf')


            return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });

        let lang = localStorage.getItem('lang');
        // console.log(lang)

        if(!lang){
            localStorage.setItem('lang','KOREAN')
        }

    }
    onSignIn(){

        const {signin_input}=this.props;
        const remember=localStorage.getItem('remember');
        
        if(remember)
        {
            let new_state = signin_input.set('email',remember)
            new_state = signin_input.set('remember',true)
            CommonActions.set_signin_input(new_state)

        }
        
        if(localStorage.getItem('expired')=='true'){
            let new_state = signin_input.set('status','EXPIRED')
            localStorage.removeItem('expired')
            CommonActions.set_signin_input(new_state)
        }
        sessionStorage.removeItem('select_project')
        CommonActions.set_page_status('SIGN_IN')
        

        
    }
    async onSignOut(){

        await signOut();

        cookie.remove('access_csrf', { path: '/' })
        localStorage.removeItem('userInfo')

        window.location.href='/'


    }
    onChangeProject(value){

        if(value.value=='create_project'){
            alert('TBD')
        }else {
            sessionStorage.setItem('select_project',value.idx)
            window.location.href='/'
        }

    }

    render() {

        const {user_info,noti_opt,page_status,loading} = this.props;
        const select_project = sessionStorage.getItem('select_project')

        return (
            <div>

                {page_status=='SIGN_IN_SUCCESS' &&
                <HeaderPage OnChangeProject={this.onChangeProject.bind(this)}
                            OnSignIn={this.onSignIn.bind(this)}
                            OnSignOut={this.onSignOut.bind(this)}
                            UserInfo={user_info}
                            SelectProject={select_project}
                            SetNotiboxOpt={setNotiboxOpt}
                            Loading={loading}
                            NotiOpt={noti_opt}
                />
                }
                {page_status=='SIGN_IN' &&
                <SignInContainer OnSignOut={this.onSignOut.bind(this)} OnSignIn={this.onSignIn.bind(this)}/>
                }
                {page_status=='SIGN_UP' &&
                <SignUpContainer/>
                }
                {page_status=='PROJECT_SELECT' &&
                <ProjectSelectContainer/>
                }

            </div>
        );
    }

};

HeaderContainer = connect(
    ({common}) => ({
        user_info : common.get('user_info'),
        noti_opt:common.get('noti_opt'),
        loading:common.get('loading'),
        page_status:common.get('page_status'),
        signin_input:common.get('signin_input')

    })

)(HeaderContainer)



export default HeaderContainer;

