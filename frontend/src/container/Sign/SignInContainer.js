import React, { Component } from 'react';

import { connect } from 'react-redux';
import { CommonActions } from '../../store/actionCreator';
import cookie from 'react-cookies'

import { getLogin } from "../../lib/api/post";
import SignIn from '../../component/Sign/SignIn'
import { encode, decode } from "../../lib/common";

class SignInContainer extends Component {


    componentDidMount() {
        this.setUserInfo()
    }

    setUserInfo() {

        try {
            let user = localStorage.getItem('userInfo')

            if (user) {

                const select_project = sessionStorage.getItem('select_project')

                user = JSON.parse(decode(user))

                user.project_id = user.projects[select_project].project_id
                CommonActions.set_user_info(user)

                if (select_project==null || select_project==undefined)
                {
                    // debugger
                    CommonActions.set_page_status('PROJECT_SELECT')
                    return
                }

                CommonActions.set_page_status('SIGN_IN_SUCCESS')
            }
            else {

                this.props.OnSignIn()
            }
        }
        catch (e) {
            // console.log(e)
            this.props.OnSignOut()
        }

    }


    async login() {

        const { signin_input } = this.props;

        let email = signin_input.get('email');
        let pwd = signin_input.get('pwd');


        if (email == '' || pwd == '') {

            let new_state = signin_input.set('status', 'BLANK_INFO')
            CommonActions.set_signin_input(new_state)

            return
        }

        try{
            let user_encoded = encode({ email: email, password: pwd });
            let res = await getLogin({auth_info:user_encoded});

            if (res.message == 'SUCCESS_LOGIN') {

                if (signin_input.get('remember'))
                    localStorage.setItem('remember', email)
                else
                    localStorage.removeItem('remember')


                CommonActions.set_signin_input({ email: '', pwd: '', status: '', remember: false });
                // console.log(res)

                //성공

                cookie.save('access_csrf', res.data.access_csrf, { maxAge: 3600 * 24 })

                const userInfo = {
                    email: res.data.user.email,
                    name: res.data.user.name,
                    projects: res.data.user.projects,
                }
                localStorage.setItem('userInfo', encode(JSON.stringify(userInfo)))
                CommonActions.set_user_info(userInfo)
                CommonActions.set_page_status('PROJECT_SELECT');

            }
            else {
                let new_state = signin_input.set('status', 'INVALID')
                CommonActions.set_signin_input(new_state)

            }


        }
        catch(e){
                let new_state = signin_input.set('status', 'INVALID')
                CommonActions.set_signin_input(new_state)
        }

    }
    setSignInInput(e) {

        const { signin_input } = this.props;
        let new_state = null
        if (e.target.name == 'remember')
            new_state = signin_input.set(e.target.name, e.target.checked);
        else
            new_state = signin_input.set(e.target.name, e.target.value);

        CommonActions.set_signin_input(new_state)
    }
    goSignUpPage() {
        CommonActions.set_page_status('SIGN_UP')
    }

    render() {

        const { signin_input, page_status } = this.props;

        return (
            <div>
                {page_status == 'SIGN_IN' &&
                <SignIn SignInInput={signin_input}
                        SignIn={this.login.bind(this)}
                        SetSignInInput={this.setSignInInput.bind(this)}
                        GoSignUpPage={this.goSignUpPage}
                />
                }


            </div>
        );
    }


};


SignInContainer = connect(
    ({ common }) => ({
        user_info: common.get('user_info'),
        signin_input: common.get('signin_input'),
        page_status: common.get('page_status')

    })

)(SignInContainer)

export default SignInContainer;

