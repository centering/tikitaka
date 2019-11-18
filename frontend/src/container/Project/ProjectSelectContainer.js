import React, { Component } from 'react';

import { connect } from 'react-redux';
import { CommonActions } from '../../store/actionCreator';
import ProjectSelectPage from '../../pages/Project/ProjectSelectPage'
import {decode, encode, setNotiboxOpt} from "../../lib/common";

class ProjectSelectContainer extends Component {

    goProject(prj_idx){

        try {
            let user = localStorage.getItem('userInfo')

            user = JSON.parse(decode(user))
            user.project_id = user.projects[prj_idx].project_id;
            CommonActions.set_user_info(user)

            sessionStorage.setItem('select_project',prj_idx);
            CommonActions.set_page_status('SIGN_IN_SUCCESS')
        }
        catch(e){
            setNotiboxOpt({
                variant:'error',
                message:e,
                open:true
            })
        }




    }
    setcreateProjectInput(e){
        const { create_project_input } = this.props;

        let new_state = create_project_input.set(e.target.name, e.target.value);

        CommonActions.set_create_project_input(new_state)
    }
    async createProject()
    {
        const { create_project_input,user_info } = this.props;
        const project_name=create_project_input.get('project_name');
        const project_desc=create_project_input.get('project_desc');

        if( project_name=='' || project_desc==''){
            let new_state = create_project_input.set('status','BLANK_INFO');
            CommonActions.set_create_project_input(new_state)
            return
        }

        let res = await CommonActions.post_create_new_project({
            project_name:project_name,
            project_desc:project_desc,
            email:user_info.get('email')
        })

        if(res.message=='SUCCESS_CREATE_PROJECT')
        {


            try {
                let user = localStorage.getItem('userInfo')
                user = JSON.parse(decode(user))
                user.projects = res.data

                localStorage.setItem('userInfo', encode(JSON.stringify(user)))

                CommonActions.set_user_info(user)
                this.goProject(res.data.length-1)


                setNotiboxOpt({
                    variant:'success',
                    message:res.message,
                    open:true
                })

            }
            catch(e){
                setNotiboxOpt({
                    variant:'error',
                    message:e,
                    open:true
                })
            }

        }
        else
        {
            setNotiboxOpt({
                variant:'error',
                message:res.message,
                open:true
            })
        }


    }

    render() {

        const { page_status, user_info,create_project_input } = this.props;
        return (
            <div>
                {page_status == 'PROJECT_SELECT' &&
                <ProjectSelectPage
                    Projects={user_info.get('projects')}
                    GoProject={this.goProject}
                    SetcreateProjectInput={this.setcreateProjectInput.bind(this)}
                    CreateProjectInput={create_project_input}
                    CreateProject={this.createProject.bind(this)}
                />
                }


            </div>
        );
    }


};


ProjectSelectContainer = connect(
    ({ common }) => ({
        page_status: common.get('page_status'),
        user_info: common.get('user_info'),
        create_project_input:common.get('create_project_input')
    })

)(ProjectSelectContainer)

export default ProjectSelectContainer;

