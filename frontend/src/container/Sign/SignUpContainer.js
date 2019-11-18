import React, {Component} from 'react';


import { connect } from 'react-redux';
import { CommonActions} from '../../store/actionCreator';

import SignUp from '../../component/Sign/SignUp'


class SignUpContainer extends Component {


    goSignInPage(){
        CommonActions.set_page_status('SIGN_IN')
    }
    SignUp(){
        const { signup_input} = this.props;

        let email = signup_input.get('email');
        let pwd = signup_input.get('pwd');
        let check_pwd = signup_input.get('check_pwd');
        let f_name = signup_input.get('f_name');
        let l_name = signup_input.get('l_name');

        if ( email ==''|| pwd=='' ||check_pwd==''||f_name==''||l_name=='') {

            let new_state = signup_input.set('status','BLANK_INFO')
            CommonActions.set_signup_input(new_state)
            return
        }

        if(pwd!=check_pwd){
            let new_state = signup_input.set('status','PASSWORD_CHECK_WRONG')
            CommonActions.set_signup_input(new_state)
            return
        }

        this.goSignInPage()

    }
    setSignUpInput(e){

        const {signup_input} = this.props;
        
        let new_state =signup_input.set(e.target.name,e.target.value);

        CommonActions.set_signup_input(new_state)
    }


    render() {

        const {signup_input} = this.props;
        return (
            <div>
              <SignUp 
                    GoSignInPage={this.goSignInPage}
                    SetSignUpInput={this.setSignUpInput.bind(this)}
                    SignUpInput={signup_input}
                    SignUp={this.SignUp.bind(this)}

                />
            </div>
        );
    }


};


SignUpContainer = connect(
    ({common}) => ({
        signup_input:common.get('signup_input')

    })

)(SignUpContainer)

export default SignUpContainer;

