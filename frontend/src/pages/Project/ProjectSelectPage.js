
import React from 'react';

import ProjectSelectTab from '../../component/Project/ProjectSelectTab'

const ProjectSelectPage = (props)=>{

    const {Projects,GoProject,SetcreateProjectInput,CreateProjectInput,CreateProject} = props;

    return(
        <React.Fragment>
            <ProjectSelectTab Projects={Projects}
                              GoProject={GoProject}
                              SetcreateProjectInput={SetcreateProjectInput}
                              CreateProjectInput={CreateProjectInput}
                              CreateProject={CreateProject}
            />

        </React.Fragment>

    )


}

export default ProjectSelectPage