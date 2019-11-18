
import React from "react";
import Select from "react-select";
import { GET_TRANS_LANG } from "../../lib/common";

const customStyles = {
    container: styles => ({ ...styles, width: '200px' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            color: isSelected ? 'skyblue' : data.value == 'create_project' ? 'red' : 'black',

        }
    }

}
const ProjectSelector = ({ Project, SelectProjectIdx, OnChangeProject }) => {

    let project_list = []
    project_list = Project.map((project, idx) => {
        return { label: project.project_name, value: project.project_id, idx: idx }
    })


    return (
        <Select options={project_list}
            styles={customStyles}
            value={project_list[parseInt(SelectProjectIdx)]}
            onChange={OnChangeProject}
        />
    )
}

export default ProjectSelector